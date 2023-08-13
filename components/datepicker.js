import {DatePicker, Space} from "antd"
import styles from "./datepicker.module.css"

export default function CustomDatePicker(props){
    return(
    <Space direction="vertical">
        <DatePicker onChange={props.onChange} className={styles.datePicker}/>
    </Space>
    )
}