import { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useSetAtom, useAtomValue } from "jotai";

import fetchData from "../utils/axios";

import {
  currentDBIdAtom,
  currentDBNameAtom,
  currentDocIndexAtom,
  isEditModeAtom,
  isRelationshipAtom,
} from "../atoms/atoms";
import UserContext from "../context/UserContext";

import Button from "./shared/Button";
import CreateDBModal from "./Modals/CreateNewDatabase/CreateDBModal";
import Loading from "./shared/Loading";

function Sidebar({ isInitial, setIsInitial, setRelationshipsData }) {
  const queryClient = useQueryClient();
  const [showCreateDBModal, setShowCreateDBModal] = useState(false);

  const { userId, username } = useContext(UserContext);
  const [currentDBId, setCurrentDBId] = useAtom(currentDBIdAtom);
  const setCurrentDBName = useSetAtom(currentDBNameAtom);
  const setCurrentDocIndex = useSetAtom(currentDocIndexAtom);
  const isEditMode = useAtomValue(isEditModeAtom);
  const isRelationship = useAtomValue(isRelationshipAtom);

  async function getDatabaseList() {
    const response = await fetchData("GET", `users/${userId}/databases`);

    return response.data.databases;
  }

  const { data: databases, isLoading } = useQuery(
    ["userDbList"],
    getDatabaseList,
    {
      enabled: !!userId,
      onSuccess: result => {
        if (result.length && isInitial) {
          setCurrentDBId(result[0]._id);
          setCurrentDBName(result[0].name);
          setIsInitial(false);
        }
      },
      onFailure: () => {
        console.log("sending user to errorpage");
      },
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );

  async function deleteDatabase(databaseId) {
    const response = await fetchData(
      "DELETE",
      `/users/${userId}/databases/${databaseId}`,
    );

    return response.data.databases;
  }

  const { mutate: fetchDeleteDB } = useMutation(deleteDatabase, {
    onSuccess: result => {
      if (databases.length === 1) {
        setCurrentDocIndex(0);
        setCurrentDBName("");
      } else {
        setCurrentDBId(result[0]._id);
        setCurrentDBName(result[0].name);
      }

      queryClient.refetchQueries(["userDbList"]);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  function renderDatabaseList() {
    function isActive(id) {
      if (currentDBId === id) {
        return true;
      }

      return false;
    }

    function switchDatabase(clickedDBId, clickedDB) {
      setCurrentDocIndex(0);
      setCurrentDBId(clickedDBId);
      setCurrentDBName(clickedDB);
      setRelationshipsData(null);

      queryClient.refetchQueries(["userDb"]);
      queryClient.refetchQueries(["dbDocumentList", clickedDBId]);
    }

    return databases.map(element => {
      return (
        <div
          key={element._id}
          className={`
            flex justify-between items-center w-full
            ${isActive(element._id) && !isEditMode && "bg-yellow"}
            ${!isEditMode && "hover:bg-yellow"}
            `}
        >
          <Button
            className="w-full"
            onClick={() => switchDatabase(element._id, element.name)}
            disabled={isEditMode}
          >
            <div className="flex">
              <img
                className="ml-6 mr-2"
                src="/assets/folder_icon.svg"
                alt="folder icon"
              />
              <span>{element.name}</span>
            </div>
          </Button>
          <Button
            onClick={() => fetchDeleteDB(element._id)}
            disabled={isEditMode}
          >
            <img className="mr-2" src="/assets/bin_icon.svg" alt="bin icon" />
          </Button>
        </div>
      );
    });
  }

  return (
    <div
      className={`flex flex-col items-center min-w-[250px] p-2
      ${isEditMode ? "bg-dark-grey" : "bg-light-grey"}`}
    >
      <div className="flex flex-col w-full">
        <div className="flex h-10 ml-2 items-center">
          <img className="mr-2" src="/assets/DB_icon.svg" alt="DB icon" />
          <p className="font-bold">{username}</p>
        </div>
        {databases && <ul className="mb-3">{renderDatabaseList()}</ul>}
      </div>
      <div className="flex justify-center">
        <Button
          className={`flex justify-center w-48 text-sm items-center rounded-full text-white
          ${
            isEditMode || isRelationship
              ? "hidden"
              : "bg-black-bg hover:bg-dark-grey"
          }`}
          onClick={() => setShowCreateDBModal(true)}
          disabled={isEditMode}
        >
          <img
            className="flex justify-between items-center mr-2 w-4"
            src="/assets/add_icon.svg"
            alt="add icon"
          />
          New Database
        </Button>
      </div>
      {showCreateDBModal && (
        <CreateDBModal closeModal={() => setShowCreateDBModal(false)} />
      )}
    </div>
  );
}

export default Sidebar;
