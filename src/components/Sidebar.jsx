import { useQuery } from "@tanstack/react-query";
import Proptypes from "prop-types";

import fetchData from "../utils/axios";

import Button from "./shared/Button";

function Sidebar({ user, toggleModal }) {
  async function getDatabaseList() {
    const response = await fetchData("GET", `users/${user}/databases`);

    return response;
  }

  const { data, isLoading } = useQuery(["userDbList"], getDatabaseList, {
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  function test(id) {
    console.log(`database id: ${id}`);
  }

  function renderDatabaseList() {
    return data.data.databases.map(element => {
      return (
        <Button
          key={element._id}
          className="flex justify-between items-center w-full  hover:bg-grey active:bg-yellow"
          onClick={() => test(element._id)}
        >
          <div className="flex">
            <img
              className="ml-6 mr-2"
              src="/assets/folder_icon.svg"
              alt="folder icon"
            />
            <span>{element.name}</span>
          </div>
          <img
            className="ml-6 mr-2"
            src="/assets/bin_icon.svg"
            alt="bin icon"
          />
        </Button>
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
          onClick={toggleModal}
        >
          <img
            className="flex justify-between items-center mr-2 w-4"
            src="/assets/add_icon.svg"
            alt="add icon"
          />
          New Database
        </Button>
      </div>
    </div>
  );
}

Sidebar.proptTypes = {
  user: Proptypes.string.isRequired,
};

export default Sidebar;
