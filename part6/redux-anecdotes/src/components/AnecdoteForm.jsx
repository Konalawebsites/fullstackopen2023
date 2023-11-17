import { addAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotificationTimeOut } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const style = {
        margin: 10
    }
    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
        dispatch(setNotificationTimeOut('you added an anecdote !', 4000))
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