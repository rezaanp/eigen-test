import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "@/components/Layout";
import Navigation from "./utils/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          {Navigation?.map((menu: any) => (
            <Route key={menu?.key} path={menu?.path} element={menu?.element} />
          ))}
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);
