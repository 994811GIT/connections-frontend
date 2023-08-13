import styles from "./button.module.css"

export default function Button(props){
    return(
        <div className={styles.button}>
            <button className={`${styles.mainCls} ${styles[props.class]}`} onClick={props.onClick}>{props.text}</button>
        </div>
    )
}