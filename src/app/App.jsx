import { Routes, Route, Navigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { ErrorBoundary } from "react-error-boundary";

import { userAtom } from "../atoms/atoms";

import Login from "../components/Login";
import Header from "../components/Header";
import ContentsContainer from "../components/ContentsContainer";
import DetailView from "../components/contents/DetailViewItems/DetailView";
import Sidebar from "../components/Sidebar";
import ListView from "../components/contents/ListViewItems/ListView";
import NoDatabase from "../components/contents/NoDatabase";
import Relationship from "../components/contents/RelationshipItems/Relationship";
import ErrorPage from "../components/shared/ErrorPage";
import useGetAuthStatus from "../apis/useGetAuthStatus";

function App() {
  const user = useAtomValue(userAtom);
  useGetAuthStatus();

  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <div className="flex flex-col h-screen">
        {user && <Header />}
        <div className="flex flex-1 overflow-y-auto">
          {user && <Sidebar />}
          <div className="flex grow justify-center">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<ContentsContainer />}>
                <Route path="listview" element={<ListView />} />
                <Route path="detailview" element={<DetailView />} />
                <Route path="relationship" element={<Relationship />} />
                <Route path="nodatabase" element={<NoDatabase />} />
              </Route>
              <Route path="/" element={<Navigate replace to="/login" />} />
            </Routes>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
