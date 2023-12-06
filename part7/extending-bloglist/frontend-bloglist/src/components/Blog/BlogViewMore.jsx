import blogService from '../../services/blogs'
import NotificationContext from '../../context/NotificationContext'
import { useContext } from 'react'

const blogStyle2 = {
  fontSize: '10px',
  padding: '1px',
  border: '1px solid orange',
  marginTop: '10px',
}
const buttonStyle = {
  marginLeft: '100px',
  fontSize: '9px',
  color: 'orange'
}
const buttonStyle2 = {
  marginLeft: '10px',
  fontSize: '8px'
}

const BlogViewMore = ({ handleViewBlog, blog, blogs, setBlogs, user }) => {

  const [notification, notificationDispatch] = useContext(NotificationContext)

  const handleBlogLike = async (event) => {
    event.preventDefault()

    try {
      const returnedBlog = await blogService.update({
        author: blog.author,
        title: blog.title,
        url: blog.url,
        user: blog.user.id,
        likes: blog.likes + 1
      }, blog.id)

      // adding user data from the old blog
      returnedBlog.user = {
        username: blog.user.username,
        name: blog.user.name
      }

      const updatedBlogs = blogs.map(b => b.id !== blog.id ? b : returnedBlog)
      setBlogs(updatedBlogs)
      notificationDispatch({ type: 'LIKE' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' });
      }, 5000)
    } catch (exception) {
      notificationDispatch({ type: 'ERROR' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    }
  }

  const handleBlogDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {

      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        notificationDispatch({ type: 'DELETE' })
        setTimeout(() => {
          notificationDispatch({ type: 'CLEAR' })
        }, 5000)
      } catch (exception) {
        notificationDispatch({ type: 'ERROR3' })
        setTimeout(() => {
          notificationDispatch({ type: 'CLEAR' })
        }, 5000)
      }
    }
  }

  return (
    <div style={blogStyle2} className='blogContent'>
      <p> title: {blog.title} <button style={buttonStyle} onClick={handleViewBlog}> view less</button> </p>
      <p> author: {blog.author} </p>
      <p> website: {blog.url} </p>
      <p> likes: {blog.likes} <button id='like' style={buttonStyle2} onClick={handleBlogLike}>like</button> </p>
      <p> user: {blog.user.username} </p>

      {user.username === blog.user.username
        ? <button id='delete' style={buttonStyle2} onClick={handleBlogDelete}> delete </button>
        : null
      }
    </div>
  )
}

export default BlogViewMore