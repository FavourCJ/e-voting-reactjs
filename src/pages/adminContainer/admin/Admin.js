import React from 'react'
import Footer from '../../../component/footer/Footer'
import Header from '../../../component/header/Header';
import Sidebar from '../../../component/sidebar/Sidebar';
import FeaturedItem from "../featuredItem/FeaturedItem";
import "./admin.css";
function Admin() {
  return (
    <div className='admin-container'>
        <Header/>
       
        <div className='admin-body'>
          <Sidebar/>
          <div className='content'>
          <FeaturedItem/>

          </div>      
        </div>
        <Footer/>
        </div>
  )
}

export default Admin