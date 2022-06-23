import React from 'react'

function Timer() {
  return (
    <div className='timer-body'>

    <div className='timer-display-container'>
    
    <div className='day-container'>
    <p> Days</p>
    <p className='timer-p'>  </p>
    
    </div>

    <div className='hour-container'>
    <p> Hours</p>
    <p className='timer-p'> </p>
    
    </div>

    <div className='minute-container'>
    <p> Minutes</p>
    <p className='timer-p'> </p>
    
    </div>

    <div className='second-container'>
    <p> Seconds</p>
    <p className='timer-p'> </p>
    
    </div>

    
    </div>

    </div>
  )
}

export default Timer