import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddBlogForm from './AddBlogForm'
import userEvent from '@testing-library/user-event'

test('should pass correct details, when event handlers are called', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<AddBlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  await user.type(titleInput, 'testTitle')
  const authorInput = screen.getByPlaceholderText('author')
  await user.type(authorInput, 'testAuthor')
  const urlInput = screen.getByPlaceholderText('url')
  await user.type(urlInput, 'testUrl')

  const button = screen.getByText('add')
  await user.click(button)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testTitle')
  expect(createBlog.mock.calls[0][0].author).toBe('testAuthor')
  expect(createBlog.mock.calls[0][0].url).toBe('testUrl')
})
