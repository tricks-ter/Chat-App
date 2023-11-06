
import{Alert,Button,Form,Row,Col,Stack} from "react-bootstrap";
import {useContext} from "react";
import {AuthContext} from "../Context/AuthContext.jsx";


const Register =()=>{


    const {registerinfo,updateRegisterinfo} = useContext(AuthContext)
    return(

        <>
        <Form>
            <Row style={{
                justifyContent:"center",
                paddingTop:"15%"
            }}>
                <Col xs={6}>
                    <Stack gap="3">
                        <h2>Register</h2>
                        <Form.Control type="text" placeholder="Name" onChange={(e)=>{updateRegisterinfo({...registerinfo,name: e.target.value})}}/>
                        <Form.Control type="email" placeholder="Email"/>
                        <Form.Control type="password" placeholder="Password"/>
                        <Button type="submit" >
                            Register
                        </Button>
                        <Alert variant="danger"><p>An Error Occurred</p></Alert>
                    </Stack>
                </Col>

            </Row>


        </Form>

        </>

        )

}
export default Register;