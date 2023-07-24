import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import authUser from "../utils/authUser";
import Login from "../components/pages/Login";
import Header from "../components/Header";
import Dashboard from "../components/pages/Dashboard";
import Sidebar from "../components/Sidebar";

function App() {
  const [user, setUser] = useState("");
<<<<<<< HEAD
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
=======
  const [isLoggedIn, setIsLoggedIn] = useState(false);
>>>>>>> b88207b (Refactor. move Modals to appropriate components)

  const { isLoading } = useQuery(["authStatus"], authUser, {
    retry: 1,
    onSuccess: response => {
      const { success, userId } = response.data;

      if (success) {
        setUser(userId);
      } else {
        setUser("");
      }
    },
    onError: () => {
      setUser("");
      return navigate("/login");
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col h-screen">
<<<<<<< HEAD
      {user ? <Header /> : null}
      <div className="flex flex-1">
        {user ? <Sidebar user={user} toggleModal={toggleModal} /> : null}
        <div className="flex grow justify-center">
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route
              path="/dashboard"
              element={<Dashboard user={user} toggleModal={toggleModal} />}
            />
=======
      <Header user={user} />
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
>>>>>>> b88207b (Refactor. move Modals to appropriate components)
            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
