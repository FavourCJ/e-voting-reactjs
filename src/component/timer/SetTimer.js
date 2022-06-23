import React, { useEffect, useState } from 'react';
import Footer from "../footer/Footer";
import Header from "../header/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from '../sidebar/Sidebar';
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setMinutes";
import './timer.css';

function SetTimer() {

  const [day, setDay] = useState ();
  const [hour, setHour] = useState ();
  const [minute, setMinute] = useState ();
  const [second, setSecond] = useState();

  const [me, setMe] =useState({
    name: "Favour",
    surname: "chapp",
    second: 10
  })


  const [endDate, setEndDate] = useState(new Date("2021/12/10"));
  const [startDate, setStartDate] = useState(new Date("2021/12/01"));

  const timeDifference = () =>{
    let start = startDate.getTime();
    let end = endDate.getTime();
    const timeDiff = end - start;

    const second = 1000;
    const minute = second* 60
    const hour = minute *60
    const days = hour *24

    let timeDays = Math.floor(timeDiff / days);
    let timeHours = Math.floor((timeDiff % days) / hour);
    let timeMinutes = Math.floor ((timeDiff % hour) / minute);
    let timeSeconds = Math.floor ((timeDiff % minute) / second);

    setDay(timeDays);
    setHour(timeHours);
    setMinute (timeMinutes);
    setSecond (timeSeconds);

    setMe.age(timeSeconds)
    
  }

  useEffect(() =>{
    localStorage.setItem ("set-time", JSON.stringify(startDate));

  })

  return (
      <div className='timer-container'> 
      <Header/>
      <div className='timer-body-sider'>
          <Sidebar/>
          <div className='timer-body'>

        <div className='timer-display-container'>
        
        <div className='day-container'>
        <p> Days</p>
        <p className='timer-p'> {day}</p>      
        </div>

        <div className='hour-container'>
        <p> Hours</p>
        <p className='timer-p'>{hour}</p>      
        </div>

        <div className='minute-container'>
        <p> Minutes</p>
        <p className='timer-p'>{minute}</p>      
        </div>

        <div className='second-container'>
        <p> Seconds</p>
        <p className='timer-p'>{second}</p>   
        </div>

        </div>

        <div className='settime-container'> 
        <div>

        <p> Start Date</p>
        <DatePicker
              className='start-date'
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              timeIntervals={1}
              showTimeSelect
              timeFormat="HH:mm"
              injectTimes={[
                setHours(setMinutes(new Date(), 1), 0),
                setHours(setMinutes(new Date(), 5), 12),
                setHours(setMinutes(new Date(), 59), 23),
              ]}
              dateFormat="MMM d, yyyy h:mm aa"
            />
        </div>

        <div>
        <p> End Date</p>
        <DatePicker
              className='end-date'
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              injectTimes={[
                setHours(setMinutes(new Date(), 1), 0),
                setHours(setMinutes(new Date(), 5), 12),
                setHours(setMinutes(new Date(), 59), 23),
              ]}
              dateFormat="MMM d, yyyy h:mm aa"
            />
        </div>
        </div>
        <button className='set-vote-btn' onClick={timeDifference}> Set Vote Time</button>
        
        </div>       
      </div>
     
        <Footer/>
        </div>

    
  )
}

export default SetTimer