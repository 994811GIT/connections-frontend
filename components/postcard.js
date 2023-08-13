import styles from "./postcard.module.css";

const PostCard = (props) => {
    return (
        <div className={styles.post}>
            <div className={styles.userDetails}>
                <img className={styles.avatar} src={props.avatar} />
                <span>{props.username}</span>
            </div>
            <div className={styles.content}>
                <p>{props.text}</p>
            </div>
            <div className={styles.imageView}>
                <img src={props.image}/>
            </div>
        </div>
    );
};
export default PostCard;
