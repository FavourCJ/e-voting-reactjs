import React, { useEffect, useRef, useState } from 'react'
import "./timer.css"

function Timer() {

    const Ref = useRef(null);
  
    // The state for our timer
    const [timerDays, setTimerDays] = useState("");
    const [timerHours, setTimerHours] = useState("");
    const [timerMinutes, setTimerMinutes] = useState("");
    const [timerSeconds, setTimerSeconds] = useState("");
  
  
    const getTimeRemaining = (e) => {
        let dateFuture = new Date(new Date().getFullYear() +1, 0, 1);
        let dateNow = new Date();

        let seconds = Math.floor((dateFuture - (dateNow))/1000);
        let minutes = Math.floor(seconds/60);
        let hours = Math.floor(minutes/60);
        let days = Math.floor(hours/24);

        hours = hours-(days*24);
        minutes = minutes-(days*24*60)-(hours*60);
        seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);

        return {
            days, hours, minutes, seconds
        };
    }
  
  
    const startTimer = (e) => {
        let { days, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        if (days >= 0) {
  
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimerHours((hours > 9 ? hours : '0' + hours))
            setTimerDays((days > 9 ? days : '0' + days))
            setTimerMinutes(minutes > 9 ? minutes : '0' + minutes)
            setTimerSeconds(seconds > 9 ? seconds : '0' + seconds)
        }
    }
  
    const clearTimer = (e) => {
  
        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = () => {
        
        let deadline = new Date();
  
        // This is where you need to adjust if 
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 10);
        deadline.setMinutes(deadline.getMinutes() + 30);
        deadline.setHours(deadline.getHours() + 0);
       // deadline.today.getDay()
        //deadline.setDay(deadline.getDay() + 20);
        return deadline;
    }
  
    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible
  
    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);
  

  return (
    <div className='timer-body'>
    <div className='timer-display-container'>
    
    <div className='day-container'>
    <p> Days</p>
    <p className='timer-p'>{timerDays}</p>
    
    </div>

    <div className='hour-container'>
    <p> Hours</p>
    <p className='timer-p'>{timerHours}</p>
    
    </div>

    <div className='minute-container'>
    <p> Minutes</p>
    <p className='timer-p'>{timerMinutes}</p>
    
    </div>

    <div className='second-container'>
    <p> Seconds</p>
    <p className='timer-p'>{timerSeconds}</p>
    
    </div>

    
    </div>

    </div>
  )
}

export default Timer