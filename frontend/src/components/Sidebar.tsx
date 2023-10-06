import React from "react";
import { Layout, Menu } from "antd";
import Navigation from "@/utils/Navigation";
import { Link } from "react-router-dom";

//TYPES
interface SidebarProps {
  collapsed: boolean;
}

interface MenuProps {
  key: string;
  icon: React.ReactNode;
  label: string;
  path: string;
}

//LIST MENU
const { Sider } = Layout;

const App: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {Navigation?.map((menu: MenuProps) => (
            <Menu.Item key={menu.key}>
              <Link to={menu.path}>
                {menu.icon}
                <span>{menu.label}</span>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </>
  );
};

export default App;
