import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../components/pages/Login";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-row h-screen">
        <Sidebar />
        <div className="flex grow justify-center">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
