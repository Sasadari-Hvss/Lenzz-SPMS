import React from "react";
import Dashboard from "./Dashboard";
import { Provider } from "react-redux";
import store from "../../../store";
import SideBar from "../mainComponents/Sidebar";

const DashboardProvider = () => {
  return (
    <SideBar>
      <div
        style={{
          marginTop: "60px",
          marginLeft: "60px",
        }}
      >
        <Provider store={store}>
          <div>
            <Dashboard />
          </div>
        </Provider>
      </div>
    </SideBar>
  );
};
export default DashboardProvider;
