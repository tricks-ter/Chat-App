import {Container,Nav,Navbar,Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../Context/AuthContext.jsx";
import Notifications from "./Chats/Notifications.jsx";




const NavBar =()=>{

    const {user,logOutUser}=useContext(AuthContext)

    return (
        <Navbar bg="dark" className="mb-4" style={{height:"3.75rem"}}>
        <Container>
            <h2>
                <Link to="/" className="link-light text-decoration-none">
                    ChatApp
                </Link>
            </h2>
            { user ? <span className="text-primary">Logged in As {user?.name}</span>: ""}
            <Nav>
                <Stack direction="horizontal" gap="3">

                    {
                        user ? (<><Notifications />
                        <Link to="/login" className="link-light text-decoration-none" onClick={logOutUser} >Logout</Link>
                        </>) : (<> <Link to="/login" className="link-light text-decoration-none">
                            Login
                        </Link>
                            <Link to="/register" className="link-light text-decoration-none">
                                Register
                            </Link></>)

                    }

                </Stack>
            </Nav>
        </Container>
        </Navbar>
    )

}
export default NavBar;