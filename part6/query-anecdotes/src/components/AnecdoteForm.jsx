import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import NotificationContext from '../context/NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [, notificationDispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({ type: "CREATE" })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' });
      }, 5000);
    },
    onError: (err) => {
      if (err.response.data.code === "LengthError") {
        notificationDispatch({ type: 'ERROR' })
      }
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' });
      }, 5000);
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
