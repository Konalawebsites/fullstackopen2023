const AddBlogForm = ( { addBlogVisible, setAddBlogVisible, title, author, url, setBlogTitle, setBlogAuthor, setBlogUrl, handleBlogAdd, user }) => {
  const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setAddBlogVisible(true)}>add blog</button>
      </div>

      <div style={showWhenVisible}>
        <form onSubmit={handleBlogAdd}>
          <h2> add a blog </h2>
          <div>
                title
            <input type="text" value={title} name="blogTitle" onChange={({ target }) => setBlogTitle(target.value)}
            />
          </div>
          <div>
                author
            <input type="text" value={author} name="blogAuthor" onChange={({ target }) => setBlogAuthor(target.value)}
            />
          </div>
          <div>
                url
            <input type="text" value={url} name="blogUrl" onChange={({ target }) => setBlogUrl(target.value)}
            />
          </div>
          <button type="submit" onClick={() => setAddBlogVisible(false)}>add</button>
          <button type="button" onClick={() => setAddBlogVisible(false)}>cancel</button>
        </form>
      </div>
    </div>
  )
}

export default AddBlogForm