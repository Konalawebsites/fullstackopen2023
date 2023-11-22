import { useContext } from "react"
import NotificationContext from "../context/NotificationContext"

const Notification = () => {
  const [notification,] = useContext(NotificationContext)
  const color = notification === "error with making the anecdote ! " ? "red" : "green"
  const backgroundcolor = notification === "error with making the anecdote ! " ? "orange" : "lightgreen"

  const style = {
    padding: 10,
    border: notification !== null ? 'solid 2px black' : null,
    color: color,
    fontWeight: '600',
    background: backgroundcolor,
    maxWidth: '780px'
  }

  return (
    <div>
      {notification && <p style={style}>{notification}</p>}
    </div>
  )
}

export default Notification
