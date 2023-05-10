import React, { useContext } from 'react';
import {UserOutlined, BellOutlined} from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import 'antd/dist/antd.css';
import "./header.css";
import { useHistory } from 'react-router-dom';
import { ContestantContext } from '../ContextFile/ContestantContext';

function Header() {
  const userCategory = localStorage.getItem('category');
  const { logout} = useContext(ContestantContext);
  
  const history = useHistory();
  
  const navUser =()=>{
    if (userCategory === "Voter" || userCategory === "Admin"){
      history.push("/my-account")
    }else  if (userCategory === "no-user"){
      history.push("/login")
    }
    window.location.reload(false);
  }
    const menu = (
        <Menu>
          <Menu.Item key ={1}>
            <button onClick={navUser} className = "header-nav-user"> My Account </button>
          </Menu.Item>
          <Menu.Item key={2}>
            <button onClick={()=>{
          logout();
          history.push ("/login");
        }} className = "header-nav-user">
             Log Out
            </button>
          </Menu.Item>
        </Menu>
      );
      
  return (
    <div className='header-container'> 
    <div className='logo'> <span > 
      <a href='https://my-favourcj-portfolio.web.app/' className='logo-text' target= "_blank">FavourCJ</a>
      </span></div>
      <div className='icon'>
     
          <div className='user'> 
          <Dropdown overlay={menu} placement="bottom" arrow={{ pointAtCenter: true }}>
          <UserOutlined />
         </Dropdown>
       </div>
       <div className='bell'>  <BellOutlined /></div>
      </div>
    </div>
      
    
  )
}

export default Header