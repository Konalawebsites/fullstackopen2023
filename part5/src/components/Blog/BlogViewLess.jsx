const blogStyle = {
  fontSize: '10px',
  padding: '1px',
  border: '1px solid black',
  marginTop: '10px',
}

const buttonStyle= {
  marginLeft: '100px',
  fontSize: '9px'
}

const BlogViewLess = ({blog, handleViewBlog}) => (
  <div style={blogStyle} >
    <p> "{blog.title}", {blog.author} <button style={buttonStyle} onClick={handleViewBlog}> view more</button> </p>
  </div>
)

export default BlogViewLess