import { useSelector } from 'react-redux'

const Notification = () => {
  const notification =  useSelector((state) => state.notifications.notification)

  const style = {
    padding: 10,
    border: notification !== null ? 'solid 2px green' : null,
    color: 'green',
    fontWeight: '600',
    background: notification !== null ? 'lightgreen' : null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}


export default Notification