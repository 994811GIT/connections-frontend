import styles from "@/styles/profile.module.css"
import { useRouter } from "next/router"
import Navbar from "../../../components/navbar";
import ImageViewer from "../../../components/imageViewer";
import { posts } from "../../../utils/posts";
import withAuth from "../../../utils/withAuth";
import instance from "../../../utils/axios";
import { getUser } from "../../../utils";
import { useEffect, useState } from "react";
import Button from "../../../components/button";
import withRouter from "next/router";

const Profile = (props) => {

    const router = useRouter();

    const [user, setUser] = useState([])
    const [post, setPost] = useState([])
    const [userId, setUserId] = useState('')

    const getUserData = async () => {
        try {
            const userId = router.query.id
            const res = await instance.get(`/user/${userId}`)
            setUser(res.data)
        } catch (e) {
            console.log(e)
        }

    }
    const getPosts = async () => {
        try {
            const userId = router.query.id;
            const res = await instance.get(`/post/${userId}`)
            setPost(res.data)
        } catch (e) {
            console.log({ message: e })
        }
    }

    useEffect(() => {
        getUserData()
        getPosts()
        setUserId(getUser())
    }, [router.query])

    return (
        <div>
            <Navbar currentPage="profile" user={userId}/>
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
                            <span style={{ fontWeight: "600" }}>{post.length}</span>
                            <span>posts</span>
                        </div>
                        <div className={styles.info}>
                            <span style={{ fontWeight: "600" }}>0</span>
                            <span>Followers</span>
                        </div>
                        <div className={styles.info}>
                            <span style={{ fontWeight: "600" }}>1</span>
                            <span>Following</span>
                        </div>
                        <div className={styles.follow}>
                            {user._id != getUser() && <span><Button text="Follow" class="green" /></span>}
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