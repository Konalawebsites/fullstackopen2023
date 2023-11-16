import { addAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import { useDispatch } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const style = {
        margin: 10
    }
    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.create(content)
        dispatch(addAnecdote(newAnecdote))
        dispatch(setNotification('you added a blog !'))
        setTimeout(() => {
            dispatch(clearNotification());
        }, 2000);
    }

    return (
        <div style={style}>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}



export default AnecdoteForm