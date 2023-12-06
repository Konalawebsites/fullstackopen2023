import { useState } from 'react'
import BlogViewMore from './BlogViewMore'
import BlogViewLess from './BlogViewLess'

const Blog = ({ blog, blogs, setBlogs, user }) => {

  const [isBlogView, setBlogView] = useState('viewShort')

  const handleViewBlog = () => {
    if (isBlogView === 'viewShort') {
      setBlogView('viewMore')
    }
    if (isBlogView === 'viewMore') {
      setBlogView('viewShort')
    }
  }

  if (isBlogView === 'viewShort') {
    return (
      <BlogViewLess handleViewBlog={handleViewBlog} blog={blog} />
    )
  }

  if (isBlogView === 'viewMore') {
    return (
      <BlogViewMore handleViewBlog={handleViewBlog} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />
    )
  }
}

export default Blog