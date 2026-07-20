const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(

{

    name: {

        type: String,

        required: [
            true,
            "Name is required"
        ],

        trim: true,

        minlength: [
            3,
            "Name must contain at least 3 characters"
        ],

        maxlength: [
            50,
            "Name cannot exceed 50 characters"
        ]

    },


    email: {

        type: String,

        required: [
            true,
            "Email is required"
        ],

        unique: true,

        lowercase: true,

        trim: true,

        match: [

            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

            "Please enter a valid email"

        ]

    },


    password: {

        type: String,

        required: [

            true,

            "Password is required"

        ],


        minlength: [

            6,

            "Password must contain at least 6 characters"

        ],


        select: false

    },


    role: {

        type: String,

        enum: [

            "staff",

            "manager"

        ],

        default: "staff"

    }


},





{

    timestamps: true,

    collection: "users"

}


);


// REMOVE THIS PART
// userSchema.index({
//     email: 1
// });



module.exports = mongoose.model(

    "User",

    userSchema

);