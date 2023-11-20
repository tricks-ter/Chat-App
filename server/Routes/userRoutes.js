const express = require("express")
const {registerUser,loginUser,finduser,getUser} = require("../Controller/userController")

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/find/:userid",finduser)
router.get("/",getUser)


module.exports=router;