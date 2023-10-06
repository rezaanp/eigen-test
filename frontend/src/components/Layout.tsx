import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Layout, theme } from "antd";

//TYPES
interface LayoutProps {
  children: React.ReactNode;
}

const { Content } = Layout;

const App: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div style={{ backgroundColor: "red", height: "97vh" }}>
      <Layout style={{ height: "100%" }}>
        <Sidebar collapsed={collapsed} />
        <Layout>
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
