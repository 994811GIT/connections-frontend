import axios from "axios";

const instance = axios.create(
    {
        baseURL : "http://localhost:3000",
        headers : {
            "Content-Type" : "application/json"
        }
    }
)

export const imgInstance = axios.create({
    baseURL : "http://localhost:3000",
    headers : {
        "Content-Type" : "multipart/form-data",
        // Authorization : `Bearer ${getToken()}`
    }
})


export default instance;