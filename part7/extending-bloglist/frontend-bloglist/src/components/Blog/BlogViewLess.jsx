const blogStyle = {
  fontSize: '10px',
  padding: '1px',
  border: '1px solid black',
  marginTop: '10px',
}

const buttonStyle = {
  marginLeft: '100px',
  fontSize: '9px',
}

const BlogViewLess = ({ blog, handleViewBlog }) => (
  <div style={blogStyle} className="blogContent">
    <p>
      {' '}
      "{blog.title}" by {blog.author}{' '}
      <button id="view_more" style={buttonStyle} onClick={handleViewBlog}>
        view more
      </button>{' '}
    </p>
  </div>
)

export default BlogViewLess
