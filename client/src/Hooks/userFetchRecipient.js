import {useEffect,useState} from "react";
import {baseUrl, getRequest} from "../Utils/services.js";


export const userFetchRecipientUser =(chat,user)=>{

    const [recipientUser,setRecipientUser]=useState(null)
    const [error,setError]=useState(null)


    const recipientId= chat?.members.find((id)=> id !==user?.id)

    useEffect(()=>{
        const getUser =async ()=>{
            setRecipientUser(null)
            if (!recipientId) return null
            const response = await getRequest(`${baseUrl}/users/find/${recipientId}`)
            if (response?.error){
                setError(error)
            }
            setRecipientUser(response)
        }
        getUser()
    },[recipientId])
    return{recipientUser,error}
}
