const mongoose=require("mongoose")

const UserSchema =new mongoose.Schema({
        name: {type: String, required: true, minlength: 3, maxlength: 30},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true}
    },{
    timestamps:true
    }


)


const userModel =mongoose.model("User",UserSchema)

module.exports = userModel