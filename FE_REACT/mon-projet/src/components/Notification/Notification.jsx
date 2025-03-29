import React from 'react';

import { AlignLeftOutlined, BellOutlined, MailOutlined, GlobalOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
export default function Notification() {
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  return (
    <>
      <Popover content={content} title="Notification">
        <GlobalOutlined></GlobalOutlined>
      </Popover>
    </>
  );
}
