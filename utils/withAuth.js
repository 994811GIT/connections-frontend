const { useRouter } = require("next/router")
const { useState, useEffect } = require("react")
const { getToken } = require("../utils")

const withAuth = WrappedComponent =>{
    return props =>{
        const router = useRouter()
        const [token,setToken] = useState("")

        useEffect(()=>{
                if(getToken()){
                    setToken(getToken())
                }else{
                    router.push('/user/login')
                }
        }, [])

        if(token){
            return( <WrappedComponent {...props}/>)
        }else{
            return null
        }
    }
    
}

export default withAuth;