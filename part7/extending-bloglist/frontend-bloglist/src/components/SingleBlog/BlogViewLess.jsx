/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom'

const blogStyle = {
  fontSize: '10px',
  padding: '1px',
  marginTop: '10px',
  width: '35%',
  border: '1px solid black',
  position: 'relative'
}

const BlogViewLess = ({ blog }) => (
  <div style={blogStyle} className="blogContent" >
    <Link to={`/blogs/${blog.id}`}> "{blog.title}" by {blog.author}
    </Link>
  </div>
)

export default BlogViewLess