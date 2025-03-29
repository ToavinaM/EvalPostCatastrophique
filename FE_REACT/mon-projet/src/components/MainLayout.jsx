import React, { useState } from 'react';
import './MainLayout.scss'
import Nav from './Nav/Nav';
import Header from './Header/Header';
import Sider from 'antd/es/layout/Sider';
export default function MainLayout({children, header=true, fullScreen=false}) {
  
  const [collapsed, setCollapsed] = useState(false);
  function handleCollapsed(){
    setCollapsed(!collapsed);
  }

  return (
    <div className='main'>
          <Sider trigger={null} collapsible collapsed={collapsed} style={{backgroundColor:"white"}}>
            <div className='container-nav'>
                <Nav></Nav>
            </div>
          </Sider>

          <div className='container-child'>
            {header && <Header setCollapsed={handleCollapsed}></Header>}

            <div className={fullScreen ? "" :"main-child"}>
                {children}
            </div>
          </div>
      </div>
  );
}
