import { useState } from "react";
import DOMPurify from "dompurify";

import styles from "./ToolForm.module.css";


const initialState = {

  name: "",

  category: "",

  quantity: "",

  status: "Available",

  description: ""

};


const getInitialTool = (editingTool) => ({

  name: editingTool?.name || "",

  category: editingTool?.category || "",

  quantity: editingTool?.quantity || "",

  status: editingTool?.status || "Available",

  description: editingTool?.description || ""

});

function ToolForm({

  onSave,

  onCancel,

  editingTool,

  loading

}) {



  const [tool,setTool] = useState(
  getInitialTool(editingTool)
);



  const [errors,setErrors] =
  useState({});





  // ==========================
  // LOAD EDIT DATA
  // ==========================









  // ==========================
  // SANITIZE
  // ==========================


  const sanitizeInput=(value)=>{


    return DOMPurify.sanitize(

      value,

      {
        ALLOWED_TAGS:[]
      }

    );


  };







  // ==========================
  // CHANGE HANDLER
  // ==========================


  const handleChange=(e)=>{


    const {

      name,

      value

    } = e.target;





    const cleanValue =
    sanitizeInput(value);





    setTool(prev=>({

      ...prev,

      [name]:cleanValue

    }));





    setErrors(prev=>({

      ...prev,

      [name]:""

    }));



  };







  // ==========================
  // VALIDATION
  // ==========================


  const validate=()=>{


    const newErrors={};




    if(!tool.name.trim()){


      newErrors.name =
      "Tool name is required";


    }


    else if(tool.name.length>50){


      newErrors.name =
      "Maximum 50 characters allowed";


    }







    if(!tool.category.trim()){


      newErrors.category =
      "Category is required";


    }


    else if(tool.category.length>50){


      newErrors.category =
      "Maximum 50 characters allowed";


    }







    if(

      !tool.quantity ||

      Number(tool.quantity)<=0

    ){


      newErrors.quantity =
      "Quantity must be greater than 0";


    }



    else if(

      !Number.isInteger(

        Number(tool.quantity)

      )

    ){


      newErrors.quantity =
      "Quantity must be a whole number";


    }







    if(

      !["Available","Borrowed"]

      .includes(tool.status)

    ){


      newErrors.status =
      "Invalid status";


    }







    if(!tool.description.trim()){


      newErrors.description =
      "Description is required";


    }


    else if(tool.description.length>200){


      newErrors.description =
      "Maximum 200 characters allowed";


    }






    return newErrors;


  };






  // ==========================
  // SUBMIT
  // ==========================


  const handleSubmit=(e)=>{


    e.preventDefault();



    if(loading)
      return;





    const validationErrors =
    validate();






    if(

      Object.keys(validationErrors)

      .length>0

    ){


      setErrors(validationErrors);


      return;


    }






    const cleanTool={


      name:
      sanitizeInput(tool.name),



      category:
      sanitizeInput(tool.category),



      quantity:
      Number(tool.quantity),



      status:
      sanitizeInput(tool.status),



      description:
      sanitizeInput(tool.description)


    };






    console.log(
      "[Analytics] Tool form submitted"
    );






    onSave(cleanTool);



  };
  // ==========================
  // CANCEL
  // ==========================


  const cancelForm = () => {


    if(loading)
      return;



    setTool(initialState);

    setErrors({});

    onCancel();


  };







  return (


<form

className={styles.form}

onSubmit={handleSubmit}

aria-label={

editingTool

?

"Edit tool form"

:

"Add new tool form"

}

>




<h2>

{

editingTool

?

"Edit Tool"

:

"Add Tool"

}


</h2>








{/* TOOL NAME */}


<label htmlFor="name">

Tool Name

</label>



<input


id="name"

name="name"

type="text"

placeholder="Enter tool name"

value={tool.name}

onChange={handleChange}

maxLength="50"

autoComplete="off"

required

aria-required="true"

aria-invalid={

errors.name

?

"true"

:

"false"

}

aria-describedby={

errors.name

?

"name-error"

:

undefined

}

className={

errors.name

?

styles.errorInput

:

""

}


/>





{

errors.name &&


<p

id="name-error"

className={styles.errorText}

role="alert"

>

{errors.name}

</p>


}









{/* CATEGORY */}


<label htmlFor="category">

Category

</label>



<input


id="category"

name="category"

type="text"

placeholder="Enter category"

value={tool.category}

onChange={handleChange}

maxLength="50"

autoComplete="off"

required

aria-required="true"

aria-invalid={

errors.category

?

"true"

:

"false"

}

aria-describedby={

errors.category

?

"category-error"

:

undefined

}

className={

errors.category

?

styles.errorInput

:

""

}


/>





{

errors.category &&


<p

id="category-error"

className={styles.errorText}

role="alert"

>

{errors.category}

</p>


}









{/* QUANTITY */}


<label htmlFor="quantity">

Quantity

</label>



<input


id="quantity"

name="quantity"

type="number"

placeholder="Enter quantity"

value={tool.quantity}

onChange={handleChange}

min="1"

step="1"

required

aria-required="true"

aria-invalid={

errors.quantity

?

"true"

:

"false"

}

aria-describedby={

errors.quantity

?

"quantity-error"

:

undefined

}

className={

errors.quantity

?

styles.errorInput

:

""

}


/>





{

errors.quantity &&


<p

id="quantity-error"

className={styles.errorText}

role="alert"

>

{errors.quantity}

</p>


}









{/* STATUS */}


<label htmlFor="status">

Status

</label>



<select


id="status"

name="status"

value={tool.status}

onChange={handleChange}

aria-label="Select tool status"

>


<option value="Available">

Available

</option>


<option value="Borrowed">

Borrowed

</option>



</select>









{/* DESCRIPTION */}


<label htmlFor="description">

Description

</label>




<textarea


id="description"

name="description"

placeholder="Enter description"

value={tool.description}

onChange={handleChange}

maxLength="200"

required

aria-required="true"

aria-invalid={

errors.description

?

"true"

:

"false"

}

aria-describedby={

errors.description

?

"description-error"

:

undefined

}

className={

errors.description

?

styles.errorInput

:

""

}


/>





<p className={styles.counter}>

{tool.description.length}

/200 characters

</p>






{

errors.description &&


<p


id="description-error"


className={styles.errorText}


role="alert"


>

{errors.description}

</p>


}









{/* BUTTONS */}



<div className={styles.buttons}>


<button


type="submit"


disabled={loading}


aria-label={

editingTool

?

"Update tool"

:

"Save tool"

}


>


{

loading

?

"⏳ Saving..."

:

editingTool

?

"Update"

:

"Save"

}


</button>








<button


type="button"


disabled={loading}


onClick={cancelForm}


aria-label="Cancel tool form"


>


Cancel


</button>



</div>







</form>


  );


}



export default ToolForm;