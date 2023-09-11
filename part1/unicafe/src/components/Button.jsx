import { useState } from 'react'

const Button = ({text, setter}) => {
  
  return (
    
    <div>
      <button onClick={()=> setter(currentvalue => currentvalue + 1)} type="button">{text}</button>
    </div>
    
  );
}

export default Button