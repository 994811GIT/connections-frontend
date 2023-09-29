import Input from './input';
import Link from 'next/link';
import styles from './navbar.module.css';
import { getToken, removeToken, getUser, removeUser } from '../utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GiIcons, RiIcons, AiIcons, GoIcons, MdIcons, GrIcons } from "../icons/icons"

const Navbar = (props) => {

    const router = useRouter()
    const [token, setToken] = useState('')

    const initialExpandNavbar = window.innerWidth > 768 //To identify the screen size, To toggle between true or false
    const [expandNavbar, setExpandNavbar] = useState(initialExpandNavbar)

    const onChange = (e) => {
        console.log(e.target.value)
        setQuery(e.target.value)
    }

    const logout = () => {
        removeToken()
        removeUser()
        router.push('/user/login')
    }
    useEffect(() => {
        setToken(getToken())
        function handleResize() {
            const shouldExpand = window.innerWidth > 768;
            if (shouldExpand !== expandNavbar) {
                setExpandNavbar(shouldExpand);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [expandNavbar])
    return (
        <div>
            <div className={styles.navbar}>
                <GiIcons.GiHamburgerMenu className={styles.hamburg} onClick={() => setExpandNavbar(!expandNavbar)} />
                <div className={styles.branding}>
                    <span className={styles.logo}>Connections.io</span>
                    <Input text="Search..." onChange={(e) => { onChange(e) }} />
                </div>
                {
                    expandNavbar &&
                    <div className={styles.navbarContainer}>
                        <div className={styles.navRight}>
                            {
                                initialExpandNavbar != true &&

                                <h3 style={{ margin: '0 30px 20px 30px ' }}>Quick Links</h3>
                            }
                            <div className={styles.clsBtn}>
                                <RiIcons.RiCloseFill className={styles.clsIcon} onClick={() => setExpandNavbar(!expandNavbar)} />
                            </div>
                            <span>
                                <span>
                                    <AiIcons.AiOutlineHome className={styles.icon} />
                                    <Link className={props.currentPage == "home" ? styles.active : styles.off} href={'/'}>Home</Link>
                                </span>
                            </span>
                            <span>
                                <span className={props.currentPage == "profile" ? styles.active : styles.off}
                                    onClick={() => { router.push({ pathname: `/user/${props.user}` }) }}><AiIcons.AiOutlineUser className={styles.icon} />Profile</span>
                            </span>
                            {
                                initialExpandNavbar != true &&
                                <div>
                                    <span>
                                        <span><GoIcons.GoGear className={styles.icon} />Settings</span>
                                    </span>
                                    <span>
                                        <span><MdIcons.MdOutlinePrivacyTip className={styles.icon} />Privacy & Security</span>
                                    </span>
                                </div>
                            }
                            <span>
                                {
                                    token ? <span onClick={() => { logout() }}><GrIcons.GrPowerShutdown className={styles.icon} />Logout </span> : <Link className={props.currentPage == "login" ? styles.active : styles.off} href={'/user/login'}>Login</Link>
                                }
                            </span>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
export default Navbar;