import React from 'react';
import './MainLayout.scss'
import Nav from './components/Nav/Nav';
import Header from './components/Header/Header';
export default function MainLayout({children, header=true, fullScreen=false}) {
  return (
    <div className='main'>
      <div className='container-nav'>
          <Nav></Nav>
      </div>
      <div className='container-child'>
        {header &&<Header></Header>}

        <div className={fullScreen ? "" :"main-child"}>
            {children}
        </div>

      </div>
    </div>
  );
}
