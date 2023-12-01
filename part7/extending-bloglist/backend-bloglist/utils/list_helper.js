const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((acc, blogLikes) => acc + blogLikes, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikesBlog = blogs.reduce(function (prev, current) {
    return (prev && prev.likes > current.likes) ? prev : current
  })

  return {
    title: maxLikesBlog.title,
    author: maxLikesBlog.author,
    likes: maxLikesBlog.likes
  }
}

const dummy = (blogs) => {
  return 1
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}