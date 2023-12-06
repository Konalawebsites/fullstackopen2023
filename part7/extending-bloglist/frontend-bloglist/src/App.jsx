import { useState, useEffect, useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationContext from './context/NotificationContext'
import Blog from './components/Blog/Blog'
import NotificationQuery from './components/NotificationQuery'
import blogService from './services/blogs'
import loginService from './services/login'
import './styles/index.css'
import AddBlogForm from './components/AddBlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, notificationDispatch] = useContext(NotificationContext)

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
      notificationDispatch({ type: 'ERROR2' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' });
      }, 5000)
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
      notificationDispatch({ type: 'ERROR1' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' });
      }, 5000)
    }
    notificationDispatch({ type: 'CREATE' })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }


  const blogsView = () => {
    blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        <NotificationQuery />

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
      </NotificationContext.Provider>
    </div>
  )
}

export default App