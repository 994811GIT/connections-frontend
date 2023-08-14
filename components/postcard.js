import { useRouter } from "next/router";
import styles from "./postcard.module.css";

const PostCard = (props) => {

    const router = useRouter()

    return (
        <div className={styles.post}>
            <div className={styles.userDetails} onClick={()=>{ router.push( { pathname : `/user/${props.user._id}`})}}>
                <img className={styles.avatar} src={props.user.profilePicture} />
                <span>{props.user.name}</span>
            </div>
            <div className={styles.content}>
                <p>{props.content}</p>
            </div>
            <div className={styles.imageView}>
                <img src={props.image}/>
            </div>
        </div>
    );
};
export default PostCard;
