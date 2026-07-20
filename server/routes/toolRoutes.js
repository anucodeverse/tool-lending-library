const express = require("express");

const router = express.Router();



const protect =
require("../middleware/protect");


const authorize =
require("../middleware/authorize");




const {

    createTool,

    getTools,

    getToolById,

    updateTool,

    deleteTool

}

=

require("../controllers/toolController");





// ==========================
// CREATE TOOL
// Staff + Manager
// ==========================


router.post(

    "/",

    protect,

    authorize(
        "staff",
        "manager"
    ),

    createTool

);






// ==========================
// GET ALL TOOLS
// Staff + Manager
// ==========================


router.get(

    "/",

    protect,

    authorize(
        "staff",
        "manager"
    ),

    getTools

);







// ==========================
// GET SINGLE TOOL
// Staff + Manager
// ==========================


router.get(

    "/:id",

    protect,

    authorize(
        "staff",
        "manager"
    ),

    getToolById

);







// ==========================
// UPDATE TOOL
// Staff + Manager
// ==========================


router.put(

    "/:id",

    protect,

    authorize(
        "staff",
        "manager"
    ),

    updateTool

);








// ==========================
// DELETE TOOL
// ONLY MANAGER
// ==========================


router.delete(

    "/:id",

    protect,

    authorize(
        "manager"
    ),

    deleteTool

);







module.exports = router;