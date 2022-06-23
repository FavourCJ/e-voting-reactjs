import React from 'react'
import "./footer.css";
import  { FacebookFilled, LinkedinFilled, TwitterSquareFilled, InstagramFilled} from '@ant-design/icons';

function Footer() {
  return (
    <div className='footer-container'>
        <p className='footer-text'> &copy; Designed and created by Favour Chapp-Jumbo</p>
        <div className='social'>
             <FacebookFilled className = "social-icon"/>
             <LinkedinFilled className = "social-icon"/>
             <TwitterSquareFilled className = "social-icon"/>
             <InstagramFilled className = "social-icon"/>
             </div>
    </div>
  )
}

export default Footer