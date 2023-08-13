import styles from "./imageviewer.module.css"

export default function ImageViewer(props){
    return(
        <div className={styles.ImageViewer}>
            <img className={styles.imageDisplay}src={props.image}/>
        </div>
    )
}