import styles from "@/styles/profile.module.css"
import { useRouter } from "next/router"
import Navbar from "../../../components/navbar";
import ImageViewer from "../../../components/imageViewer";
import { posts } from "../../../utils/posts";
import withAuth from "../../../utils/withAuth";

const Profile = () => {

    const router = useRouter();

    return (
        <div>
            <Navbar currentPage="profile" />
            <div className={styles.userInfo}>
                <div className={styles.avatar}>
                    <img className={styles.profileImage} src="/assets/avatars/gregor.jpg" />
                    <div className={styles.widget}>
                        <span>Edit</span>
                    </div>
                </div>
                <div className={styles.userDetails}>
                    <div className={styles.user}>
                        <span className={styles.userName}>Gregor Thomas</span>
                        <span className={styles.category}>Fashion model</span>
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
                            Gregor Thomas grew up in Venice, California, the second son of a Vietnam veteran turned policeman. Initially focusing on performing arts, Michael attended the prestigious Alexander Hamilton Academy in Los Angeles.
                            After serving in the U.S. Army as a tracked vehicle operator, he returned to civilian life and began writing short stories and screenplays, and directing short films and music videos.
                        </p>
                        <a href="https://youtube.com/@BLUME_Music">https://youtube.com/@BLUME_Music</a>
                    </div>
                </div>
            </div>
            <div className={styles.timeline}>
                <div className={styles.posts}>
                    {
                        posts.map((item, index) => {
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