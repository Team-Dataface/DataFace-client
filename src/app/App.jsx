import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import authUser from "../utils/authUser";
import Login from "../components/pages/Login";
import Header from "../components/Header";
import Dashboard from "../components/pages/Dashboard";
import Sidebar from "../components/Sidebar";
import CreateDBModal from "../components/Modals/CreateDBModal";
import Modal from "../components/shared/Modal";

function App() {
  const [user, setUser] = useState("");
  const [showModal, setShowModal] = useState(false);
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
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <div className="flex flex-col h-screen">
      {user ? <Header /> : null}
      <div className="flex flex-1">
        {user ? <Sidebar user={user} toggleModal={toggleModal} /> : null}
        <div className="flex grow justify-center">
          <Routes>
            <Route path="/login" element={<Login onSuccess={setUser} />} />
            <Route
              path="/dashboard"
              element={<Dashboard user={user} toggleModal={toggleModal} />}
            />
            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
          {showModal && (
            <Modal onClick={toggleModal}>
              <CreateDBModal user={user} toggleModal={toggleModal} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
