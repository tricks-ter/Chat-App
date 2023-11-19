import {createContext, useCallback, useEffect, useState} from "react";
import {getRequest, baseUrl, postRequest} from "../Utils/services.js";
import {io} from "socket.io-client"
import chat from "../Pages/Chat.jsx";


export const ChatContext = createContext();

export const ChatContextProvider=({children,user})=>{

    const [userChats,setUserChats]= useState(null);
    const [isUserChatLoading,setIsUserChatLoading]=useState(false)
    const [userChatError,setUserChatError]= useState(null)
    const [potentialChats,setPotentialChats]=useState([])
    const [currentChat,setCurrentChat]= useState(null)
    const [messages,setMessages]=useState(null)
    const [isMessagesLoading,setIsMessagesLoading]=useState(false)
    const [messagesError,setMessagesError]=useState(null)
    const [sendTextMessageError,setSendTextMessageError]= useState(null)
    const [newMessage,setNewMessage]=useState(null)
    const [socket,setSocket]=useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
    const [notifications,setNotifications]=useState([])
    const [allUsers,setAllUsers]=useState([])


    useEffect(()=>{
        const newSocket=io("http://chat-app-production-ee2c.up.railway.app")
        setSocket(newSocket)

        return ()=>{
            newSocket.disconnect()
        }

    },[user])

    useEffect(()=>{
        if (socket===null) return
       socket.emit("addNewUser",user?.id)
        socket.on("getOnlineUsers",(res)=>{
                setOnlineUsers(res)
        })
        return ()=>{
            socket.off("getOnlineUsers")
        }

    },[socket])



    useEffect(()=>{
        if (socket===null) return
        const recipientId= currentChat?.members.find((id)=> id !==user?.id)
        socket.emit("sendMessage",{...newMessage,recipientId})



    },[newMessage])


    useEffect(()=>{
        if (socket===null) return
        socket.on("getMessage",res=>{
            if (currentChat?._id !==res.chatId) return

            setMessages((prev)=>[...prev,res])

        })
        socket.on("getNotification",(res)=>{
            const isChatOpen=currentChat?.members.some(id=> id===res.senderId)
            if (isChatOpen){
                setNotifications(prev=>[{...res,isRead:true},...prev])
            }else {
                setNotifications(prev=>[res,...prev])
            }


        })


        return ()=>{
            socket.off("getMessage")
            socket.off("getNotification")
        }


    },[socket,currentChat])



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
            setAllUsers(response)
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



    },[user,notifications])


    useEffect(()=>{

        const getMessages=async ()=>{
                setIsMessagesLoading(true)
                setMessagesError(null)

                const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`)

            setIsMessagesLoading(false)
                if (response.error){
                    return setMessagesError(response)
                }
                setMessages(response)




        }

        getMessages()



    },[currentChat])

    const sendTextMessage = useCallback(async (textMessage,sender,currentChatId,setTextMessage)=>{

        if (!textMessage) return console.log("write Something ...")

       const response =await postRequest(`${baseUrl}/messages`,JSON.stringify({
            chatId:currentChatId,
            senderId:sender.id,
            text:textMessage,
        }))
        if (response.error){
            return setSendTextMessageError(response)
        }

        setNewMessage(response)
        setMessages((prev)=>[...prev,response])
        setTextMessage("")



    },[])










    const updateCurrentChat= useCallback((chat)=>{

        setCurrentChat(chat)

    },[])




    const createChats = useCallback(async (firstId,secondId)=>{

        const response = await postRequest(`${baseUrl}/chats/`,JSON.stringify({firstId,secondId}))

        if (response.error) return console.log(response)

        setUserChats((prev)=>[...prev,response])
    },[])


    const markAllNotificationsAsRead = useCallback((notifications)=>{
        const mNotifications = notifications.map(n =>{
            return {...n,isRead:true}
        })
        setNotifications(mNotifications)
    },[])

    const markNotificationAsRead=useCallback((n,userChats,user,notifications)=>{

            const desireChat =userChats.find(chat=>{
                const chatMembers = [user.id,n.senderId]
                const isDesiredChat =chat?.members.every(member =>{
                    return chatMembers.includes(member)
                })
                return isDesiredChat
            })

        //mark notifcation as read
        const mNotifications = notifications.map(el=>{
            if (n.senderId===el.senderId){
                return {...n,isRead:true}
            }else {
                return el
            }
        })



        updateCurrentChat(desireChat)
        setNotifications(mNotifications)


    },[])

    const markThisUserNotificationAsRead= useCallback((thisUserNotifications,notifications)=>{
        const mNotifications =notifications?.map(el =>{
            let notification;
            thisUserNotifications?.forEach(n=>{
                if (n.senderId===el.senderId){
                    notification={...n,isRead:true}
                }else{
                    notification=el
                }
            })
            return notification
        })

        setNotifications(mNotifications)

    },[])




    return<ChatContext.Provider value={{
        userChats,
        isUserChatLoading,
        userChatError,
        potentialChats,
        createChats,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat,
        sendTextMessage,
        onlineUsers,
        notifications,
        allUsers,
        markAllNotificationsAsRead,
        markNotificationAsRead,
        markThisUserNotificationAsRead,
    }}>
        {children}

    </ChatContext.Provider>


}

