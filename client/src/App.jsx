import {Routes ,Route,Navigate} from "react-router-dom";
import Chat from "./Pages/Chat.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from "react-bootstrap";
import NavBar from "./Components/NavBar.jsx";
import {useContext} from "react";
import {AuthContext} from "./Context/AuthContext.jsx";
import {ChatContextProvider} from "./Context/ChatContext.jsx";

function App(){

    const{user} = useContext(AuthContext);


    return (
        <ChatContextProvider user={user}>
        <NavBar/>
        <Container className="text-secondary">
            <Routes>
                <Route path="/" element={user ? <Chat/> : <Login/>}/>
                <Route path="/register" element={user ?<Chat/> : <Register/>}/>
                <Route path="/login" element={user ? <Chat/> : <Login/>}/>
                <Route path="*" element={<Navigate to="/"/>} />
            </Routes>
        </Container>
        </ChatContextProvider>


    )
}

export default App;