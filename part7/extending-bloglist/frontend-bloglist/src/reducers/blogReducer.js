import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

// exercise 7.11
const initialState = {
  blogs: []
}

console.log(initialState)

const blogSlicer = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.blogs.push(action.payload)
      console.log(state.blogs)
    },
  }
})

export const { setBlogs, appendBlog } = blogSlicer.actions

export default blogSlicer.reducer