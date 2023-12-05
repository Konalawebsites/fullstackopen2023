import { useSelector } from 'react-redux'

const Notification = () => {
  const notification =  useSelector((state) => state.notifications.notification)
  const isError = useSelector((state) => state.notifications.isError)

  const style = {
    padding: 10,
    border: notification !== null ? 'solid 2px black' : null,
    color: isError === true ? 'red' : 'green',
    fontWeight: '600',
    background: notification !== null ? 'lightgrey' : null
  }
  console.log(isError)

  return (
    <div style={style}>
      {notification}
    </div>
  )
}


export default Notification