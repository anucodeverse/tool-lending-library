const Tool = require("../models/Tool");

const mongoose = require("mongoose");

const DOMPurify = require("isomorphic-dompurify");




// Sanitize helper

const cleanText = (value)=>{

    if(!value) return value;

    return DOMPurify.sanitize(value);

};





// ==========================
// CREATE TOOL
// ==========================


exports.createTool = async(req,res)=>{


try{


const tool = await Tool.create({


name:
cleanText(req.body.name),


category:
cleanText(req.body.category),


quantity:req.body.quantity,


status:req.body.status || "Available",


description:
cleanText(req.body.description),


createdBy:req.user._id



});





console.log(

"[Analytics] User created tool"

);





res.status(201).json({

success:true,

message:
"Tool created successfully",

tool

});




}
catch(error){


res.status(400).json({

success:false,

message:error.message

});


}



};







// ==========================
// GET ALL TOOLS
// ==========================


exports.getTools = async(req,res)=>{


try{


const tools = await Tool.find()

.populate(

"createdBy",

"name email"

)

.sort({

createdAt:-1

})

.lean();





res.status(200).json({

success:true,

count:tools.length,

tools

});



}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}



};







// ==========================
// GET SINGLE TOOL
// ==========================


exports.getToolById = async(req,res)=>{


try{


if(

!mongoose.Types.ObjectId.isValid(
req.params.id
)

){


return res.status(400).json({

success:false,

message:"Invalid tool id"

});


}






const tool = await Tool.findById(

req.params.id

)

.populate(

"createdBy",

"name email"

);







if(!tool){


return res.status(404).json({

success:false,

message:"Tool not found"

});


}







res.json({

success:true,

tool

});



}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};







// ==========================
// UPDATE TOOL
// ==========================


exports.updateTool = async(req,res)=>{


try{


if(

!mongoose.Types.ObjectId.isValid(
req.params.id
)

){


return res.status(400).json({

success:false,

message:"Invalid tool id"

});


}







const tool = await Tool.findById(

req.params.id

);







if(!tool){


return res.status(404).json({

success:false,

message:"Tool not found"

});


}








const updatedTool = await Tool.findByIdAndUpdate(

req.params.id,


{


name:
cleanText(req.body.name),


category:
cleanText(req.body.category),


quantity:req.body.quantity,


status:req.body.status,


description:
cleanText(req.body.description)


},


{

new:true,

runValidators:true

}


);







console.log(

"[Analytics] User updated tool"

);






res.json({

success:true,

message:
"Tool updated successfully",

tool:updatedTool

});




}
catch(error){


res.status(400).json({

success:false,

message:error.message

});


}


};









// ==========================
// DELETE TOOL
// ==========================


exports.deleteTool = async(req,res)=>{


try{


if(

!mongoose.Types.ObjectId.isValid(
req.params.id
)

){


return res.status(400).json({

success:false,

message:"Invalid tool id"

});


}







const tool = await Tool.findById(

req.params.id

);






if(!tool){


return res.status(404).json({

success:false,

message:"Tool not found"

});


}








await tool.deleteOne();







console.log(

"[Analytics] User deleted tool"

);







res.json({

success:true,

message:
"Tool deleted successfully"

});



}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};