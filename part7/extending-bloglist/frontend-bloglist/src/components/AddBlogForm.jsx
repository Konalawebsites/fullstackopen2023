import { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlogForm = ({ createBlog }) => {
  const [addBlogVisible, setAddBlogVisible] = useState(false)
  const [title, setBlogTitle] = useState('')
  const [author, setBlogAuthor] = useState('')
  const [url, setBlogUrl] = useState('')

  const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

  const addNewBlog = (e) => {
    e.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id='add_blog' onClick={() => setAddBlogVisible(true)}>add blog</button>
      </div>

      <div style={showWhenVisible}>
        <form onSubmit={addNewBlog}>
          <h2> add a blog </h2>
          <div>
            <input id='title' type="text" value={title} name="blogTitle" onChange={({ target }) => setBlogTitle(target.value)}
              placeholder='title'
            />
          </div>
          <div>
            <input id='author' type="text" value={author} name="blogAuthor" onChange={({ target }) => setBlogAuthor(target.value)}
              placeholder='author'
            />
          </div>
          <div>
            <input id='url' type="text" value={url} name="blogUrl" onChange={({ target }) => setBlogUrl(target.value)}
              placeholder='url'
            />
          </div>
          <button id='add' type="submit" onClick={() => setAddBlogVisible(false)}>add</button>
          <button type="button" onClick={() => setAddBlogVisible(false)}>cancel</button>
        </form>
      </div>
    </div>
  )
}

AddBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default AddBlogForm