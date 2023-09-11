import { useState } from 'react'

const Statisticline = (props) => {
  return (
    <tr>
      <td>{props.text} </td>
      <td>{props.value} </td>
    </tr>
  )
}


export default Statisticline