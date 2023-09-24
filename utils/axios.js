import axios from "axios";

const instance = axios.create(
    {
        baseURL : "https://connections-7mih.onrender.com",
        headers : {
            "Content-Type" : "application/json"
        }
    }
)

export const imgInstance = axios.create({
    baseURL : "https://connections-7mih.onrender.com",
    headers : {
        "Content-Type" : "multipart/form-data",
        // Authorization : `Bearer ${getToken()}`
    }
})


export default instance;