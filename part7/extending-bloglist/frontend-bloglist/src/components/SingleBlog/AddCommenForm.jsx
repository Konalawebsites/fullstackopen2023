import NotificationContext from '../../context/NotificationContext'
import { useContext, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createComment } from '../../services/blogs'

const formStyle = {
  width: '1%'
}

const AddCommentForm = ({ blog }) => {
  const [newComment, setNewComment] = useState('')

  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const postCommentMutation = useMutation({
    mutationFn: (blog) => createComment({ blog }),
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
  const handlePostComment = async (event) => {
    event.preventDefault
    console.log(event)
    postCommentMutation.mutateAsync({ ...blog, newComment })
  }

  const addNewComment = (e) => {
    e.preventDefault()

    handlePostComment({ newComment: newComment })
    setNewComment('')
  }

  return (
    <div>
      <form onSubmit={addNewComment} style={formStyle}>
        <div>
          <input id='comment' type="text" value={newComment} name="addComment" onChange={({ target }) => setNewComment(target.value)}
            placeholder='add comment'
          />
        </div>
        <button id='add' type="submit" >add</button>
      </form>
    </div>
  )
}

export default AddCommentForm