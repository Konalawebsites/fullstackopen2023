import { Link } from 'react-router-dom'

const style = {
  marginBottom: '15px',
}

const Menu = () => {

  const padding = {
    paddingRight: 5
  }

  return (
    <div style={style} >
      <Link style={padding} to="blogs">BLOGS</Link>
      <Link style={padding} to="users">USERS</Link>
    </div>
  )
}

export default Menu