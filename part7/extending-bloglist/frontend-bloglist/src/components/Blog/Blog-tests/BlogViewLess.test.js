import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogViewLess from '../BlogViewLess'

test('Blog renders title and author when it is viewed shortly', () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    user: {
      username: 'testUser',
    },
  }

  const testUser = {
    username: 'testUser',
  }

  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(testUser))

  render(<BlogViewLess blog={blog} />)

  const element = screen.getByText('"testTitle" by testAuthor')

  expect(element).toBeDefined()
})
