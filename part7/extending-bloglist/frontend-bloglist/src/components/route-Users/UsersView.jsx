import { Link } from 'react-router-dom'

const containerStyle = {
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'center',
}

const tableStyle = {
  tableLayout: 'fixed',
  width: '40%', // Adjust the width based on your layout requirements
}

const centeredCell = {
  textAlign: 'center',
}
const flexContainerStyle = {
  display: 'flex',
  alignItems: 'center',
}

const UsersView = ({ users }) => {

  return (
    <div style={containerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={flexContainerStyle}>Username</th>
            <th style={centeredCell}>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user.id}>
              <td style={flexContainerStyle}>
                <Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td style={centeredCell}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}


export default UsersView