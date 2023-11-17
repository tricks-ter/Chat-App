import {userFetchRecipientUser} from "../../Hooks/userFetchRecipient.js";
import {Stack} from "react-bootstrap";
import avatar from "../../assets/Avatar/avatar.svg"
import {useContext} from "react";
import {ChatContext} from "../../Context/ChatContext.jsx";
import {unreadNotifications} from "../../Utils/UnreadNotifications.js";
import {useFetchLatestMessage} from "../../Hooks/useFetchLatestMessage.js";
import moment from "moment";
const UserChat=({chat,user})=>{

    const {recipientUser}=userFetchRecipientUser(chat,user)
    const {onlineUsers,notifications,markThisUserNotificationAsRead}=useContext(ChatContext)
    const {latestMessage}= useFetchLatestMessage(chat)
    const Unreadnotifications = unreadNotifications(notifications);
    const thisUserNotification= Unreadnotifications?.filter(
        n=>n.senderId === recipientUser._id
    )
    const truncateText = (text)=>{
        let shortText = text.substring(0,20);
        if (text.length>20){
            shortText=shortText+"..."
        }
        return shortText
    }



    const isOnline = onlineUsers?.some((user) => user?.userId ===recipientUser?._id)


    return(<Stack direction="horizontal"
                  gap={3}
                  role="button"
                  onClick={()=>{
                      if (thisUserNotification?.length!==0){
                          markThisUserNotificationAsRead(thisUserNotification,notifications)

                  }}
                  }
                  className="user-card align-items-center p-2 justify-content-between">
    <div className="d-flex">
        <div className="me-2">
            <img src={avatar} alt="Avatar" height="35px"/>
        </div>
        <div className="text-content">
            <div className="name">{recipientUser?.name}</div>
            <div className="text">{latestMessage?.text && truncateText(latestMessage?.text)}</div>
        </div>
    </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">{moment(latestMessage?.createdAt).calendar()}</div>
            <div className={thisUserNotification?.length>0?"this-user-notifications ":""}>{thisUserNotification?.length>0?thisUserNotification.length:""}</div>
            <span className={isOnline ? "user-online":""}></span>
        </div>
    </Stack>)
}
export default UserChat