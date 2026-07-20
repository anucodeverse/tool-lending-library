import { 
  useState 
} from "react";


import {
  Link,
  useNavigate
} from "react-router-dom";


import toast from "react-hot-toast";


import styles from "./Login.module.css";


import {
  loginUser
} from "../services/authService";

import { useAuth } from "../context/useAuth";





function Login(){


const navigate = useNavigate();


const {
  login
} = useAuth();





const [formData,setFormData]=useState({

email:"",

password:""

});



const [loading,setLoading]=useState(false);


const [showPassword,setShowPassword]=useState(false);







const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:
e.target.value

});


};








const validateForm=()=>{


if(
!formData.email.trim() ||
!formData.password.trim()
){


toast.error(
"Please fill all fields"
);


return false;

}



const emailRegex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;



if(!emailRegex.test(formData.email)){


toast.error(
"Please enter a valid email"
);


return false;

}



if(formData.password.length < 6){


toast.error(
"Password must contain 6 characters"
);


return false;

}



return true;


};









const handleSubmit=async(e)=>{


e.preventDefault();



if(!validateForm())
return;





try{


setLoading(true);



const data =
await loginUser(formData);





login(

data.user,

data.token

);





console.log(

"[Analytics] User logged into Tool Lending Library"

);





toast.success(

`Welcome ${data.user.name}!`

);



navigate("/dashboard");



}

catch(error){


toast.error(

error.message ||

"Login failed"

);


}



finally{


setLoading(false);


}



};







return(

<main className={styles.container}>


<div className={styles.card}>


<h1 className={styles.title}>

Tool Lending Library

</h1>


<p className={styles.subtitle}>

Welcome Back

</p>






<form

className={styles.form}

onSubmit={handleSubmit}

aria-label="Login form"

>




<div className={styles.inputGroup}>


<label htmlFor="email">

Email Address

</label>



<input

id="email"

name="email"

type="email"

placeholder="Enter your email"

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

autoComplete="current-password"

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







<button

type="submit"

className={styles.loginButton}

disabled={loading}

aria-label="Login button"

>


{
loading
?
"Logging in..."
:
"Login"
}


</button>






</form>






<p className={styles.footer}>


Don't have an account?{" "}


<Link

to="/register"

aria-label="Create account"

>

Register

</Link>


</p>




</div>


</main>


);


}


export default Login;