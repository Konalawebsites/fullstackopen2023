import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
]

const asObject = (anecdote) => {
  return {
    content: anecdote,
  }
}
const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlicer = createSlice({
  name: 'anecdotes', 
  initialState,
  reducers: {

    voteAnecdote(state, action) {
      const id  = action.payload; 

      const anecdoteToVote = state.find( (anecdote)  => anecdote.id === id ) 
      if (anecdoteToVote) {
        const updatedAnecdotes = state.map((anecdote) =>
          anecdote.id !== id ? anecdote : { ...anecdote, votes: anecdote.votes + 1 } );
          
        return updatedAnecdotes;
      }
      return state;
    },
    setAnecdotes(state, action) {
      console.log(action)
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
  }
})

export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlicer.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const updateAnecdote = (id, anecdote) => {
  return async dispatch => {
    const updatableAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    }, id)
    dispatch(voteAnecdote(updatableAnecdote.id))
  }
}
export default anecdoteSlicer.reducer