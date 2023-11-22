import { Link, useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {

    const anecdoteStyle = {
      padding: "5px",
      margin: '5px 0',
      maxWidth: "800px",
      marginRight: "auto",
      border: "outset #f33"
    }
  
    const id = useParams().id
    const anecdote = anecdotes.find(n => n.id === Number(id))
    
    return (
      <div style={anecdoteStyle}>
        <h2><b>{anecdote.content} by {anecdote.author} </b></h2>
        <div>has {anecdote.votes} votes</div>
        <div>for more info see <Link to={anecdote.info}> {anecdote.info}</Link> </div>
      </div>
    )
  }
  

export default Anecdote