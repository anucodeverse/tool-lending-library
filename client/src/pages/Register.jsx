import { 
  useState 
} from "react";


import {
  Link,
  useNavigate
} from "react-router-dom";


import toast from "react-hot-toast";


import styles from "./Register.module.css";


import {
  registerUser
} from "../services/authService";

function Register(){


const navigate =
useNavigate();





const [formData,setFormData]=useState({

name:"",

email:"",

password:"",

confirmPassword:""

});




const [loading,setLoading]=useState(false);


const [showPassword,setShowPassword]=useState(false);


const [showConfirm,setShowConfirm]=useState(false);





const sanitizeInput=(value)=>{


return value.replace(
/[<>]/g,
""
);


};





const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:

sanitizeInput(
e.target.value
)

});


};
const validateForm = () => {


const name =
formData.name.trim();


const email =
formData.email.trim();





if(
!name ||
!email ||
!formData.password ||
!formData.confirmPassword
){

toast.error(
"Please fill all fields"
);

return false;

}





const emailRegex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;




if(!emailRegex.test(email)){


toast.error(
"Enter a valid email address"
);


return false;

}




if(formData.password.length < 6){


toast.error(
"Password must contain at least 6 characters"
);


return false;


}




if(
formData.password !==
formData.confirmPassword
){


toast.error(
"Passwords do not match"
);


return false;


}




return true;


};









const handleSubmit = async(e)=>{


e.preventDefault();



if(loading)
return;



if(!validateForm())
return;





try{


setLoading(true);



await registerUser({

name:
formData.name.trim(),

email:
formData.email.trim(),

password:
formData.password

});





console.log(

"[Analytics] User registration completed"

);





toast.success(

"Account created successfully"

);





navigate(

"/login",

{
replace:true
}

);



}

catch(error){


console.error(error);



toast.error(

error.message ||

"Registration failed"

);


}


finally{


setLoading(false);


}



};









return (

<div className={styles.container}>


<div className={styles.card}>


<h1 className={styles.title}>

Tool Lending Library

</h1>



<p className={styles.subtitle}>

Create Your Account

</p>







<form

className={styles.form}

onSubmit={handleSubmit}

aria-label="Registration form"

>







<div className={styles.inputGroup}>


<label htmlFor="name">

Full Name

</label>



<input

id="name"

name="name"

type="text"

placeholder="Enter full name"

value={formData.name}

onChange={handleChange}

autoComplete="name"

minLength={3}

maxLength={50}

required

/>

</div>









<div className={styles.inputGroup}>


<label htmlFor="email">

Email Address

</label>



<input

id="email"

name="email"

type="email"

placeholder="Enter email"

value={formData.email}

onChange={handleChange}

autoComplete="email"

required

/>

</div>









<div className={styles.inputGroup}>


<label htmlFor="password">

Password

</label>



<div className={styles.passwordWrapper}>


<input

id="password"

name="password"

type={
showPassword
?
"text"
:
"password"
}

placeholder="Enter password"

value={formData.password}

onChange={handleChange}

autoComplete="new-password"

minLength={6}

required

/>




<button

type="button"

className={styles.showPassword}

onClick={()=>setShowPassword(!showPassword)}

aria-label={
showPassword
?
"Hide password"
:
"Show password"
}

>

{
showPassword
?
"Hide"
:
"Show"
}


</button>



</div>

</div>









<div className={styles.inputGroup}>


<label htmlFor="confirmPassword">

Confirm Password

</label>




<div className={styles.passwordWrapper}>


<input

id="confirmPassword"

name="confirmPassword"

type={
showConfirm
?
"text"
:
"password"
}

placeholder="Confirm password"

value={formData.confirmPassword}

onChange={handleChange}

autoComplete="new-password"

required

/>




<button

type="button"

className={styles.showPassword}

onClick={()=>setShowConfirm(!showConfirm)}

aria-label={
showConfirm
?
"Hide confirm password"
:
"Show confirm password"
}

>

{
showConfirm
?
"Hide"
:
"Show"
}


</button>



</div>


</div>









<button

type="submit"

className={styles.registerButton}

disabled={loading}

aria-label="Create account button"

>


{
loading
?
"Creating Account..."
:
"Register"
}


</button>





</form>









<p className={styles.footer}>


Already have an account?{" "}



<Link

to="/login"

aria-label="Go to login page"

>

Login

</Link>


</p>





</div>


</div>


);


}



export default Register;