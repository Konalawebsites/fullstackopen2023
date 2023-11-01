import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogViewLess from './BlogViewLess'

test('Blog renders title and author when it is viewed shortly', () => {
  const blog = {
    title: 'testTitle',
    user: {
      username: 'testUser'
    }
  }

  const testUser = {
    username: 'testUser'
  }

  window.localStorage.setItem(
    'loggedBlogappUser', JSON.stringify(testUser)
  )

  const { container }  = render(
    < BlogViewLess blog={blog} />
  )

  const element = screen.getByText('"testTitle",')

  expect(element).toBeDefined()
})
