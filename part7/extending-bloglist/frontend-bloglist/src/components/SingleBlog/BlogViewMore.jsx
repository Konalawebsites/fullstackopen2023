import NotificationContext from '../../context/NotificationContext'
import { useContext, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { update, remove, createComment } from '../../services/blogs'
import { Link } from 'react-router-dom'
import AddCommentForm from './AddCommenForm'

const blogStyle2 = {
  fontSize: '10px',
  padding: '10px',
  border: '1px solid orange',
  marginTop: '10px',
  width: '35%',
  position: 'relative'
}
const buttonStyle2 = {
  fontSize: '8px'
}

const BlogViewMore = ({ blog, user }) => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const updateBlogMutation = useMutation({
    mutationFn: (blog) => update(blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
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
    updateBlogMutation.mutateAsync({ blog: { ...blog, likes: blog.likes + 1 }, blogId: blog.id })
    notificationDispatch({ type: 'LIKE' })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const handleBlogDelete = async (event) => {
    event.preventDefault()
    console.log('deleting..', blog)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutateAsync(blog.id)
    }
  }

  return (
    <div style={blogStyle2} className='blogContent'>

      <h2> "{blog.title}" by {blog.author}</h2>
      <Link to={blog.url}>{blog.url} </Link>
      <p> likes: {blog.likes} <button id='like' style={buttonStyle2} onClick={handleBlogLike}>like</button> </p>
      <p> added by {blog.user.username} </p>

      <h4> comments </h4>
      <AddCommentForm blog={blog} />

      <ul>
        {blog.comments.length > 0
          ? (blog.comments.map(comment => (
            <li key={comment}>{comment}</li>))
          )
          : (<p>No comments here yet - be the first one to comment </p>)}
      </ul>

      {user.user.username === blog.user.username
        ? <button id='delete' style={buttonStyle2} onClick={handleBlogDelete}> delete </button>
        : null
      }

    </div>
  )
}

export default BlogViewMore