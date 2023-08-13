import styles from "./activeuser.module.css"

export default function ActiveUsers(props) {
    return (
        <div className={styles.user}>
            <div className={styles.avatar}>
                <img className={`${styles.avatarPicture} ${styles[props.customeClass]}`} src={props.avatar} />
                <span className={`${styles.active} ${styles[props.modalClass]}`} style={{ background: 'rgb(49, 162, 80)', borderRadius: '50%', height: '9px' }}></span>
            </div>
            <span>{props.name}</span>
        </div>
    )
}