import {useContext} from "react";
import {ChatContext} from "../Context/ChatContext.jsx";
import Login from "./Login.jsx";
import {Container, Stack} from "react-bootstrap";
import UserChat from "../Components/Chats/UserChat.jsx";
import {AuthContext} from "../Context/AuthContext.jsx";
import PotentialChats from "../Components/Chats/potentialChats.jsx";
import ChatBox from "../Components/Chats/ChatBox.jsx";

const Chat =()=>{
    const {userChats, isUserChatLoading, updateCurrentChat}=useContext(ChatContext)
    const {user}=useContext(AuthContext)





    return <Container>
        <PotentialChats/>

        {userChats &&<Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                {isUserChatLoading && <p>Loading Chats...</p>}
                {userChats?.map((chat,index)=>{
                    return(
                        <div key={index} onClick={()=> updateCurrentChat(chat)}>
                            <UserChat chat={chat} user={user}></UserChat>
                        </div>
                    )
                })}

            </Stack>



            <ChatBox/>
        </Stack>}


    </Container>
}

export default Chat;