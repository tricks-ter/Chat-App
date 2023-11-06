import {Routes ,Route,Navigate} from "react-router-dom";
import Chat from "./Pages/Chat.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from "react-bootstrap";
import NavBar from "./Components/NavBar.jsx";

function App(){

    return (
        <>
        <NavBar/>
        <Container className="text-secondary">
            <Routes>
                <Route path="/" element={<Chat/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<Navigate to="/"/>} />
            </Routes>
        </Container>
        </>


    )
}

export default App;