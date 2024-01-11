import { useContext } from 'react'
import NotificationContext from '../context/NotificationContext'

const Notification = () => {
  const [notification,] = useContext(NotificationContext)
  const isError = notification && notification.startsWith('ERR')
  const color = isError ? 'red' : 'green'
  const backgroundcolor = isError ? 'orange' : 'lightgreen'

  const style = {
    padding: 10,
    border: notification !== null ? 'solid 2px black' : null,
    color: color,
    fontWeight: '600',
    background: backgroundcolor,
    width: '35%'
  }

  return (
    <div>
      {notification && <p style={style}>{notification}</p>}
    </div>
  )
}

export default Notification
