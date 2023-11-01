import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogViewMore from './BlogViewMore'
import Blog from './Blog'

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor'
  }

  const mockHandler = jest.fn()

  render(
    < Blog blog={blog} handleViewBlog={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view more')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})