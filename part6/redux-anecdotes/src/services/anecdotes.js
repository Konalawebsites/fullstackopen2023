import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (content) => {
    const anecdote = { content, votes: 0 }
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const update = async (updatedAnecdote, anecdoteId) => {
    console.log('updatedAnecdote', updatedAnecdote)
    console.log('anecdoteID', anecdoteId)
    const response = await axios.put(`${baseUrl}/${anecdoteId}`, updatedAnecdote)
    return response.data
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}