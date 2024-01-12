const LogoutButton = ({ handleLogout, user }) => {
  return (
    <a>{user.user.username} logged in <button id='log_out' onClick={handleLogout}>logout</button></a>
  )
}


export default LogoutButton