import React from 'react';
import {UserOutlined, SettingOutlined, BellOutlined} from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import 'antd/dist/antd.css';
import "./header.css";
function Header() {

    const menu = (
        <Menu>
          <Menu.Item key ={1}>
            <a target="_self" rel="noopener noreferrer" href="/myAccount">
              My Account
            </a>
          </Menu.Item>
          <Menu.Item key={2}>
            <a target="_self" rel="noopener noreferrer" href="/login">
             Log Out
            </a>
          </Menu.Item>
        </Menu>
      );
      
  return (
    <div className='header-container'> 
    <div className='logo'> <span className='logo-text'> FavourCJ</span></div>
      <div className='icon'>
     
          <div className='user'> 
          <Dropdown overlay={menu} placement="bottom" arrow={{ pointAtCenter: true }}>
          <UserOutlined />
         </Dropdown>
       </div>
       <div className='setting'>  <BellOutlined /></div>
          <div className='setting'> <SettingOutlined /> </div>
      
      
      </div>
    </div>
      
    
  )
}

export default Header