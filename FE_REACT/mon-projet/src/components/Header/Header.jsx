import React, { useState } from 'react';
import './Header.scss'
import {AlignLeftOutlined,BellOutlined,MailOutlined, GlobalOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Avatar, Input } from 'antd';

export default function Header({ setCollapsed }) {

  const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;
  const searchResult = query =>
    Array.from({ length: getRandomInt(5) })
      .join('.')
      .split('.')
      .map((_, idx) => {
        const category = `${query}${idx}`;
        return {
          value: category,
          label: (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>
                Found {query} on{' '}
                <a
                  href={`https://s.taobao.com/search?q=${query}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {category}
                </a>
              </span>
              <span>{getRandomInt(200, 100)} results</span>
            </div>
          ),
        };
      });

  const [options, setOptions] = useState([]);
  const handleSearch = value => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = value => {
    console.log('onSelect', value);
  };
  return (
    <div className='header'>
        <div className="left-section">
        <AlignLeftOutlined className='menu-btn' onClick={()=>setCollapsed()}/>

        <AutoComplete
          popupMatchSelectWidth={252}
          style={{ width: 300 }}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
          size="large"
        >
          <Input className="search-bar"  placeholder="large size" prefix={<SearchOutlined style={{margin:"4px"}} />}/>
        </AutoComplete>
        </div>

        <div className="right-section">
        <button className="icon-btn"><GlobalOutlined /></button>
        <button className="icon-btn"><MailOutlined/></button>
        <button className="icon-btn"><BellOutlined/></button>
          <div className="profile">
            {/* <div */}
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            {/* <img src="profile.jpg" alt="User Profile"/> */}
              <span>Mark Anderson</span>
          </div>
        </div>

    </div>
  );
}
