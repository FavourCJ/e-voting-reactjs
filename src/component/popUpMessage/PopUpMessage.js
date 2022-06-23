import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import "./popMessage.css";
function PopUpMessage({closeMessage}) {
  return (
    <div className='pop-container'>
        <div> 
        <ExclamationCircleOutlined className = "warning-icon"/>
        </div>
        <div> 
            <h1 className='pop-header'> Are you sure you would love to vote for this candidate? </h1>
            </div>
        <div> 
            <p className='pop-p'> Vote cannot be reversed </p>
            </div>

            <div className='pop-btn'>
                <button 
                  className='pop-btn-yes'
                  onClick={() =>{
                    closeMessage (false)
                  }}> Yes </button>
                <button 
                  className='pop-btn-no'
                  onClick={() =>{
                    closeMessage (false)
                  }} > Cancel</button>
            </div>
    </div>
  )
}

export default PopUpMessage