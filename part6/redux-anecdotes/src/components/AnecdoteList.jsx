import { voteAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch, useSelector } from "react-redux"

const AnecdoteList = () => {
  const style = {
    margin: 5
  }
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => {
      const searchTerm = state.filter.toLowerCase()

      return state.anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(searchTerm)
      )}
    )
  
    const vote = (id) => {
      console.log('anecdotelist ID', id)
      dispatch(voteAnecdote(id))
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
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }

export default AnecdoteList