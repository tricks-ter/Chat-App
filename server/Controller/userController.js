const userModel= require("../Models/userModel")
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt= require("jsonwebtoken")
require("dotenv").config()
const createToken =(_id) =>{
    const jwtkey = process.env.JWT

    return jwt.sign({_id},jwtkey,{expiresIn: "3d"})

}



const registerUser= async (req,res)=> {
    try {
        const {name, email, password} = req.body

        let user = await userModel.findOne({email})
        if (user) return res.status(400).json("User Already Exists")

        if (!name || !email || !password) return res.status(400).json("All Fields are Required...")

        if (!validator.isEmail(email)) return res.status(400).json("Email must be valid...")

        if (!validator.isStrongPassword(password)) return res.status(400).json("Password must be strong...")

        user = new userModel({
            name,
            email,
            password
        })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        await user.save()
        const token = createToken(user._id)
        res.status(200).json({
            id: user._id,
            name,
            email,
            token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }

}
    const loginUser = async (req, res) => {
        const {email, password} = req.body;

        try {
            let user = await userModel.findOne({email})


            if (!user) return res.status(400).json("Invalid email or password")

            const isValidPassword = await bcrypt.compare(password, user.password)

            if (!isValidPassword) return res.status(400).json("Invalid email or password")


            const token = createToken(user._id);
            res.status(200).json({
                id: user._id,
                name: user.name,
                email, token

            })


        } catch (e) {
            console.log(e)
        }
    }

    const finduser=async (req,res)=>{

        const userID = req.params.userid
        try{
            const user = await userModel.findById(userID)

            res.status(200).json(user)



        }catch (e){
            console.log(e)
            res.status(500)
        }

    }

    const getUser =async (req,res)=>{
    try {
        const users= await userModel.find()
        res.status(200).json(users)

    }catch (e) {
        console.log(e)
    }

    }





module.exports = {registerUser,loginUser,finduser,getUser}