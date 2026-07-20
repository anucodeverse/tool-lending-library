const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");




// ==========================
// REGISTER USER
// ==========================


exports.register = async(req,res)=>{


try{


const {

name,

email,

password

}=req.body;





// Validation


if(
!name ||
!email ||
!password
){

return res.status(400).json({

success:false,

message:
"All fields are required"

});

}




if(password.length < 6){


return res.status(400).json({

success:false,

message:
"Password must contain minimum 6 characters"

});


}






// Existing user check


const existingUser =

await User.findOne({

email

});




if(existingUser){


return res.status(409).json({

success:false,

message:
"User already exists"

});


}







// Password hashing


const hashedPassword =

await bcrypt.hash(

password,

12

);







// Create user


const user =

await User.create({


name,


email,


password:hashedPassword



});







res.status(201).json({


success:true,


message:
"Registration successful",


user:{


id:user._id,


name:user.name,


email:user.email,


role:user.role


}



});



}

catch(error){



console.error(

"REGISTER ERROR:",

error.message

);



res.status(500).json({

success:false,

message:
"Registration failed"

});


}



};








// ==========================
// LOGIN USER
// ==========================


exports.login = async(req,res)=>{


try{


const {

email,

password

}=req.body;





if(
!email ||
!password
){


return res.status(400).json({

success:false,

message:
"Email and password required"

});


}







const user =

await User.findOne({

email

})

.select("+password");








if(!user){


return res.status(401).json({

success:false,

message:
"Invalid credentials"

});


}







const isMatch =

await bcrypt.compare(

password,

user.password

);







if(!isMatch){


return res.status(401).json({

success:false,

message:
"Invalid credentials"

});


}







// JWT Secret check


if(!process.env.JWT_SECRET){


return res.status(500).json({

success:false,

message:
"Server configuration error"

});


}








// Generate Token


const token =

jwt.sign(

{


id:user._id,


role:user.role


},


process.env.JWT_SECRET,


{


expiresIn:"1d"


}

);








res.status(200).json({


success:true,


message:
"Login successful",


token,


user:{


id:user._id,


name:user.name,


email:user.email,


role:user.role


}



});





}

catch(error){


console.error(

"LOGIN ERROR:",

error.message

);



res.status(500).json({

success:false,

message:
"Login failed"

});


}



};