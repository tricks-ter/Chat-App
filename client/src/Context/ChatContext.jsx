import {createContext, useCallback, useEffect, useState} from "react";
import{getRequest,baseUrl} from "../Utils/services.js";


export const ChatContext = createContext();

export const ChatContextProvider=({children,user})=>{

    const [userChats,setUserChats]= useState(null);
    const [isUserChatLoading,setIsUserChatLoading]=useState(false)
    const [userChatError,setUserChatError]= useState(null)
    const [potentialChats,setPotentialChats]=useState([])

    useEffect(()=>{
        const getUsers =async ()=>{
            const response = await getRequest(`${baseUrl}/users`)
            if (response.error){
                return console.log("Error Fetching users",response)
            }
            const pchats=response.filter((u)=>{
                let isChatCreated =false
                if (user?.id===u?._id) return false;



                if(userChats){
                    isChatCreated=userChats?.some((chat)=>{
                        return chat.members[0]  === u?._id ||chat.members[1] === u?._id
                    })
                }
                return !isChatCreated;


            })
            setPotentialChats((pchats))
        }
        getUsers()


    },[userChats])

    useEffect(()=>{

        const getUserChats=async ()=>{

            if (user?.id) {
                setIsUserChatLoading(true)
                setUserChatError(null)

                const response = await getRequest(`${baseUrl}/chats/${user?.id}`)
                setIsUserChatLoading(false)
                if (response.error){
                    return setUserChatError(response)
                }
                setUserChats(response)
            }



        }

        getUserChats()



    },[user])


    const createChats = useCallback(async (firstId,secondId)=>{

        const response = await getRequest(`${baseUrl}/chats/`,JSON.stringify({firstId,secondId}))

        if (response.error) return console.log(response)


        setUserChats((prev)=>[...prev,response])
    },[])



    return<ChatContext.Provider value={{
        userChats,
        isUserChatLoading,
        userChatError,
        potentialChats,
        createChats,
    }}>
        {children}

    </ChatContext.Provider>


}

