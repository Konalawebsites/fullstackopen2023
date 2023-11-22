import { Link } from "react-router-dom"

const AnecdoteList = ({ anecdotes }) => {
    const anecdoteListStyle = {
      padding: "2px",
      margin: '5px 0',
      maxWidth: "800px",
      marginRight: "auto",
      border: "outset #f33"
    }
    const anecdoteStyle = {
        padding: "2px"
    }
    return (
    <div style={anecdoteListStyle}>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote =>
          <div style={anecdoteStyle} key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`} >{anecdote.content}</Link>
          </div>
        )}
      </ul>
    </div>
    )
  }

  export default AnecdoteList