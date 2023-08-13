import styles from "./input.module.css";

const Input =(props) =>{
    return(
        <input type={props.type} className={`${styles.searchBar} ${styles[props.custom]}`} placeholder={props.text} onChange={props.onChange}></input>
    )
}
export default Input;