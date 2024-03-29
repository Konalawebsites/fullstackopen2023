const User = ({ user }) => {

  return (
    <div>
      <h2>{user.username}</h2>

      <h4>added blogs</h4>
      <ul>
        {user.blogs?.map(blog =>
          <li key={blog.id}> {blog.title} </li>)}
      </ul>

    </div>
  )
}

export default User