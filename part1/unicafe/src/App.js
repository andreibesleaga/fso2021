import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => {
  return(
    <span>
      {props.text}:{props.value}
    </span>
  )
}

const Statistics = (props) => {
  let all = props.good + props.neutral + props.bad
  let average = ( props.good + (-1)*props.bad ) / all
  let positive = props.good/all * 100

  if(props.good===0 && props.neutral===0 && props.bad===0) {
    return (
      <div>No feedback given</div>
    )
  }
  
  return(
    <table>
      <tbody>
      <tr><td> <Statistic text="good" value ={props.good} /> </td></tr>
      <tr><td> <Statistic text="neutral" value ={props.neutral} /> </td></tr>
      <tr><td> <Statistic text="bad" value ={props.bad} /> </td></tr>
      <tr><td> <Statistic text="all" value ={all} /> </td></tr>
      <tr><td> <Statistic text="average" value ={average} /> </td></tr>
      <tr><td> <Statistic text="positive" value ={positive} /> %  </td></tr>
      </tbody>
    </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
        <Button handleClick={() => setGood(good+1)} text="good" />
        <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
        <Button handleClick={() => setBad(bad+1)} text="bad" />
      <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App