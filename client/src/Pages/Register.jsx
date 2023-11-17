
import{Alert,Button,Form,Row,Col,Stack} from "react-bootstrap";
import {useContext} from "react";
import {AuthContext} from "../Context/AuthContext.jsx";


const Register =()=>{


    const{registerinfo,updateRegisterinfo,registerUser,RegisterError,isRegisterLoading} = useContext(AuthContext)
    return(

        <>
        <Form onSubmit={registerUser}>
            <Row style={{
                justifyContent:"center",
                paddingTop:"15%"
            }}>
                <Col xs={6}>
                    <Stack gap="3">
                        <h2>Register</h2>
                        <h2>{registerinfo.name}</h2>
                        <Form.Control type="text" placeholder="Name" onChange={(e)=>{updateRegisterinfo({...registerinfo,name: e.target.value})}}/>
                        <Form.Control type="email" placeholder="Email" onChange={(e)=>{updateRegisterinfo({...registerinfo,email: e.target.value})}}/>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>{updateRegisterinfo({...registerinfo,password: e.target.value})}}/>
                        <Button type="submit" >
                            { isRegisterLoading ? "Creating your Account " :"Register"}
                        </Button>
                        {
                            RegisterError?.error &&  <Alert variant="danger"><p>{RegisterError?.message}</p></Alert>
                        }

                    </Stack>
                </Col>

            </Row>


        </Form>

        </>

        )

}
export default Register;