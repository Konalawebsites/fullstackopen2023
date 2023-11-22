import { useState } from 'react'
import Menu from './components/Menu'
import { Link, Routes, Route, useParams } from 'react-router-dom'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import AnecdoteList from './components/AnecdoteList'


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


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create_new" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App
