import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import UserContext from "../context/UserContext";
import authUser from "../utils/authUser";
import Login from "../components/Login";
import Header from "../components/Header";
import ContentsContainer from "../components/ContentsContainer";
import DetailView from "../components/contents/DetailViewItems/DetailView";
import Sidebar from "../components/Sidebar";
import ListView from "../components/contents/ListViewItems/ListView";
import NoDatabase from "../components/contents/NoDatabase";
import Relationship from "../components/contents/RelationshipItems/Relationship";
import Loading from "../components/shared/Loading";
import ErrorPage from "../components/shared/ErrorPage";

import CONSTANT from "../constants/constant";

function App() {
  const [user, setUser] = useState("");
  const [documentsIds, setDocumentsIds] = useState([]);
  const [isRelationship, setIsRelationship] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [relationshipsData, setRelationshipsData] = useState(null);

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
    staleTime: CONSTANT.ONE_HOUR_IN_MILLISECONDS,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <UserContext.Provider value={user}>
        <div className="flex flex-col h-screen">
          {user && (
            <Header
              clickHandleLogout={setUser}
              documentsIds={documentsIds}
              setDocumentsIds={setDocumentsIds}
              isRelationship={isRelationship}
              setIsRelationship={setIsRelationship}
            />
          )}
          <div className="flex flex-1 overflow-y-auto">
            {user && (
              <Sidebar
                isInitial={isInitial}
                setIsInitial={setIsInitial}
                isRelationship={isRelationship}
                setRelationshipsData={setRelationshipsData}
              />
            )}
            <div className="flex grow justify-center">
              <Routes>
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/dashboard" element={<ContentsContainer />}>
                  <Route
                    path="listview"
                    element={<ListView setDocumentsIds={setDocumentsIds} />}
                  />
                  <Route
                    path="detailview"
                    element={
                      <DetailView
                        setDocumentsIds={setDocumentsIds}
                        relationshipsData={relationshipsData}
                        setRelationshipsData={setRelationshipsData}
                      />
                    }
                  />
                  <Route path="relationship" element={<Relationship />} />
                  <Route path="nodatabase" element={<NoDatabase />} />
                </Route>
                <Route path="/" element={<Navigate replace to="/login" />} />
              </Routes>
            </div>
          </div>
        </div>
      </UserContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
