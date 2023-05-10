import React from 'react'
import "./footer.css";
import  { FacebookFilled, LinkedinFilled, TwitterSquareFilled, InstagramFilled} from '@ant-design/icons';

function Footer() {
  return (
    <div className='footer-container'>
        <p className='footer-text'> &copy; Designed and created by Favour Chapp-Jumbo</p>
        <div className='social'>
             <FacebookFilled className = "social-icon"/>
             <a href = "https://www.linkedin.com/in/favourchapp-jumbo/" className='social-icon-link' target = "_blank"><LinkedinFilled className = "social-icon"/> </a>
             <TwitterSquareFilled className = "social-icon"/>
             <InstagramFilled className = "social-icon"/>
             </div>
    </div>
  )
}

export default Footer