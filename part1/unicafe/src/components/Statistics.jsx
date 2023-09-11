import { useState } from 'react'
import Statisticline from './Statisticline'

const Statistics = ({ good, neutral, bad }) => {

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

  if (all === 0) {
    return (
      <div>
        <h1> Statistics </h1>
        <p> no feedback given </p>
      </div>
    )
  }

  return (
    <div>
      <h1> Statistics </h1>
      <table>
        <tbody>
          <Statisticline text="good" value={good} />
          <Statisticline text="neutral" value={neutral} />
          <Statisticline text="bad" value={bad} />
          <Statisticline text="all" value={all} />
          <Statisticline text="average" value={average} />
          <Statisticline text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
}



export default Statistics