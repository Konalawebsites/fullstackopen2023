import blogService from '/src/services/blogs'

const blogStyle2 = {
  fontSize: '10px',
  padding: '1px',
  border: '1px solid orange',
  marginTop: '10px',
}
const buttonStyle = {
  marginLeft: '100px',
  fontSize: '9px',
  color: 'orange'
}
const buttonStyle2 = {
  marginLeft: '10px',
  fontSize: '8px'
}

const BlogViewMore = ({ handleViewBlog, blog, blogs, setBlogs, handleNotificationShow }) => {

  const handleBlogLike = async (event) => {
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
      handleNotificationShow('adding like didnt go thru', true)
    }
  }

  const handleBlogDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {

      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        handleNotificationShow('the blog was deleted succesfully', false)
      } catch (exception) {
        handleNotificationShow('the blog was not deleted', true)
      }
    }
  }


  return (
    <div style={blogStyle2} >
      <p> "{blog.title}", {blog.author} <button style={buttonStyle} onClick={handleViewBlog}> view less</button> </p>
      <p> website: {blog.url} </p>
      <p> likes: {blog.likes} <button style={buttonStyle2} onClick={handleBlogLike} > like</button> </p>
      <p> user: {blog.user.username} </p>
      <button style={buttonStyle2} onClick={handleBlogDelete}> delete </button>
    </div>
  )
}

export default BlogViewMore