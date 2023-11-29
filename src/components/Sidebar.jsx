import { useQueryClient } from "@tanstack/react-query";
import { useAtom, useSetAtom, useAtomValue } from "jotai";

import {
  databasesAtom,
  currentDBIdAtom,
  currentDBNameAtom,
  currentDocIndexAtom,
  isEditModeAtom,
  isRelationshipAtom,
  relationshipsDataAtom,
  userAtom,
  showCreateDBModalAtom,
  showDeleteDBModalAtom,
  deleteTargetDBIdAtom,
} from "../atoms/atoms";

import useGetAllDatabases from "../apis/useGetAllDatabases";

import Button from "./shared/Button";
import CreateDBModal from "./Modals/CreateNewDatabase/CreateDBModal";
import DeleteDBModal from "./Modals/DeleteDatabase/DeleteDBModal";

function Sidebar() {
  const queryClient = useQueryClient();
  const { username } = useAtomValue(userAtom);
  const [currentDBId, setCurrentDBId] = useAtom(currentDBIdAtom);
  const [showDeleteDBModal, setShowDeleteDBModal] = useAtom(
    showDeleteDBModalAtom,
  );
  const setDeleteTargetDBId = useSetAtom(deleteTargetDBIdAtom);
  const [showCreateDBModal, setShowCreateDBModal] = useAtom(
    showCreateDBModalAtom,
  );

  const setCurrentDBName = useSetAtom(currentDBNameAtom);
  const setCurrentDocIndex = useSetAtom(currentDocIndexAtom);
  const setRelationshipsData = useSetAtom(relationshipsDataAtom);

  const databases = useAtomValue(databasesAtom);
  const isEditMode = useAtomValue(isEditModeAtom);
  const isRelationship = useAtomValue(isRelationshipAtom);

  useGetAllDatabases();

  function clickHandleDelete(targetId) {
    setDeleteTargetDBId(targetId);
    setShowDeleteDBModal(true);
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

      queryClient.refetchQueries(["SingleDatabase", clickedDBId]);
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
            onClick={() => clickHandleDelete(element._id)}
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
      {showCreateDBModal && <CreateDBModal />}
      {showDeleteDBModal && <DeleteDBModal databases={databases} />}
    </div>
  );
}

export default Sidebar;
