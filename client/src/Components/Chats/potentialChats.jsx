import {useContext} from "react";
import {ChatContext} from "../../Context/ChatContext.jsx";
import userChat from "./UserChat.jsx";
import {AuthContext} from "../../Context/AuthContext.jsx";

const PotentialChats =()=>{

    const {user}=useContext(AuthContext)
    const{potentialChats,createChats,onlineUsers}=useContext(ChatContext)
    return<>
    <div className="all-users" key={null}>
        {potentialChats && potentialChats.map((u, index)=>{
            return(
            <div className="single-user" key={index} onClick={()=>createChats(user.id,u._id)}>
                {u.name}

                <span key={index} className={
                    onlineUsers?.some((user) => user?.userId ===u._id)?"user-online": ""}></span>
            </div>
            )

        })}
    </div>

    </>

}

export default PotentialChats