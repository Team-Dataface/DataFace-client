import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../components/pages/Login";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex grow justify-center">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
