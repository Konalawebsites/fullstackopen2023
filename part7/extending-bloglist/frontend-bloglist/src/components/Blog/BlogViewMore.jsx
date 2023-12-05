import blogService from '../../services/blogs'
import { setNotificationTimeOut } from '../../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const blogStyle2 = {
  fontSize: '10px',
  padding: '1px',
  border: '1px solid orange',
  marginTop: '10px',
}
const buttonStyle = {
  marginLeft: '100px',
  fontSize: '9px',
  color: 'orange',
}
const buttonStyle2 = {
  marginLeft: '10px',
  fontSize: '8px',
}

const BlogViewMore = ({
  handleViewBlog,
  blog,
  blogs,
  setBlogs,
  user,
}) => {

  const dispatch = useDispatch()

  const handleBlogLike = async (event) => {
    event.preventDefault()

    try {
      const returnedBlog = await blogService.update(
        {
          author: blog.author,
          title: blog.title,
          url: blog.url,
          user: blog.user.id,
          likes: blog.likes + 1,
        },
        blog.id,
      )

      // adding user data from the old blog
      returnedBlog.user = {
        username: blog.user.username,
        name: blog.user.name,
      }

      const updatedBlogs = blogs.map((b) =>
        b.id !== blog.id ? b : returnedBlog,
      )
      setBlogs(updatedBlogs)
      dispatch(setNotificationTimeOut('you upvoted a blog  !', 4000, false))
    } catch (exception) {
      dispatch(setNotificationTimeOut('ERROR: voting blog didnt go thru !', 4000, true))
    }
  }

  const handleBlogDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        dispatch(setNotificationTimeOut('the blog was deleted succesfully  !', 4000, false))
      } catch (exception) {
        dispatch(setNotificationTimeOut('ERROR: deleting blog didnt go thru !', 4000, true))
      }
    }
  }

  return (
    <div style={blogStyle2} className="blogContent">
      <p>
        {' '}
        title: {blog.title}{' '}
        <button style={buttonStyle} onClick={handleViewBlog}>
          {' '}
          view less
        </button>{' '}
      </p>
      <p> author: {blog.author} </p>
      <p> website: {blog.url} </p>
      <p>
        {' '}
        likes: {blog.likes}{' '}
        <button id="like" style={buttonStyle2} onClick={handleBlogLike}>
          like
        </button>{' '}
      </p>
      <p> user: {blog.user.username} </p>

      {user.username === blog.user.username ? (
        <button id="delete" style={buttonStyle2} onClick={handleBlogDelete}>
          {' '}
          delete{' '}
        </button>
      ) : null}
    </div>
  )
}

export default BlogViewMore
