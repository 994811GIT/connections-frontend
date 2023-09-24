import styles from '@/styles/Home.module.css'
import Navbar from '../../components/navbar'
import PostCard from '../../components/postcard'
import Activeuser from '../../components/activeuser'
import withAuth from '../../utils/withAuth'
import FileUpload from '../../components/fileuploader'
import { MdCollections, MdVideoCall, MdOutlineEventNote } from "react-icons/md";
import ModalBox from '../../components/modalbox'
import { useEffect, useState, createContext } from 'react'
import instance from '../../utils/axios'
import { getUser } from '../../utils'

export default withAuth(function Home() {

  const users = [
    {
      "name": "Ann augustine",
      "avatar": "/assets/avatars/ann.jpg"
    },
    {
      "name": "Aron dupa",
      "avatar": "/assets/avatars/Aron.jpg"
    },
    {
      "name": "Gregor Thomas",
      "avatar": "/assets/avatars/gregor.jpg"
    },
    {
      "name": "Imran hashmi",
      "avatar": "/assets/avatars/imran.jpg"
    },
    {
      "name": "John Lucas",
      "avatar": "/assets/avatars/john.jpg"
    },
    {
      "name": "Eddin Marquez",
      "avatar": "/assets/avatars/marquez.jpg"
    },
    {
      "name": "Jones mendis",
      "avatar": "/assets/avatars/mendis.jpg"
    },
    {
      "name": "Mia johnas",
      "avatar": "/assets/avatars/mia.jpg"
    },
    {
      "name": "Noel rebera",
      "avatar": "/assets/avatars/noel.jpg"
    },
    {
      "name": "Samuel R",
      "avatar": "/assets/avatars/samuel.jpg"
    },
    {
      "name": "Sangeetha Krishnan",
      "avatar": "/assets/avatars/sangeetha.jpg"
    },
    {
      "name": "Sanidhul",
      "avatar": "/assets/avatars/sanidhul.jpg"
    },
  ]

  const [post, setPost] = useState([])
  const [user, setUser] = useState("")
  const [showModal, setShowModal] = useState(false)
  const UserContext = createContext()

  const handleClick = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
  }

  const getPosts = async () => {
    const data = await instance.get('/post')
    setPost(data.data)
  }

  const getUserData = async () => {
    const res = await instance.get(`/user/${getUser()}`)
    setUser(res.data)
  }

  useEffect(() => {
    getPosts()
    getUserData()
  }, [])



  return (
    <UserContext.Provider value={{post, setPost}}>
      <>
        <Navbar currentPage="home" user={getUser()} />
        <div className={styles.home}>
          <div className={styles.sidebar}>
            <span>Groups</span>
            <span>Activities</span>
            <span>Community</span>
            <span>Pages</span>
            <span>Events</span>
            <span>Grow Audience</span>
            <span>Explore</span>
            <span>Promotions</span>
          </div>
          <div className={styles.content}>
            <div className={styles.post}>
              <div className={styles.btngroup}>
                <img className={styles.profileImage} src={user.profilePicture} />
                <input className={styles.text} type="button" value="Write something" onClick={handleClick} />
              </div>
              <div className={styles.options}>
                <FileUpload type="button" text="Photo" icon={MdCollections} iconColor="green" onClick={handleClick} />
                <FileUpload type="button" text="Go live" icon={MdVideoCall} iconColor="red" />
                <FileUpload type="button" text="Create Event" icon={MdOutlineEventNote} iconColor="yellow" />
              </div>
            </div>
            {
              post.map((item, index) => {
                return (
                  <PostCard key={index} {...item} />
                )
              })
            }
          </div>
          <div className={styles.activeUsers}>
            <h3>Active users</h3>
            {
              users.map((item, index) => {
                return (
                  <Activeuser key={index} {...item} />
                )
              })
            }
          </div>
        </div>
        {showModal && <ModalBox onClick={closeModal} user={user} state={{post, setPost}} />}
      </>
    </UserContext.Provider>
  )
}
)