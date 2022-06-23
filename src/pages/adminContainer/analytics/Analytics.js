import React from 'react'
import ChartPage from"../chart/Chart"
import {userData} from "../chart/dummyData"
import Header from "../../../component/header/Header"
import Sidebar from "../../../component/sidebar/Sidebar"
import Footer from "../../../component/footer/Footer"
import "./analytics.css"
function Analytics() {
  return (
    <div className='analytics-container'>
            <Header/>  
        <div className='analytics-content'>
            <Sidebar/>
            <div className='chart-graph'>
            <ChartPage data={userData} title="User Analytics" grid dataKey="Active User"/>         
            </div>
     </div>  
     <Footer/>     
    </div>
  )
}

export default Analytics