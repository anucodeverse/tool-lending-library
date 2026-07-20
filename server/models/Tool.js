const mongoose = require("mongoose");



const toolSchema = new mongoose.Schema(

{

    name: {

        type: String,

        required: [

            true,

            "Tool name is required"

        ],

        trim: true,


        minlength: [

            3,

            "Tool name must contain minimum 3 characters"

        ],


        maxlength: [

            100,

            "Tool name cannot exceed 100 characters"

        ]

    },





    category: {

        type: String,


        required: [

            true,

            "Tool category is required"

        ],


        trim: true,


        lowercase:true,


        minlength:[

            2,

            "Category must contain minimum 2 characters"

        ],


        maxlength:[

            50,

            "Category cannot exceed 50 characters"

        ]

    },







    quantity: {


        type:Number,


        required:[

            true,

            "Tool quantity is required"

        ],


        min:[

            1,

            "Quantity must be greater than zero"

        ],


        validate:{


            validator:Number.isInteger,


            message:
            "Quantity must be a whole number"


        }


    },







    status:{


        type:String,


        enum:{


            values:[

                "Available",

                "Borrowed",

                "Maintenance"

            ],


            message:
            "Invalid tool status"


        },


        default:"Available"


    },









    description:{


        type:String,


        trim:true,


        maxlength:[

            500,

            "Description cannot exceed 500 characters"

        ]

    },









    createdBy:{


        type:mongoose.Schema.Types.ObjectId,


        ref:"User",


        required:[

            true,

            "Creator information required"

        ],


        index:true

    }





},



{


timestamps:true,


collection:"tools"


}

);








// Search performance

toolSchema.index({

    name:1,

    category:1,

    status:1

});





module.exports = mongoose.model(

    "Tool",

    toolSchema

);