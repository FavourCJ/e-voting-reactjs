import React from 'react';
import 
{
  LineChartOutlined, 
  HomeOutlined, 
  UserAddOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  MailOutlined,
  MessageOutlined,
  FormOutlined,
  AppstoreOutlined,
  DownloadOutlined
} from '@ant-design/icons';

import "./sidebar.css";
function Sidebar() {
  return (
    <div className='sidebar-container'>
        <div className='sider-menu'>
          <div>
          <h3 className='header'> Dashboard</h3>
          <div className='menu-icon'>
            <a className='menu-icon-link' href='/admin'>
            <AppstoreOutlined
           
              className="sidebarIcon"
              />
            <li className='menu active' > Dashboard</li>   
              </a> 

            </div>
          <div className='menu-icon'>
            <a className='menu-icon-link' href='/home'>
            <HomeOutlined
              className="sidebarIcon"
              />
            <li className='menu'> Home</li>   
              </a> 

            </div>
           
            <div className='menu-icon'>
            <a className='menu-icon-link' href='/analytics'>
            <LineChartOutlined 
              className="sidebarIcon"
              /> 
            <li className='menu'> Analytics</li>
            
            </a>         
            </div>
          </div>

         <div>
         <h3 className='header'> Quick Menu</h3>
          
          <div className='menu-icon'>
          <a className='menu-icon-link' href='/user'>
          <UserAddOutlined 
            className="sidebarIcon"
           /> 
          <li className='menu'> Users </li>       
          </a>
          </div>


          <div className='menu-icon'>
          <a className='menu-icon-link' href='/contestants'> 
          <TeamOutlined
            className="sidebarIcon"/>
          <li className='menu'> Contestants </li>
          </a>
          </div>

          <div className='menu-icon'>
          <a className='menu-icon-link' href='/setTimer'>
          <ClockCircleOutlined
             className="sidebarIcon" /> 
          <li className='menu'> Vote Time </li>
          </a>
          </div>
          </div>

          <div className='menu-icon'>
          <a className='menu-icon-link' href='/projectPlan.pdf' download rel="noopener noreferrer">
          <DownloadOutlined 
            className="sidebarIcon"
           /> 
          <li className='menu'> Project Plan </li>       
          </a>
          </div>

           <div>
           <h3 className='header'> Notifications</h3>
           
           <div className='menu-icon'>
           <a className='menu-icon-link'>
           <MailOutlined 
             className="sidebarIcon"/> 
           <li className='menu'> Mail</li>
           </a>
             </div>

             
           <div className='menu-icon'>
           <a className='menu-icon-link'>
           <FormOutlined 
             className="sidebarIcon"/> 
           <li className='menu'> Feedbacks</li>
           </a>
             </div>

             
            <div className='menu-icon'>
            <a className='menu-icon-link'>
            <MessageOutlined 
              className="sidebarIcon"/> 
            <li className='menu'> Messages</li>
            </a>
              </div>
          </div>
           
        </div>

    </div>
  )
}

export default Sidebar