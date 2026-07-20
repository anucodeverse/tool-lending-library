const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");


// Load environment variables first
dotenv.config();


const connectDB = require("./config/db");


const authRoutes = require("./routes/authRoutes");
const toolRoutes = require("./routes/toolRoutes");


const protect = require("./middleware/protect");



const app = express();



// ==========================
// DATABASE CONNECTION
// ==========================

connectDB();



// ==========================
// SECURITY MIDDLEWARE
// ==========================


// Allowed frontend origins

const allowedOrigins = [

    "http://localhost:5173",

    "http://localhost:4173"

];


// Add deployment URL later

// Example:
// "https://tool-lending-library.vercel.app"



app.use(

    cors({

        origin:(origin,callback)=>{


            // Allow Postman/mobile requests

            if(!origin){

                return callback(null,true);

            }



            if(
                allowedOrigins.includes(origin)
            ){

                return callback(null,true);

            }



            return callback(

                new Error(
                    `CORS blocked: ${origin}`
                )

            );


        },


        credentials:true

    })

);



// Security headers

app.use(
    helmet()
);



// Request logger

app.use(
    morgan("dev")
);



// Prevent large payload attacks

app.use(

    express.json({

        limit:"10kb"

    })

);





// ==========================
// API ROUTES
// ==========================



// Health check

app.get(

"/",

(req,res)=>{


res.status(200).json({

    success:true,

    message:
    "Tool Lending Library API Running",

    environment:
    process.env.NODE_ENV || "development"

});


}

);




// Authentication routes

app.use(

"/api/auth",

authRoutes

);




// Tool CRUD routes

app.use(

"/api/tools",

toolRoutes

);





// Protected test route

app.get(

"/api/test",

protect,

(req,res)=>{


res.status(200).json({

    success:true,

    message:
    "Protected route working",

    user:req.user

});


}

);





// ==========================
// 404 HANDLER
// ==========================


app.use(

(req,res)=>{


res.status(404).json({

    success:false,

    message:
    "API endpoint not found"

});


}

);






// ==========================
// GLOBAL ERROR HANDLER
// ==========================


app.use(

(err,req,res,next)=>{


console.error(
    "ERROR:",
    err.message
);



res.status(

    err.statusCode || 500

)

.json({

    success:false,

    message:
    err.message || "Internal Server Error"

});


}

);





// ==========================
// SERVER START
// ==========================


const PORT =
process.env.PORT || 5000;



app.listen(

PORT,

()=>{


console.log(

`Server running on port ${PORT}`

);


}

);