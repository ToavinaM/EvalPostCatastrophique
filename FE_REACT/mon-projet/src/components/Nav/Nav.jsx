import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined,AreaChartOutlined,BarChartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
const items = [
    {
        key: 'sub1',
        label: 'Analyse',
        icon: <AreaChartOutlined />,
        children: [
            {
                key: 'g1',
                label: 'Dashboard',
                type: 'group',
                children: [
                    { key: '/upload', label: 'Upload Image' },
                    { key: '/cartographie', label: 'Cartographie' },
                ],
            },
            {
                key: 'g2',
                label: 'Autres Options',
                type: 'group',
                children: [
                    { key: '/option3', label: 'Option 3' },
                    { key: '/option4', label: 'Option 4' },
                ],
            },
        ],
    },
    {
        key: 'sub2',
        label: 'Paramètres',
        icon: <SettingOutlined />,
        children: [
            { key: '/option5', label: 'Option 5' },
            { key: '/option6', label: 'Option 6' },
            {
                key: 'sub3',
                label: 'Sous-menu',
                children: [
                    { key: '/option7', label: 'Option 7' },
                    { key: '/option8', label: 'Option 8' },
                ],
            },
        ],
    },
    {
        key: 'sub4',
        label: 'Finance',
        icon: <BarChartOutlined />,
        children: [
            { key: '/finance-option5', label: 'Option 5' },
            { key: '/finance-option6', label: 'Option 6' },
            {
                key: 'sub11',
                label: 'Sous-menu',
                children: [
                    { key: '/finance-option7', label: 'Option 7' },
                    { key: '/finance-option8', label: 'Option 8' },
                ],
            },
        ],
    },
    { type: 'divider' },
];

const Nav = () => {
    const navigate = useNavigate();

    const onClick = ({ key }) => {
        if (key.startsWith('/')) {
            navigate(key);
        }
    };
    return (
        <Menu
            onClick={onClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    );
};
export default Nav;