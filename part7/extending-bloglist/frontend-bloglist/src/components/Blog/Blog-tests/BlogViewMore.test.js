import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogViewMore from '../BlogViewMore'

test('Blog renders title, author, url, likes and user when it is viewed fully', () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 43,
    user: {
      username: 'testUser',
    },
  }

  const testUser = {
    username: 'testUser',
  }

  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(testUser))

  const { container } = render(<BlogViewMore blog={blog} />)

  const elementTitle = screen.getByText('title: testTitle')
  const elementAuthor = screen.getByText('author: testAuthor')
  const elementUrl = screen.getByText('website: testUrl')
  const elementLikes = screen.getByText('likes: 43')
  const elementUser = screen.getByText('user: testUser')

  expect(elementTitle).toBeDefined()
  expect(elementAuthor).toBeDefined()
  expect(elementUrl).toBeDefined()
  expect(elementLikes).toBeDefined()
  expect(elementUser).toBeDefined()
})
