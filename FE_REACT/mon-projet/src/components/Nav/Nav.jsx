import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined,AreaChartOutlined,BarChartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
const items = [
    {
        key: 'sub1',
        label: 'Intelligence Artificiel',
        icon: <AreaChartOutlined />,
        children: [
            {
                key: 'g1',
                label: 'Dashboard',
                type: 'group',
                children: [
                    { key: '1', label: 'Upload Image' },
                    { key: '2', label: 'Cartographie' },
                ],
            },
            {
                key: 'g2',
                label: 'Item 2',
                type: 'group',
                children: [
                    { key: '3', label: 'Option 3' },
                    { key: '4', label: 'Option 4' },
                ],
            },
        ],
    },
    {
        key: 'sub2',
        label: 'Setting',
        icon: <SettingOutlined />,
        children: [
            { key: '5', label: 'Option 5' },
            { key: '6', label: 'Option 6' },
            {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    { key: '7', label: 'Option 7' },
                    { key: '8', label: 'Option 8' },
                ],
            },
        ],
    },
    {
        key: 'sub2',
        label: 'Finance',
        icon: <BarChartOutlined />,
        children: [
            { key: '5', label: 'Option 5' },
            { key: '6', label: 'Option 6' },
            {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    { key: '7', label: 'Option 7' },
                    { key: '8', label: 'Option 8' },
                ],
            },
        ],
    },
    {
        type: 'divider',
    }
];
const Nav = () => {
     const navigate = useNavigate();
    const onClick = e => {
        if (e.key === '1') {
            navigate('/upload'); // Redirection vers la page d'upload
        }
        else if (e.key === '2') {
            navigate('/cartographie'); // Redirection vers la page d'upload
        }
    };
    return (
        <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    );
};
export default Nav;