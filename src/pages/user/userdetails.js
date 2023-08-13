import styles from "../../styles/update.module.css"
import { GoPersonFill } from "react-icons/go"
import FileUpload from "../../../components/fileuploader"

const Updateuser = () => {
    return (
        <div className={styles.mainBody}>
            <div className={styles.wrapper}>
                <div className={styles.profilePicture}>
                    <div className={styles.avatar}>
                        <GoPersonFill className={styles.default} />
                    </div>
                    <FileUpload text="photo" type="file" />
                </div>
                <div className={styles.otherInfo}>
                    <h4>Before continuing please fill up the requested details below.
                        If you wish not to fill the detail, you may skip and update it later.
                    </h4>
                </div>
            </div>
        </div>
    )
}
export default Updateuser;