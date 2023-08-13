import { Input } from 'antd';
const { TextArea } = Input;
import styles from "./textarea.module.css"

const TextInput = (props) => (
  <>
    <TextArea showCount
      maxLength={600} onChange={props.onChange} placeholder="Enter bio" className={styles.textarea}/>
  </>
);
export default TextInput;