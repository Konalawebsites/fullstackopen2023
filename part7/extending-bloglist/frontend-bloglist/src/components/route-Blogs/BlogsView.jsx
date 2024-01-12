import BlogViewLess from '../SingleBlog/BlogViewLess'

const BlogsView = ({ blogs, user }) => {
  blogs.data.sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <h4>Blogs</h4>
      {blogs.data.map(blog =>
        <BlogViewLess key={blog.id} blog={blog} blogs={blogs} user={user} />
      )}
    </div>
  )
}

export default BlogsView