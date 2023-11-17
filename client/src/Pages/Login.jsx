import {Alert, Button, Col, Form, Row, Stack} from "react-bootstrap";
import {useContext} from "react";
import {AuthContext} from "../Context/AuthContext.jsx";


const Login=()=>{
    const {LoginInfo,logInUser,updateLogininfo,LoginError} = useContext(AuthContext)

    return(
        <>
            <Form onSubmit={logInUser}>
                <Row style={{
                    justifyContent:"center",
                    paddingTop:"15%"
                }}>
                    <Col xs={6}>
                        <Stack gap="3">
                            <h2>Login</h2>
                            <Form.Control type="email" placeholder="Email" onChange={(e)=>{updateLogininfo({...LoginInfo,email:e.target.value })}}/>
                            <Form.Control type="password" placeholder="Password" onChange={(e)=>{updateLogininfo({...LoginInfo,password:e.target.value })}}/>
                            <Button variant="primary" type="submit" >
                                Login
                            </Button>
                            {LoginError &&  <Alert variant="danger"><p>An Error Occurred</p></Alert>}

                        </Stack>
                    </Col>

                </Row>


            </Form>

        </>
    )
}
export default Login;