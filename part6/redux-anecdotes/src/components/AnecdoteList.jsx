import { updateAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch, useSelector } from "react-redux"
import { setNotificationTimeOut } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const style = {
    margin: 5
  }
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => {
      const searchTerm = state.filter.toLowerCase()

      return state.anecdotes.filter(anecdote =>
        anecdote.content && anecdote.content.toLowerCase && anecdote.content.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      )}
    )
  
    const vote = (id, anecdote) => {
      dispatch(updateAnecdote(id, anecdote))
      dispatch(setNotificationTimeOut(`you upvoted an anecdote "${anecdote.content} !`, 4000))
    }

    anecdotes.sort((a, b) => b.votes - a.votes)
  
    return (
      <div style={style}>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }

export default AnecdoteList