import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogViewLess from '../BlogViewLess'
import BlogViewMore from '../BlogViewMore'

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'testTitle',
    user: {
      username: 'testUser',
    },
  }

  const mockHandler = jest.fn()

  render(<BlogViewLess blog={blog} handleViewBlog={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('view more')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

/* dont know how to mock test when function not passed as props */
/* now it works with error handleNotificationShow */

test('clicking the "like" button twice calls the event handler twice', async () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 2,
    user: {
      username: 'testUser',
    },
  }

  const mockHandler = jest.fn()
  render(<BlogViewMore blog={blog} handleNotificationShow={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
