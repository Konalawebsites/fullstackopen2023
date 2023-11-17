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
    /* refresh anecdotes after vote */
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export default anecdoteSlicer.reducer


