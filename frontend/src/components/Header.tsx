import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";

//TYPES
interface HeaderProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
const { Header } = Layout;

const App: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          type="link"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <h3 style={{ marginRight: "30px" }}>EIGEN</h3>
      </Header>
    </>
  );
};

export default App;
