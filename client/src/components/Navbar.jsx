import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

import styles from "./Navbar.module.css";


function Navbar() {


  const navigate = useNavigate();

const [menuOpen,setMenuOpen] = useState(false);

  const [user,setUser] = useState(()=>{

    try{

      return JSON.parse(
        localStorage.getItem("user")
      );

    }
    catch{

      return null;

    }

  });






  const logout = () => {


    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );


    if(!confirmLogout)
      return;




    localStorage.removeItem("token");

    localStorage.removeItem("user");



    console.log(
      "[Analytics] User logged out from Tool Lending Library"
    );



    setUser(null);



    toast.success(
      "Logged out successfully"
    );



    navigate("/",{
      replace:true
    });


  };








return (

<header>


<nav

className={styles.navbar}

aria-label="Main navigation"

>



<NavLink

to={
user
?
"/dashboard"
:
"/"
}

className={styles.logo}

aria-label="Tool Lending Library Home"

title="Tool Lending Library"

>

Tool Lending Library

</NavLink>


<button

className={styles.menuBtn}

onClick={()=>setMenuOpen(!menuOpen)}

aria-label="Toggle navigation menu"

>

☰

</button>







<div

className={`${styles.links} ${
menuOpen ? styles.open : ""
}`}

>



{

user &&

<>


<NavLink

to="/dashboard"

className={({isActive})=>

isActive
?
styles.active
:
""

}

aria-label="Go to dashboard"

>

Dashboard

</NavLink>





<NavLink

to="/tools"

className={({isActive})=>

isActive
?
styles.active
:
""

}

aria-label="Manage tools"

>

Tools

</NavLink>


</>


}







{

user &&

<span

className={styles.user}

aria-label={`Logged in as ${user.name}`}

>

<span aria-hidden="true">

👤

</span>

{" "}

{user.name}


</span>


}









{

user &&

<button


type="button"


className={styles.logoutBtn}


onClick={logout}


aria-label="Logout from application"


title="Logout"


>

Logout


</button>


}



</div>



</nav>


</header>


);


}


export default Navbar;