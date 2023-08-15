import styles from "@/styles/signup.module.css"
import Input from "../../../components/input"
import CustomDatePicker from "../../../components/datepicker"
import RadioButton from "../../../components/radio"
import Button from "../../../components/button"
import instance from "../../../utils/axios"
import { useState } from "react"
import { useRouter } from "next/router"


export default function Signup() {

    const router = useRouter()

    const [formData,setFormData] = useState({name :"",username :"",contact : "",password :"",confirmPassword : "",dob : "",gender : ""})

    const onChange = (e,label) =>{

        if(label == "gender"){
            setFormData({...formData,"gender" : e.target.value})
            console.log({...formData,"gender" : e.target.value})
        }else
        setFormData({...formData,[label] : e.target.value})
        console.log({...formData,[label] : e.target.value})
    }
    const onSelect = (date, dateString) =>{
        setFormData({...formData,"dob" : dateString})
        console.log(formData)
    }
    const submitData = async () => {
        const result = await instance.post('/signup',formData)
        console.log(result)
        router.push('/user/login')
    }
    

    return (
        <div className={styles.body}>
            <div className={styles.upperBody}>
                <h1>Connections.io</h1>
            </div>
            <div className={styles.registration}>
                <Input text="Name" onChange={e=>{onChange(e,"name")}}/>
                <Input text="username" onChange={e=>{onChange(e,"username")}}/>
                <Input text="Mobile number or email address" onChange={e=>{onChange(e,"contact")}}/>
                <Input type="password" text="create password" onChange={e=>{onChange(e,"password")}}/>
                <Input type="password" text="Confirm password" onChange={e=>{onChange(e,"confirmPassword")}}/>
                <div className={styles.datePicker}>
                    <label>Date of birth :</label>
                    <CustomDatePicker onChange={onSelect} />
                </div>
                <div className={styles.genderSelector}>
                    <label>Gender : </label>
                    <RadioButton onChange={e=>{onChange(e,"gender")}}/>
                </div>
                <Button text="Sign-up" class="signup" onClick={submitData} />
            </div>
        </div>
    )
}