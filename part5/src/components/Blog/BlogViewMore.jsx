import blogService from '/src/services/blogs'

const blogStyle2 = {
  fontSize: '10px',
  padding: '1px',
  border: '1px solid orange',
  marginTop: '10px',
}
const buttonStyle= {
  marginLeft: '100px',
  fontSize: '9px'
}

const handleBlogLike = async (event, blog) => {
  event.preventDefault()
  try {
    
    const returnedBlog = await blogService.update({
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes + 1
    }, blog.id)

    // adding user data from the old blog
    returnedBlog.user = {
      username: blog.user.username,
      name: blog.user.name
    }

    const updatedBlogs = blogs.map(b => b.id !== blog.id ? b : returnedBlog)
    setBlogs(updatedBlogs)
  } catch (exception) {
    console.log('error')
  }
}

const BlogViewMore = ({handleViewBlog, blog}) => (
  <div style={blogStyle2} >
    <p> "{blog.title}", {blog.author} <button style={buttonStyle} onClick={handleViewBlog}> view less</button> </p>
    <p> website: {blog.url} </p>
    <p> likes: {blog.likes} <button style={buttonStyle} onClick={handleBlogLike} > like</button> </p>
    <p> user: {blog.user.username} </p>
  </div>
)

export default BlogViewMore