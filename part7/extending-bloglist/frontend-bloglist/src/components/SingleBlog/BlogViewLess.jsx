const blogStyle = {
  fontSize: '10px',
  padding: '1px',
  marginTop: '10px',
  width: '35%',
  border: '1px solid black',
  position: 'relative'
}

const buttonStyle = {
  fontSize: '9px',
  position: 'absolute',
  top: '0',
  right: '0'

}

const BlogViewLess = ({ blog, handleViewBlog }) => (
  <div style={blogStyle} className="blogContent" >
    <p> "{blog.title}" by {blog.author} <button id='view_more' style={buttonStyle} onClick={handleViewBlog}>view more</button> </p>
  </div>
)

export default BlogViewLess