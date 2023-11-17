const messageModel =require("../Models/messageModel")

//create Message

const createMessage = async (req,res) =>{
    const {chatId,senderId,text}= req.body


   const message = new messageModel({
       chatId:chatId,
       senderId:senderId,
       text:text,
   })

    try {

        const response = await message.save()
        res.status(200).json(response)


    }catch (e) {
        console.log(e)
        res.status(500).json(e)
    }



}



//get Message


const getMessage = async (req,res)=>{

    const {chatId}= req.params;
    try {
        const messages=await messageModel.find({chatId})
        res.status(200).json(messages)


    }catch (e) {
        console.log(e)
        res.status(500).json(e)
    }

}

module.exports={createMessage,getMessage}