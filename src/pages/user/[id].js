import styles from "@/styles/profile.module.css"
import { useRouter } from "next/router"
import Navbar from "../../../components/navbar";
import ImageViewer from "../../../components/imageViewer";
import withAuth from "../../../utils/withAuth";
import instance from "../../../utils/axios";
import { getUser } from "../../../utils";
import { useEffect, useState } from "react";
import Button from "../../../components/button";

const Profile = (props) => {

    const router = useRouter();

    const [user, setUser] = useState([])
    const [post, setPost] = useState([])
    const [userId, setUserId] = useState('')
    const [followerCount, setFollowCount] = useState([])
    const [followingCount, setFollowingCount] = useState([])
    const [follow, setFollow] = useState("")
    const [currentUser, setCurrentUser] = useState()

    const getUserData = async () => {
        try {
            setCurrentUser(getUser)
            if (router.query.id) {
                const userId = router.query.id
                const res = await instance.get(`/user/${userId}`)
                await setUser(res.data)
                if (res.data.followers) {
                    setFollowCount(res.data.followers)
                }
                if (res.data.following) {
                    setFollowingCount(res.data.following)
                }
                if (res.data.followers.includes(getUser())) {
                    console.log("exist")
                    setFollow(true)
                }
            }
            // console.log(user)
        } catch (e) {
            console.log(e)
        }
    }
    const getPosts = async () => {
        try {
            if (router.query.id) {
                const userId = router.query.id;
                const res = await instance.get(`/post/${userId}`)
                setPost(res.data)
            }
        } catch (e) {
            console.log({ message: e })
        }
    }

    const followUser = async (userId) => {
        console.log("current logged user is", currentUser)
        const result = await instance.post(`/user/${userId}`, { currentUser: currentUser })
        await setFollowCount(result.data.followers)
        setFollow(true)
        console.log(result)
    }
    const unFollowUser = async (userId) => {
        console.log(userId)
        console.log(getUser())
        const result = await instance.post(`/user/unfollow/${userId}`, { currentUser: getUser() })
        await setFollowCount(result.data.followers)
        await setFollow(false)
        console.log(result)
    }


    useEffect(() => {
        getUserData()
        getPosts()
        setUserId(getUser())
    }, [router.query])

    return (
        <div>
            <Navbar currentPage="profile" user={userId} />
            <div className={styles.profileBody}>
                <div className={styles.container}>
                    <div className={styles.userInfo}>
                        <div className={styles.imageSection}>
                            <div className={styles.avatar}>
                                <img className={styles.profileImage} src={user.profilePicture} />
                                <div className={styles.widget}>
                                    <span>Edit</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.userDetails}>
                            <div className={styles.user}>
                                <div className={styles.userData}>
                                    <span className={styles.userName}>{user.name}</span>
                                    <span className={styles.category}>{user.category}</span>
                                </div>
                                {user._id != getUser() &&
                                    <div className={styles.follow}>
                                        {follow == false ? <span><Button text="Follow" class="green" onClick={() => { followUser(user._id) }} /></span>
                                            : <span><Button text="Following" class="green" onClick={() => { unFollowUser(user._id) }} /></span>}
                                    </div>}
                            </div>

                            <div className={styles.followerCount}>
                                <div className={styles.info}>
                                    <span style={{ fontWeight: "600" }}>{post.length}</span>
                                    <span>posts</span>
                                </div>
                                <div className={styles.info}>
                                    <span style={{ fontWeight: "600" }}>{followerCount.length}</span>
                                    <span>Followers</span>
                                </div>
                                <div className={styles.info}>
                                    <span style={{ fontWeight: "600" }}>{followingCount.length}</span>
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
        </div>
    )
}
export default withAuth(Profile);