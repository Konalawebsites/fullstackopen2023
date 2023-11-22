const Footer = () => {
  const footerStyle = {
    padding: "5px",
    marginTop: "10px"
  }
  return (
    <div style={footerStyle}>
      Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

      See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
  )
}

export default Footer