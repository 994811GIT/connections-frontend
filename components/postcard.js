import { useRouter } from "next/router";
import styles from "./postcard.module.css";
import TimeAgo from "react-timeago"
import LikeButton from "./likebutton";
import { FaIcons } from "../icons/icons"

const PostCard = (props) => {

    const newDate = new Date(props.createdAt)
    const router = useRouter()

    return (
        <div className={styles.post}>
            <div className={styles.userDetails} >
                <div className={styles.userAvatar}>
                    <img className={styles.avatar} src={props.user.profilePicture} onClick={() => { router.push({ pathname: `/user/${props.user._id}` }) }} />
                </div>
                <div className={styles.userInteract}>
                    <span onClick={() => { router.push({ pathname: `/user/${props.user._id}` }) }}>{props.user.name}</span>
                    <span><TimeAgo date={newDate} className={styles.postTime} /></span>
                </div>
            </div>
            <div className={styles.content}>
                <p>{props.content}</p>
            </div>
            <div className={styles.imageView}>
                <img src={props.image} />
            </div>
            {/* <div className={styles.userReaction}>
                <span>
                    <LikeButton />
                </span>
            </div> */}
        </div>
    );
};
export default PostCard;
