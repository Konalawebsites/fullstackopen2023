import Blog from '../SingleBlog/Blog'

const BlogsView = ({ blogs, user }) => {
  blogs.data.sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <h4>Blogs</h4>
      {blogs.data.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} user={user} />
      )}
    </div>
  )
}


export default BlogsView