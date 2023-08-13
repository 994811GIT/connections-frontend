import styles from "@/styles/profile.module.css"
import { useRouter } from "next/router"
import Navbar from "../../../components/navbar";
import ImageViewer from "../../../components/imageViewer";
import { posts } from "../../../utils/posts";
import withAuth from "../../../utils/withAuth";
import instance from "../../../utils/axios";
import { getUser } from "../../../utils";
import { useEffect, useState } from "react";

const Profile = () => {

    const router = useRouter();

    const [user, setUser] = useState([])
    const [post, setPost] = useState([])

    const getUserData = async() =>{
        const res = await instance.get(`/user/${getUser()}`)
        console.log(res)
        setUser(res.data)
    }
    const getPosts = async() =>{
        const userId = getUser()
        console.log(userId)
        const res = await instance.get(`/post/${userId}`)
        console.log(res)
        setPost(res.data)
    }

    useEffect(()=>{
        getUserData()
        getPosts()
    },[])

    return (
        <div>
            <Navbar currentPage="profile" />
            <div className={styles.userInfo}>
                <div className={styles.avatar}>
                    <img className={styles.profileImage} src={user.profilePicture} />
                    <div className={styles.widget}>
                        <span>Edit</span>
                    </div>
                </div>
                <div className={styles.userDetails}>
                    <div className={styles.user}>
                        <span className={styles.userName}>{user.name}</span>
                        <span className={styles.category}>{user.category}</span>
                    </div>
                    <div className={styles.followerCount}>
                        <div className={styles.info}>
                            <span style={{ fontWeight: "600" }}>200</span>
                            <span>posts</span>
                        </div>
                        <div className={styles.info}>
                            <span style={{ fontWeight: "600" }}>346</span>
                            <span>Followers</span>
                        </div>
                        <div className={styles.info}>
                            <span style={{ fontWeight: "600" }}>186</span>
                            <span>Following</span>
                        </div>
                    </div>
                    <div className={styles.bio}>
                        <p>
                           {user.bio} 
                        </p>
                        <a href={user.link}>{user.link}</a>
                    </div>
                </div>
            </div>
            <div className={styles.timeline}>
                <div className={styles.posts}>
                    {
                        post.map((item, index) => {
                            return (
                                <div className={styles.singleImage} key={index}>
                                    <ImageViewer image={item.image} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default withAuth(Profile);