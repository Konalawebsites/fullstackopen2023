import { Link } from 'react-router-dom'
import LogoutButton from './buttons/LogOut'

const style = {
  marginBottom: '15px',
  display: 'flex',
  backgroundColor: 'lightyellow',
  width: '45%'
}
const linkStyle = {
  paddingRight: '30px'
}

const Menu = ({ user, handleLogout }) => {

  return (
    <div style={style} >
      <Link style={linkStyle} to="blogs">BLOGS</Link>
      <Link style={linkStyle} to="users">USERS</Link>
      <LogoutButton style={linkStyle} user={user} handleLogout={handleLogout}/>
    </div>
  )
}

export default Menu