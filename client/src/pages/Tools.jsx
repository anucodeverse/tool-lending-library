import {
 useEffect,
 useState,
 useCallback
} from "react";

import Navbar from "../components/Navbar";
import ToolForm from "../components/ToolForm";
import Loading from "../components/Loading";

import toast from "react-hot-toast";
import {
  Wrench,
  CheckCircle,
  Package,
  AlertTriangle
} from "lucide-react";
import styles from "./Tools.module.css";

import {
  getTools,
  createTool,
  updateTool,
  deleteTool
} from "../services/toolService";



function Tools() {


  const [tools, setTools] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingTool, setEditingTool] = useState(null);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(false);





  // ==========================
  // ANALYTICS
  // ==========================

  const analytics = (message) => {

    console.log(
      `[Analytics] ${message}`
    );

  };





  // ==========================
  // FETCH TOOLS
  // ==========================

  const fetchTools = useCallback(async () => {


    try {


      setLoading(true);


      const response =
      await getTools();



      setTools(
        response?.tools || []
      );



      analytics(
        "Tools loaded successfully"
      );


    }


    catch(error) {


      toast.error(
        error.message ||
        "Failed to load tools"
      );


      console.error(
        "FETCH ERROR:",
        error
      );


      setTools([]);


    }


    finally {


      setLoading(false);


    }


  }, []);






  // LOAD DATA WHEN PAGE OPENS

 useEffect(()=>{


  let ignore = false;


  const loadTools = async()=>{


    await fetchTools();


    if(ignore) return;


  };


  loadTools();



  return()=>{

    ignore=true;

  };


},[fetchTools]);






  // ==========================
  // SAVE TOOL
  // ==========================


  const saveTool = async(toolData) => {


    try {


      setActionLoading(true);




      if(editingTool) {



        const response =
        await updateTool(
          editingTool._id,
          toolData
        );



        const updatedTool =
        response.tool;



        setTools(prev =>


          prev.map(tool =>


            tool._id === editingTool._id

            ?

            updatedTool

            :

            tool


          )


        );




        toast.success(
          "Tool updated successfully"
        );



        analytics(
          "Tool updated"
        );


      }



      else {



        const response =
        await createTool(
          toolData
        );



        const createdTool =
        response.tool;




        setTools(prev => [

          ...prev,

          createdTool

        ]);




        toast.success(
          "Tool added successfully"
        );



        analytics(
          "Tool created"
        );


      }




      setShowForm(false);

      setEditingTool(null);



    }



    catch(error) {


      toast.error(
        error.message ||
        "Unable to save tool"
      );


      console.error(
        error
      );


    }



    finally {


      setActionLoading(false);


    }


  };





  // ==========================
  // DELETE TOOL
  // ==========================


  const handleDelete = async(id) => {


    const confirmDelete =
    window.confirm(
      "Are you sure you want to delete this tool?"
    );



    if(!confirmDelete)
      return;




    try {


      setActionLoading(true);



      await deleteTool(id);




      setTools(prev =>


        prev.filter(
          tool =>
          tool._id !== id
        )


      );



      toast.success(
        "Tool deleted successfully"
      );



      analytics(
        "Tool deleted"
      );


    }



    catch(error) {


      toast.error(
        error.message ||
        "Delete failed"
      );


      console.error(
        error
      );


    }



    finally {


      setActionLoading(false);


    }


  };





  // ==========================
  // FILTER + SEARCH
  // ==========================


  const filteredTools =
  tools.filter(tool => {


    const name =
    tool.name?.toLowerCase() || "";



    const searchText =
    search.toLowerCase();



    const matchesSearch =
    name.includes(searchText);




    const matchesFilter =


    filter === "All"


    ||


    tool.status === filter


    ||


    (

      filter === "Low Stock"

      &&

      Number(tool.quantity) <= 5

    );




    return (

      matchesSearch

      &&

      matchesFilter

    );


  });
  // ==========================
// STATISTICS
// ==========================


const totalTools =
tools.length;



const availableTools =
tools.filter(

  tool =>
  tool.status === "Available"

).length;



const borrowedTools =
tools.filter(

  tool =>
  tool.status === "Borrowed"

).length;



const lowStockTools =
tools.filter(

  tool =>
  Number(tool.quantity) <= 5

).length;





// SHOW LOADING

if(loading){


  return (

    <>

      <Navbar/>

      <Loading/>

    </>

  );


}






return (

<>

<Navbar/>


<div className={styles.container}>


{/* ==========================
    PAGE HEADER
========================== */}


<div className={styles.pageHeader}>


<div>

<h1>
Tool Inventory
</h1>


<p className={styles.subtitle}>
Manage and track company equipment efficiently
</p>


</div>





<div>


<button

className={styles.addBtn}

disabled={actionLoading}

onClick={()=>{


setShowForm(true);

setEditingTool(null);


}}

aria-label="Add new tool"

>

+ Add New Tool

</button>


<button

className={styles.addBtn}

disabled={actionLoading}

onClick={fetchTools}

aria-label="Refresh tools"

>

↻ Refresh

</button>


</div>



</div>







{/* ==========================
    STATISTICS
========================== */}


<div className={styles.stats}>


<div className={styles.statCard}>


<div className={`${styles.statIcon} ${styles.blueIcon}`}>
  <Wrench size={26}/>
</div>


<div>

<h3>
Total Tools
</h3>


<h2>
{totalTools}
</h2>


<p>
Registered equipment
</p>


</div>


</div>





<div className={styles.statCard}>


<div className={`${styles.statIcon} ${styles.greenIcon}`}>
  <CheckCircle size={26}/>
</div>


<div>

<h3>
Available
</h3>


<h2>
{availableTools}
</h2>


<p>
Ready to borrow
</p>


</div>


</div>





<div className={styles.statCard}>


<div className={`${styles.statIcon} ${styles.orangeIcon}`}>
  <Package size={26}/>
</div>


<div>

<h3>
Borrowed
</h3>


<h2>
{borrowedTools}
</h2>


<p>
Currently in use
</p>


</div>


</div>





<div className={styles.statCard}>


<div className={`${styles.statIcon} ${styles.redIcon}`}>
  <AlertTriangle size={26}/>
</div>


<div>

<h3>
Low Stock
</h3>


<h2>
{lowStockTools}
</h2>


<p>
Needs attention
</p>


</div>


</div>



</div>







{/* ==========================
    SEARCH
========================== */}



<div className={styles.toolbar}>


<label

htmlFor="search"

className={styles.visuallyHidden}

>

Search tools

</label>



<input

id="search"

type="search"

placeholder="Search tools..."

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

aria-label="Search tools"

autoComplete="off"

/>



</div>







{/* ==========================
    FILTERS
========================== */}


<div className={styles.filters}>


{

[

"All",

"Available",

"Borrowed",

"Low Stock"

].map(item=>(


<button

key={item}

className={

filter === item

?

styles.activeFilter

:

""

}


onClick={()=>setFilter(item)}


aria-pressed={filter===item}


>


{item}


</button>


))


}


</div>








{/* ==========================
    TOOL FORM
========================== */}


{

showForm &&


<ToolForm


onSave={saveTool}

key={editingTool?._id || "new"}
editingTool={editingTool}


loading={actionLoading}


onCancel={()=>{


setShowForm(false);

setEditingTool(null);


}}


/>


}









{/* ==========================
    TABLE
========================== */}


<div className={styles.tableCard}>


<table>


<caption className={styles.visuallyHidden}>

Tool inventory list

</caption>



<thead>

<tr>


<th scope="col">
Name
</th>


<th scope="col">
Category
</th>


<th scope="col">
Quantity
</th>


<th scope="col">
Status
</th>


<th scope="col">
Actions
</th>


</tr>


</thead>





<tbody>


{

filteredTools.map(tool=>(


<tr key={tool._id}>


<td>
{tool.name}
</td>


<td>
{tool.category}
</td>


<td>
{tool.quantity}
</td>




<td>


<span

className={


tool.status==="Available"


?


styles.available



:


tool.status==="Borrowed"


?


styles.borrowed



:


Number(tool.quantity)<=5


?


styles.lowStock



:


styles.available


}


>


{tool.status}


</span>


</td>





<td>


<button

className={styles.edit}

disabled={actionLoading}


onClick={()=>{


setEditingTool(tool);

setShowForm(true);


}}


aria-label={`Edit ${tool.name}`}

>

Edit

</button>





<button

className={styles.delete}

disabled={actionLoading}


onClick={()=>handleDelete(tool._id)}


aria-label={`Delete ${tool.name}`}

>

Delete

</button>



</td>



</tr>



))


}



</tbody>



</table>








{

filteredTools.length===0 &&


<div className={styles.empty}>


<div className={styles.emptyIcon}>
🔧
</div>



<h3>
No tools found
</h3>



<p>
Try changing search/filter or add a new tool.
</p>




<button

className={styles.addBtn}

onClick={()=>{


setShowForm(true);

setEditingTool(null);


}}

>

+ Add Tool

</button>



</div>


}





</div>







</div>


</>


);


}


export default Tools;