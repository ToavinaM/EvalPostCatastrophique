import React from 'react';

import { AlignLeftOutlined, BellOutlined, MailOutlined, GlobalOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Badge, Popover } from 'antd';
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
        <Badge size="small" count={5}>
          <BellOutlined ></ BellOutlined>
        </Badge>
      </Popover>
    </>
  );
}
