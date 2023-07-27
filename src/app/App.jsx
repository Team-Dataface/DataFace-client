import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import authUser from "../utils/authUser";
import Login from "../components/Login";
import Header from "../components/Header";
import ContentsContainer from "../components/ContentsContainer";
import DetailView from "../components/contents/DetailView";
import Sidebar from "../components/Sidebar";
import ListView from "../components/contents/ListView";
import NoDatabase from "../components/contents/NoDatabase";

import CONSTANT from "../constants/constant";

function App() {
  const [user, setUser] = useState("");
  const [currentDBId, setCurrentDBId] = useState("");
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [documentsIds, setDocumentsIds] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  const { isLoading } = useQuery(["authStatus"], authUser, {
    retry: false,
    onSuccess: response => {
      const { success, userInfo } = response.data;

      if (success) {
        setUser(userInfo);
        navigate("/dashboard");
      } else {
        setUser("");
      }
    },
    onError: () => {
      setUser("");
      return navigate("/login");
    },
    staleTime: CONSTANT.oneHourInMillisecond,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col h-screen">
      {user && (
        <Header
          user={user}
          clickHandleLogout={setUser}
          currentDBId={currentDBId}
          isEditMode={isEditMode}
          onClickSave={setIsEditMode}
          currentDocIndex={currentDocIndex}
          clickHandleNavigator={setCurrentDocIndex}
        />
      )}
      <div className="flex flex-1">
        {user && (
          <Sidebar
            user={user}
            currentDBId={currentDBId}
            setCurrentDBId={setCurrentDBId}
            setDocumentsIds={setDocumentsIds}
          />
        )}
        <div className="flex grow justify-center">
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route
              path="/dashboard"
              element={<ContentsContainer user={user} />}
            >
              <Route
                path="listview"
                element={
                  <ListView
                    user={user}
                    currentDBId={currentDBId}
                    isEditMode={isEditMode}
                    setIsSaveMode={setIsEditMode}
                    currentDocIndex={currentDocIndex}
                    setCurrentDocIndex={setCurrentDocIndex}
                    setDocumentsIds={setDocumentsIds}
                  />
                }
              />
              <Route
                path="detailview"
                element={
                  <DetailView
                    user={user}
                    currentDBId={currentDBId}
                    isEditMode={isEditMode}
                    setIsEditMode={setIsEditMode}
                    currentDocIndex={currentDocIndex}
                    setCurrentDocIndex={setCurrentDocIndex}
                    documentsIds={documentsIds}
                  />
                }
              />
              <Route
                path="nodatabase"
                element={
                  <NoDatabase user={user} setCurrentDBId={setCurrentDBId} />
                }
              />
            </Route>
            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
