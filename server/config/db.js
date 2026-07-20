const mongoose = require("mongoose");



const connectDB = async () => {


    try {


        if(!process.env.MONGO_URI){


            console.error(
                "MONGO_URI is missing in environment variables"
            );


            process.exit(1);

        }





        const connection = await mongoose.connect(

            process.env.MONGO_URI

        );





        console.log(

            `MongoDB Connected: ${connection.connection.host}`

        );



    }


    catch(error){


        console.error(

            "Database Connection Failed:",

            error.message

        );



        process.exit(1);


    }


};





module.exports = connectDB;