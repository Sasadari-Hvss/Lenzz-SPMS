import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/pages/members/Login";
import PasswordChange from "./Components/pages/members/PasswordChange";
import Register from "./Components/pages/members/Register";
import Methods from "./Components/pages/members/Methods";
import EnterCompany from "./Components/pages/Company/EnterCompany";

import Home from "./Components/pages/Home";
import CreateCompany from "./Components/pages/Company/CreateCompany";
import ForgotPassword from "./Components/pages/members/ForgotPassword";
import Createproject from "./Components/project/Createproject";
import Progress from "./Components/pages/Progress";
import Settings from "./Components/pages/Settings";
import Chatroom from "./Components/pages/Chatroom";
import Company from "./Components/pages/Company/Company";
import Dashboard from "./Components/pages/Dashboard";
import CompanySettings from "./Components/pages/Company/CompanySettings";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/Home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/forgotPassword/:id/:token"
            element={<ForgotPassword />}
          />
          <Route path="/passwordChange" element={<PasswordChange />} />
          <Route
            path="/Methods"
            element={user ? <Methods /> : <Navigate to="/login" />}
          />
          <Route path="/EnterCompany" element={<EnterCompany />} />
          <Route path="/CreateCompany" element={<CreateCompany />} />
          <Route path="/CreateProject" element={<Createproject />} />
          <Route path="/Progress" element={<Progress />} />
          <Route path="/ChatRoom" element={<Chatroom />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Company" element={<Company />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/CompanySettings" element={<CompanySettings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
