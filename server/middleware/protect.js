const jwt = require("jsonwebtoken");

const User = require("../models/User");



const protect = async (req, res, next) => {


    try {


        const authHeader =
        req.headers.authorization;



        // Check token exists

        if(
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ){

            return res.status(401).json({

                success:false,

                message:
                "Access denied. Authentication token required."

            });

        }



        const token =
        authHeader.split(" ")[1];



        // Check JWT secret

        if(!process.env.JWT_SECRET){


            console.error(
                "JWT_SECRET is missing"
            );


            return res.status(500).json({

                success:false,

                message:
                "Server configuration error"

            });

        }





        // Verify token

        const decoded =
        jwt.verify(

            token,

            process.env.JWT_SECRET

        );





        // Find user

        const user = await User.findById(

            decoded.id

        )

        .select(

            "_id name email role"

        );






        if(!user){


            return res.status(401).json({

                success:false,

                message:
                "User account no longer exists"

            });


        }







        // Attach authenticated user


        req.user = user;



        next();




    }

    catch(error){



        console.error(

            "Authentication Error:",
            error.message

        );




        // Expired token

        if(
            error.name === "TokenExpiredError"
        ){


            return res.status(401).json({

                success:false,

                message:
                "Session expired. Please login again."

            });


        }






        // Invalid token


        if(
            error.name === "JsonWebTokenError"
        ){


            return res.status(401).json({

                success:false,

                message:
                "Invalid authentication token"

            });


        }





        return res.status(500).json({

            success:false,

            message:
            "Authentication failed"

        });


    }


};





module.exports = protect;