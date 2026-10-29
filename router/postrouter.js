const express= require("express");
const router = express.Router();


const {getallposts,getsinglepost,creatpost,deletepost, updatepost} =require("../controller/postcontroller");

router.get("/",getallposts)
router.get("/:id",getsinglepost)
router.post("/",creatpost)
router.delete("/:id",deletepost)
router.patch("/:id",updatepost)

module.exports= router; 