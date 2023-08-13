import styles from "@/styles/login.module.css"
import Input from "../../../components/input"
import Button from "../../../components/button"
import instance from "../../../utils/axios"
import { useState } from "react"
import { useRouter } from "next/router"
import { setToken, getToken, setUser } from "../../../utils"
import Link from "next/link"

export default function Login() {

    const router = useRouter()

    const [formData, setFormData] = useState({ username: "", password: "" })
    const onChange = (e, label) => {
        setFormData({ ...formData, [label]: e.target.value })
        console.log({ ...formData, [label]: e.target.value })
    }

    const submitData = async () => {
        try {
            const result = await instance.post('/login', formData)
            setToken(result.data.token)
            setUser(result.data.userId)
            if (result.data.userData.loginCount == 0) {
                router.push('/user/userdetails')
            } else {
                router.push('/')
            }
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className={styles.body}>
            <div className={styles.upperBody}>
                <h1>Connections.io</h1>
            </div>
            <div className={styles.registration}>
                <h2>Login to continue</h2>
                <Input text="username" onChange={e => { onChange(e, "username") }} />
                <Input text="create password" type="password" onChange={e => { onChange(e, "password") }} />
                <Button text="Login" class="login" onClick={submitData} />
                <Link href='/user/signup' className={styles.signuplink} >New to connections? Click here to signup</Link>
            </div>
        </div>
    )
}