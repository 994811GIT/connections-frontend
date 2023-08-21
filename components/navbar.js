import Input from './input';
import Link from 'next/link';
import styles from './navbar.module.css';
import { getToken, removeToken, getUser, removeUser } from '../utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Navbar = (props) => {

    const router = useRouter()
    const [token, setToken] = useState('')

    useEffect(() => {
        setToken(getToken())
        // console.log(props)
    })

    const logout = () => {
        removeToken()
        removeUser()
        router.push('/user/login')
    }

    return (
        <div>
            <div className={styles.navbar}>
                <div className={styles.branding}>
                    <span className={styles.logo}>Connections.io</span>
                    <Input text="Search..." />
                </div>
                <div className={styles.navRight}>
                    <span>
                        <Link className={props.currentPage == "home" ? styles.active : styles.off} href={'/'}>Home</Link>
                    </span>
                    <span>
                        <span className={props.currentPage == "profile" ? styles.active : styles.off}
                            onClick={()=>{ router.push( { pathname : `/user/${props.user}`})}}>Profile</span>
                    </span>
                    <span>
                        {
                            token ? <span onClick={() => { logout() }}>Logout </span> : <Link className={props.currentPage == "login" ? styles.active : styles.off} href={'/user/login'}>Login</Link>
                        }
                    </span>
                </div>
            </div>
        </div>
    );
}
export default Navbar;