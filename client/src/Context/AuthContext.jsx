import {createContext, useCallback, useEffect, useState} from "react"
import {baseUrl, postRequest} from "../Utils/services.js";






export const AuthContext = createContext()


export const AuthContextProvider =({children})=>{

    const[user,setuser]=useState(null)
    const[LoginInfo,setLoginInfo]=useState({
        name:"",
        email:"",
    })
    const [LoginError,setLoginError] = useState(null)
    const[RegisterError,setRegisterError]=useState(null)
    const[isRegisterLoading,setRegisterLoading]=useState(false)
    const [registerinfo,setregisterinfo]= useState({
        name:"",
        email:"",
        password:""
    });

  useEffect(()=>{
      setuser(JSON.parse(localStorage.getItem("User")))
  },[])





    const updateRegisterinfo=useCallback((info)=>{
        setregisterinfo(info);
    },[])

    const updateLogininfo=useCallback((info)=>{
        setLoginInfo(info)
    },[])

    const registerUser = useCallback(async (e)=>{
        e.preventDefault();
        setRegisterLoading(true)
        setRegisterError(null)

        const response =await postRequest(`${baseUrl}/users/register`,JSON.stringify( registerinfo))

        setRegisterLoading(false)


        if (response.error){
            return setRegisterError(response)
        }

        localStorage.setItem("User",JSON.stringify(response))
        setuser(response)

    },[registerinfo])


    const logInUser = useCallback(async (e)=>{
        e.preventDefault()
        setLoginError(null)
        const response =await postRequest(`${baseUrl}/users/login`,JSON.stringify( LoginInfo))

        if (response.error){
            return setLoginError(response)
        }
        localStorage.setItem("User",JSON.stringify(response))
        setuser(response)

    },[LoginInfo])




    const logOutUser=useCallback(()=>{
        localStorage.removeItem("User")
        setuser(null)
    },[])




    return <AuthContext.Provider value={{user,registerinfo,updateRegisterinfo,registerUser,RegisterError,isRegisterLoading,logOutUser,LoginInfo,logInUser,updateLogininfo,LoginError}}>
        {children}
    </AuthContext.Provider>
}