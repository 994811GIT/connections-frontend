import styles from "../../styles/update.module.css"
import { GoPersonFill } from "react-icons/go"
import FileUpload from "../../../components/fileuploader"
import { AiFillCamera } from "react-icons/ai"
import Input from "../../../components/input"
import TextInput from "../../../components/textarea"
import Button from "../../../components/button"
import { useRouter } from "next/router"
import { useState } from "react"
import instance, { imgInstance } from "../../../utils/axios"
import { getUser } from "../../../utils"

const Updateuser = () => {

    const router = useRouter()
    const [formData, setFormData] = useState({ category: "", bio: "", link : "", profilePicture : ""})
    const [image, setImage] = useState()

    const skipUpdate = () => {
        router.push('/')
    }

    const onImageUpload = async (e) => {
        setImage(URL.createObjectURL(e.target.files[0]))
        const data = new FormData();
        data.append("file", e.target.files[0])

        const url = await imgInstance.post('/upload', data)
        console.log(url.data.url)
        setFormData({ ...formData, profilePicture : url.data.url })
    }


    const handleChange = (e, label) => {
        setFormData({ ...formData, [label]: e.target.value })
        // console.log([label], e.target.value)
    }

    const updateData = async() => {
        const userId = getUser()
        const res = await instance.patch(`/user/${userId}`,formData)
        console.log(res)
        router.push(`/user/${userId}`)
    }

    return (
        <div className={styles.mainBody}>
            <div className={styles.wrapper}>
                <div className={styles.profilePicture}>
                    <div className={styles.avatar}>
                        <img src={image} className={styles.default}/>
                    </div>
                    <FileUpload type="file" text="Update photo" onChange={onImageUpload} icon={AiFillCamera} iconColor="blue" />
                </div>
                <div className={styles.otherInfo}>
                    <h4>Before continuing please fill up the requested details below.
                        If you wish not to fill the detail, you may skip and update it later.
                    </h4>
                    <div className={styles.inputGroup}>
                        <label>Select account type</label>
                        <Input type="text" text="Enter your category" custom="custom" onChange={(e) => { handleChange(e, "category") }} />
                        <label>Other links</label>
                        <Input type="text" text="Enter links to other social accounts" custom="custom" onChange={(e) => handleChange(e,"link")} />
                        <label>Enter bio</label>
                        <TextInput onChange={(e) => { handleChange(e, "bio") }} />
                    </div>
                    <div className={styles.buttonGroup}>
                        <Button text="Skip" class="blue" onClick={skipUpdate} />
                        <Button text="Update" class="green" onClick={updateData} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Updateuser;