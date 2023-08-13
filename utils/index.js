export const setToken = token =>{
    if( typeof window != "undefined"){
        localStorage.setItem("token",token)
    }
}

export const getToken = () =>{
    if( typeof window != "undefined"){
        return localStorage.getItem("token")
    }
}

export const removeToken = () =>{
    if( typeof window != "undefined")
        return localStorage.removeItem("token")
}

export const setUser = (userId) =>{
    if( typeof window != "undefined")
        localStorage.setItem("userId",userId)
}

export const getUser = () =>{
    if(typeof window != "undefined")
        return localStorage.getItem("userId")
}
export const removeUser = () =>{
    if(typeof window != "undefined")
       return localStorage.removeItem("userId")
}
