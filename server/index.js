require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose= require("mongoose")
const userRouter=require("./Routes/userRoutes")
const userModel= require("./Models/userModel")
const app=express()
const port= process.env.PORT;
const uri=process.env.MONGO
const chatRoute= require("./Routes/chatRoute")
const messageRoute= require("./Routes/messageRoute")




app.use(express.json())
app.use(cors())
app.use("/api/users",userRouter)
app.use("/api/chats",chatRoute)
app.use("/api/messages",messageRoute)
mongoose.connect(uri).then(()=> console.log("Mongo db connection established")).catch((error)=> console.log("Connection filed",error.message))


app.get("/",(req,res)=>{
    res.send("Welcome to Chat app APIs")

})

























app.listen(port,(req,res)=>{
    console.log(`listening on port: ${port}`)
})
