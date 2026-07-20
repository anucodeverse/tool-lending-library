import {
  
  useState
} from "react";


import { AuthContext } from "./auth";





export function AuthProvider({ children }) {


  const [user, setUser] = useState(() => {


    const storedUser =
      localStorage.getItem("user");


    const token =
      localStorage.getItem("token");



    if(token && storedUser){


      try {

        return JSON.parse(storedUser);

      }

      catch(error){

        console.error(
          "Invalid stored user",
          error
        );

        return null;

      }


    }


    return null;


  });





  const loading = false;







  const login = (userData, token) => {


    localStorage.setItem(
      "token",
      token
    );


    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );


    setUser(userData);


  };







  const logout = () => {


    localStorage.removeItem(
      "token"
    );


    localStorage.removeItem(
      "user"
    );


    setUser(null);


  };







  return (

    <AuthContext.Provider

      value={{

        user,

        loading,

        login,

        logout

      }}

    >

      {children}

    </AuthContext.Provider>

  );


}







