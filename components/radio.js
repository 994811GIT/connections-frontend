import { Radio } from "antd";

export default function RadioButton(props) {

    return (
        <Radio.Group onChange={props.onChange} value={props.value}>
            <Radio value={"male"}>Male</Radio>
            <Radio value={"female"}>Female</Radio>
            <Radio value={"non-binary"}>Non-binary</Radio>
        </Radio.Group>
    )
}