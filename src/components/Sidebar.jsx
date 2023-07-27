import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import PropTypes from "prop-types";
import fetchData from "../utils/axios";

import Button from "./shared/Button";
import CreateDBModal from "./Modals/CreateDBModal";

function Sidebar({ user, currentDBId, setCurrentDBId, setDocumentsIds }) {
  const queryClient = useQueryClient();
  const [showCreateDBModal, setShowCreateDBModal] = useState(false);

  async function deleteDatabase(databaseId) {
    await fetchData("DELETE", `/users/${user.userId}/databases/${databaseId}`);
  }

  const { mutate: fetchDeleteDB } = useMutation(deleteDatabase, {
    onSuccess: () => {
      queryClient.refetchQueries(["userDbList"]);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  async function getDatabaseList() {
    const response = await fetchData("GET", `users/${user.userId}/databases`);

    return response.data.databases;
  }

  const { data: databases, isLoading } = useQuery(
    ["userDbList"],
    getDatabaseList,
    {
      enabled: !!user,
      onSuccess: result => {
        if (result.length) {
          setCurrentDBId(result[0]._id);
        } else {
          setCurrentDBId("");
        }
      },
      onFailure: () => {
        console.log("sending user to errorpage");
      },
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  function renderDatabaseList() {
    function isActive(id) {
      if (currentDBId === id) {
        return true;
      }

      return false;
    }

    function switchDatabase(clickedDatabaseId) {
      setCurrentDBId(clickedDatabaseId);
      queryClient.refetchQueries(["userDb"]);
    }

    return databases.map(element => {
      return (
        <div
          key={element._id}
          className={`
            flex justify-between items-center w-full hover:bg-grey
            ${isActive(element._id) ? "bg-yellow" : ""}
            `}
        >
          <Button
            className="w-full"
            onClick={() => switchDatabase(element._id)}
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
          <Button onClick={() => fetchDeleteDB(element._id)}>
            <img className="mr-2" src="/assets/bin_icon.svg" alt="bin icon" />
          </Button>
        </div>
      );
    });
  }

  return (
    <div className="flex flex-col items-center min-w-[250px] p-2 bg-light-grey">
      <div className="flex flex-col w-full">
        <div className="flex h-10 ml-2 items-center">
          <img className="mr-2" src="/assets/DB_icon.svg" alt="DB icon" />
          <p className="font-bold">{user.username}</p>
        </div>
        {databases ? <ul className="mb-3">{renderDatabaseList()}</ul> : null}
      </div>
      <div className="flex justify-center">
        <Button
          className="flex justify-center w-48 text-sm items-center rounded-full text-white bg-black-bg hover:bg-dark-grey"
          onClick={() => setShowCreateDBModal(true)}
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
        <CreateDBModal
          user={user}
          closeModal={() => setShowCreateDBModal(false)}
          setCurrentDBId={setCurrentDBId}
        />
      )}
    </div>
  );
}

Sidebar.propTypes = {
  user: PropTypes.string.isRequired,
  setCurrentDBId: PropTypes.func.isRequired,
};

export default Sidebar;
