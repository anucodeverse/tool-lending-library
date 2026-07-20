import axios from "axios";





const API = axios.create({

    baseURL:
    `${import.meta.env.VITE_API_URL}/api/tools`,

    timeout:10000,


    headers:{

        "Content-Type":"application/json"

    }

});








// Attach JWT automatically

API.interceptors.request.use(

(config)=>{


    const token =
    localStorage.getItem("token");



    if(token){

        config.headers.Authorization =
        `Bearer ${token}`;

    }



    return config;


},


(error)=>Promise.reject(error)

);








// Handle expired token

API.interceptors.response.use(


(response)=>response,


(error)=>{


    if(error.response?.status===401){


        localStorage.removeItem("token");

        localStorage.removeItem("user");


        window.location.replace("/login");


    }


    return Promise.reject(error);


}

);









const handleError=(error)=>{


    throw {

        message:

        error.response?.data?.message ||

        error.message ||

        "Something went wrong"

    };


};








// GET ALL TOOLS

export const getTools = async()=>{


try{


const response =
await API.get("/");


return response.data;


}

catch(error){

handleError(error);

}


};









// CREATE TOOL

export const createTool = async(toolData)=>{


try{


const response =
await API.post(

"/",

toolData

);



console.log(

"[Analytics] Tool created successfully"

);



return response.data;



}

catch(error){

handleError(error);

}


};









// GET SINGLE TOOL

export const getToolById = async(id)=>{


try{


const response =
await API.get(`/${id}`);


return response.data;


}

catch(error){

handleError(error);

}


};









// UPDATE TOOL

export const updateTool = async(

id,

toolData

)=>{


try{


const response =
await API.put(

`/${id}`,

toolData

);



console.log(

"[Analytics] Tool updated successfully"

);



return response.data;



}

catch(error){

handleError(error);

}


};









// DELETE TOOL

export const deleteTool = async(id)=>{


try{


const response =
await API.delete(

`/${id}`

);



console.log(

"[Analytics] Tool deleted successfully"

);



return response.data;



}

catch(error){

handleError(error);

}


};