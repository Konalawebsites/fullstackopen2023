import blogService from '../../services/blogs'
import NotificationContext from '../../context/NotificationContext'
import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { update, remove } from '../../services/blogs'

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
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const updateBlogMutation = useMutation({
    mutationFn: (blog) => update(blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({ type: 'LIKE' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    },
    onError: () => {
      notificationDispatch({ type: 'ERROR' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    },
  })
  const deleteBlogMutation = useMutation({
    mutationFn: (blogId) => remove(blogId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({ type: 'DELETE' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    },
    onError: () => {
      notificationDispatch({ type: 'ERROR' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    },
  })

  const handleBlogLike = async (event) => {
    event.preventDefault()
    console.log(blog.id)
    updateBlogMutation.mutateAsync({ blog: { ...blog, likes: blog.likes + 1 }, blogId: blog.id })
  }

  const handleBlogDelete = async (event) => {
    event.preventDefault()
    console.log('deleting..', blog)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutateAsync(blog.id)
    }
  }
  console.log(user)
  return (
    <div style={blogStyle2} className='blogContent'>
      <p> title: {blog.title} <button style={buttonStyle} onClick={handleViewBlog}> view less</button> </p>
      <p> author: {blog.author} </p>
      <p> website: {blog.url} </p>
      <p> likes: {blog.likes} <button id='like' style={buttonStyle2} onClick={handleBlogLike}>like</button> </p>
      <p> user: {blog.user.username} </p>

      {user.user.username === blog.user.username
        ? <button id='delete' style={buttonStyle2} onClick={handleBlogDelete}> delete </button>
        : null
      }
    </div>
  )
}

export default BlogViewMore