import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import authUser from "../utils/authUser";
import Login from "../components/Login";
import Header from "../components/Header";
import Dashboard from "../components/ContentsContainer";
import Sidebar from "../components/Sidebar";
import CONSTANT from "../constants/constant";
import ListView from "../components/contents/ListView";
import NoDatabase from "../components/contents/NoDatabase";

function App() {
  const [user, setUser] = useState("");
  const [currentDBId, setCurrentDBId] = useState("");
  const navigate = useNavigate();

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
    staleTime: CONSTANT.oneHourInMillisecond,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col h-screen">
      {user ? (
        <Header
          user={user}
          clickHandleLogout={setUser}
          currentDBId={currentDBId}
        />
      ) : null}
      <div className="flex flex-1">
        {user ? (
          <Sidebar
            user={user}
            currentDBId={currentDBId}
            setCurrentDBId={setCurrentDBId}
          />
        ) : null}
        <div className="flex grow justify-center">
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />}>
              <Route path="listview" element={<ListView user={user} />} />
              <Route path="nodatabase" element={<NoDatabase user={user} />} />
            </Route>
            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
