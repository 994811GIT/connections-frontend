import styles from "./modalbox.module.css"
import FileUpload from "./fileuploader";
import { MdCollections, MdOutlineClear } from "react-icons/md";
import { Input, Upload } from "antd";
import { useState } from "react";
import ActiveUsers from "./activeuser";
import Button from "./button";
import { imgInstance } from "../utils/axios";
import instance from "../utils/axios";
import { getUser } from "../utils";

const ModalBox = (props) => {


    const [content, setContent] = useState("")
    const [selectedImage, setImage] = useState()
    const [formData, setFormData] = useState({ content: "", image: "", user: "" })

    // const onImageChange = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         console.log(e.target.files[0])
    //         setImage(URL.createObjectURL(e.target.files[0]))
    //         // console.log(value)
    //         setFormData({...formData, image : e.target.files[0]})
    //     }
    // }

    const onImageUpload = async (e) => {
        setImage(URL.createObjectURL(e.target.files[0]))
        const data = new FormData();
        data.append("file", e.target.files[0])

        const url = await imgInstance.post('/upload', data)
        console.log(url.data.url)
        setFormData({ ...formData, image: url.data.url })
    }

    const handleChange = (e) => {
        setContent(e.target.innerText)
        console.log(e.target.innerText)
        setFormData({ ...formData, "content": e.target.innerText })
    }

    const onClick = async (e) => {
        if (content || selectedImage) {
            const data = { ...formData }
            data.user = getUser()
            const result = await instance.post('/post', data)
            console.log(result)
            const updatedPost = await instance.get('/post')
            props.state.setPost(updatedPost.data)
            e()
        }
    }

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <div className={styles.userCls}>
                        <ActiveUsers avatar={props.user.profilePicture} customeClass="modalAvatar" modalClass="modalClass" />
                        <h3>{props.user.name}</h3>
                    </div>
                    <MdOutlineClear className={styles.modalCloseBtn} onClick={props.onClick}/>
                </div>
                <div className={styles.content}>
                    <div className={styles.modalBox} aria-multiline={true} data-gramm="false" onInput={(e) => handleChange(e)} contentEditable="true" role="textbox" data-placeholder="What do you want to talk about?" suppressContentEditableWarning={true}>
                    </div>
                    <div className={styles.imageViewer}>
                        <img src={selectedImage} />
                    </div>
                </div>
                <div className={styles.footer}>
                    <FileUpload type="file" text="Photo" icon={MdCollections} onChange={onImageUpload} iconColor="green" />
                    <Button text="Post" class="post" onClick={() => { onClick(props.onClick) }} />
                </div>
            </div>
        </div>
    )
}
export default ModalBox;