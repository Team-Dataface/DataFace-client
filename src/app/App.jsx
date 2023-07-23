import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import authUser from "../utils/authUser";
import Login from "../components/pages/Login";
import Header from "../components/Header";
import Dashboard from "../components/pages/Dashboard";
import Sidebar from "../components/Sidebar";

function App() {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const response = await authUser();
        const { success, userId } = response.data;

        if (success) {
          setUser(userId);
        } else {
          setUser("");
        }
      } catch (error) {
        console.log("send user to Error page");
      }
    }

    checkLoginStatus();
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex grow justify-center">
          <Routes>
            <Route
              path="/login"
              element={
                <Login onSuccess={setUser} setIsLoggedIn={setIsLoggedIn} />
              }
            />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
