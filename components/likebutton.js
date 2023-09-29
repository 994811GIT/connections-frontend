import styles from "./likebutton.module.css"
import { useState } from "react"

const LikeButton = () => {

    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);

    const toggleDisplay = () => {
        if (likeCount === 0) {
            setLikeCount(likeCount + 1);
            setLiked(true);
        } else {
            setLikeCount(likeCount - 1);
            setLiked(false);
        }
    };

    return (
        <div className={styles.likeButton}>
            <div className={styles.heartBg}>
                <span className={`${styles.heartIcon} ${liked ? styles.liked : ''}`} onClick={toggleDisplay}></span>
            </div>
        </div>
    )
}
export default LikeButton;