import { useState, useEffect } from 'react'
import Blog from './components/Blog/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './styles/index.css'
import AddBlogForm from './components/AddBlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleNotificationShow('username and/or password wrong', true)
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
        title, author, url
      })
      setBlogs(blogs.concat(blog))
    }

    catch (exception) {
      handleNotificationShow('failed to add blog', true)
    }
    handleNotificationShow('added blog succesfully', false)
  }

  const handleNotificationShow = (message, isErrorMessage) => {
    setIsError(isErrorMessage)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 4000)
  }

  const blogsView = () => {
    blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} handleNotificationShow={handleNotificationShow} user={user}/>
        )}
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notificationMessage={notificationMessage} isError={isError} />

      {user === null
        ? <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password} />
        : <div>
          <p>{user.username} logged in <button id='log_out' onClick={handleLogout}>logout</button></p>

          <AddBlogForm createBlog={handleBlogAdd} />

          {blogsView()}
        </div>
      }
      <div>
      Blog app, Department of Computer Science, University of Helsinki 2023
      </div>
    </div>
  )
}

export default App