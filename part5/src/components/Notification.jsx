const Notification = ({ notificationMessage, isError }) => {

  const notificationStyle = {
    color: isError ? 'red' : 'green',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  if (notificationMessage === null) {
    return null
  }
  return (
    <div style={notificationStyle}>
      {notificationMessage}
    </div>
  )
}

export default Notification