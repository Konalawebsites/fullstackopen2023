import { useState, useEffect } from 'react'
import Blog from './components/Blog/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './styles/index.css'
import AddBlogForm from './components/AddBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setBlogTitle] = useState('')
  const [author, setBlogAuthor] = useState('')
  const [url, setBlogUrl] = useState('')
  const [user, setUser] = useState(null)
  const [addBlogVisible, setAddBlogVisible] = useState(false)

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
      setNotificationMessage('username and/or password wrong')
      setIsError(true)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleBlogAdd = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({
        title, author, url
      })

      setUser(user.username)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setBlogs(blogs.concat(blog))
    } catch (exception) {
    }
    setNotificationMessage(`added blog "${title}" by ${author} succesfully`)
    setIsError(false)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2> please log in  </h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  return (
    <div>

      <h1>Blogs</h1>
      <Notification notificationMessage={notificationMessage} isError={isError} />

      {user === null
        ? loginForm()
        : <div>
          <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>

          <AddBlogForm addBlogVisible={addBlogVisible} setAddBlogVisible={setAddBlogVisible} title={title}
            author={author} url={url} setBlogTitle={setBlogTitle} setBlogAuthor={setBlogAuthor}
            setBlogUrl={setBlogUrl} handleBlogAdd={handleBlogAdd} user={user} setUser={setUser} />

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}  />

          )}
        </div>
      }
    </div>
  )
}

export default App