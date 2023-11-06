import {createContext, useCallback, useState} from "react"






export const AuthContext = createContext()

export const AuthContextProvider =({children})=>{

    const[user,setuser]=useState(null)
    const [registerinfo,setregisterinfo]= useState({
        name:"",
        email:"",
        password:""
    });

    const updateRegisterinfo=useCallback((info)=>{
        setregisterinfo(info);
    },[])
    console.log("registerinfo",registerinfo)


    return <AuthContext.Provider value={{user,registerinfo,updateRegisterinfo,}}>
        {children}
    </AuthContext.Provider>
}