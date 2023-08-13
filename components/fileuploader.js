import styles from "./fileuploader.module.css"

const FileUpload = (props) => {
    return (
        <div className={styles.uploadWrapper}>
            <button className={styles.uploadBtn} onClick={props.onClick}>
                <div className={styles.singleOpt}>
                    <span>
                        {<props.icon className={`${styles[props.iconColor]}`} />}
                    </span>
                    <span className={styles.text}>
                        {props.text}
                    </span>
                </div>
                <input type={props.type} className={styles.uploader} onChange={props.onChange} />
            </button>
        </div>
    )
}
export default FileUpload;