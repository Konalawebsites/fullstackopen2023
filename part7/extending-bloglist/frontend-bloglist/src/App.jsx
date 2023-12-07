import { useState, useEffect, useContext } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import NotificationContext from './context/NotificationContext'
import Blog from './components/Blog/Blog'
import NotificationQuery from './components/NotificationQuery'
import blogService from './services/blogs'
import { create, getAll } from './services/blogs'
import loginService from './services/login'
import './styles/index.css'
import AddBlogForm from './components/AddBlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const queryClient = useQueryClient()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, notificationDispatch] = useContext(NotificationContext)

  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    retry: 1
  })

  const newBlogMutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({ type: 'CREATE' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    },
    onError: () => {
      notificationDispatch({ type: 'ERROR1' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    }
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  console.log(JSON.parse(JSON.stringify(blogs)))

  if (blogs.isLoading) {
    return <div>loading data...</div>
  }

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
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleBlogAdd = async (event) => {
    event.preventDefault
    const title = event.title
    const author = event.author
    const url = event.url
    newBlogMutation.mutate({ title, author, url })
  }

  const blogsView = () => {
    blogs.data.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        {blogs.data.map(blog =>
          <Blog key={blog.id} blog={blog} blogs={blogs} user={user} />
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