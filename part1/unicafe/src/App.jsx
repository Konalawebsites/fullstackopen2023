import { useState } from 'react'
import Button from './components/Button'
import Statistics from './components/Statistics'


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
          <Button setter={setGood} text="good" />
        
          <Button setter={setNeutral} text="neutral" />
  
          <Button setter={setBad} text="bad" />
      </div>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>

    </div>


  )
}

export default App