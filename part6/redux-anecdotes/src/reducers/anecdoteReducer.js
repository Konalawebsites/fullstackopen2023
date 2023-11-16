import { createSlice } from '@reduxjs/toolkit'

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
    
    addAnecdote(state, action) {
      const newAnecdote = {
        content: action.payload,
        votes: 0,
      };
        return [...state, newAnecdote]
    },
    
    setAnecdotes(state, action) {
      console.log(action)
      return action.payload
    }
  }
})

export const { addAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlicer.actions
export default anecdoteSlicer.reducer