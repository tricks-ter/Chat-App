import {useContext, useEffect, useState} from "react";
import {ChatContext} from "../Context/ChatContext.jsx";
import {baseUrl, getRequest} from "../Utils/services.js";


export const useFetchLatestMessage =(chat)=>{
    const {newMessage,notifications}=useContext(ChatContext)
    const [latestMessage,setLatestMessage]= useState(null)

    useEffect(()=>{
        const getMessage =async ()=>{
            const response =await getRequest(`${baseUrl}/messages/${chat?._id}`)
            if (response.error){
                return console.log("error getting message ... ",response.error)
            }
            const lastMessage = response[response?.length-1 ]
            setLatestMessage(lastMessage);



        }
        getMessage()


    },[newMessage,notifications])

    return {latestMessage}



}