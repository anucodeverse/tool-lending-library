import axios from "axios";





const API = axios.create({

    baseURL:
    `${import.meta.env.VITE_API_URL}/api/auth`,

    timeout:10000

});








const handleError = (error)=>{


    return {

        success:false,

        message:

        error.response?.data?.message ||

        error.message ||

        "Something went wrong"

    };


};








// ==========================
// REGISTER
// ==========================


export const registerUser = async(data)=>{


    try{


        const response =

        await API.post(

            "/register",

            data

        );



        console.log(

            "[Analytics] User registration completed"

        );



        return response.data;



    }

    catch(error){


        throw handleError(error);


    }


};








// ==========================
// LOGIN
// ==========================


export const loginUser = async(data)=>{


    try{


        const response =

        await API.post(

            "/login",

            data

        );



        console.log(

            "[Analytics] User login completed"

        );



        return response.data;



    }

    catch(error){


        throw handleError(error);


    }


};