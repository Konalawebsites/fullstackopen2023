import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import NotificationContext from "../context/NotificationContext"
import { useField } from "../hooks"

const CreateNew = (props) => {
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const [, notificationDispatch] = useContext(NotificationContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/anecdotes')
    notificationDispatch({ type: "CREATE" })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' });
      }, 5000);
  }
  const handleReset = (e) => {
    e.preventDefault()
    content.onChange({ target: { value: '' }})
    author.onChange({ target: { value: '' }})
    info.onChange({ target: { value: '' }})
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input type={content.type} value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input type={author.type} value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input type={info.type} value={info.value} onChange={info.onChange} />
        </div>
        <button type="submit" >create</button>
        <button onClick={handleReset}> reset </button>
      </form>
      
    </div>
  )

}

export default CreateNew