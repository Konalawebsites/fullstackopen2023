import { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './styles/index.css'
import AddBlogForm from './components/AddBlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { setNotificationTimeOut } from './reducers/notificationReducer'
import { appendBlog } from './reducers/blogReducer' // exercise 7.11

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //exercise 7.11 redux store blogs - console print
  const blogsRedux = useSelector((state) => state.blogs.blogs)
  useEffect(() => {
    console.log('Saved Blogs:', blogsRedux)
  }, [blogsRedux])

  //actual blogs in frontend
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotificationTimeOut('ERROR: failed loggin-in !', 4000, true))
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleBlogAdd = async (blogObject) => {
    const title = blogObject.title
    const author = blogObject.author
    const url = blogObject.url

    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      })
      setBlogs(blogs.concat(blog))
      dispatch(appendBlog({
        title: title,
        author: author,
        url: url
      }))

    } catch (exception) {
      dispatch(setNotificationTimeOut('ERROR: failed to add blog !', 4000, true))
    }
    dispatch(setNotificationTimeOut('you added blog succesfully !', 4000, false))
  }

  const blogsView = () => {
    blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            user={user}
          />
        ))}
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
      ) : (
        <div>
          <p>
            {user.username} logged in{' '}
            <button id="log_out" onClick={handleLogout}>
              logout
            </button>
          </p>

          <AddBlogForm createBlog={handleBlogAdd} />

          {blogsView()}
        </div>
      )}
      <div>
        Blog app, Department of Computer Science, University of Helsinki 2023
      </div>
    </div>
  )
}

export default App
