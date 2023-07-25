import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import PropTypes from "prop-types";
import fetchData from "../utils/axios";

import Button from "./shared/Button";
import CreateDBModal from "./Modals/CreateDBModal";

function Sidebar({ user, currentDBId, setCurrentDBId }) {
  const queryClient = useQueryClient();
  const [firstDatabaseId, setFirstDatabaseId] = useState("");
  const [showCreateDBModal, setShowCreateDBModal] = useState(false);

  useEffect(() => {
    setCurrentDBId(firstDatabaseId);
  }, [firstDatabaseId]);

  async function deleteDatabase(databaseId) {
    await fetchData("DELETE", `/users/${user}/databases/${databaseId}`);
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
    const response = await fetchData("GET", `users/${user}/databases`);

    return response;
  }

  const { data, isLoading } = useQuery(["userDbList"], getDatabaseList, {
    enabled: !!user,
    onSuccess: () => {
      setFirstDatabaseId(data.data.databases[0]._id);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

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

    return data.data.databases.map(element => {
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
            onClick={() => setCurrentDBId(element._id)}
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
          <p className="font-bold">{data.data.user.username}</p>
        </div>
        <ul className="mb-3">{renderDatabaseList()}</ul>
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
