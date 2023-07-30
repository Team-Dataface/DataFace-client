/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import fetchData from "../../../utils/axios";

import UserContext from "../../../context/UserContext";
import CurrentDBIdContext from "../../../context/CurrentDBIdContext";
import Content from "../SharedItems/Content";
import Title from "../SharedItems/Title";
import Button from "../../shared/Button";
import Message from "../SharedItems/Message";
import Loading from "../../shared/Loading";

function StepOne({
  setRelationshipStep,
  databaseName,
  relationData,
  setRelationData,
}) {
  const [targetDatabases, setTargetDatabases] = useState([]);
  const [isSelected, setIsSelected] = useState("");

  const { userId } = useContext(UserContext);
  const currentDBId = useContext(CurrentDBIdContext);

  async function getDatabaseList() {
    const response = await fetchData("GET", `users/${userId}/databases`);

    return response.data.databases;
  }

  const { isLoading } = useQuery(["dbs"], getDatabaseList, {
    enabled: !!userId,
    onSuccess: result => {
      const filteredDbs = result.filter(
        database => database._id !== currentDBId,
      );

      setTargetDatabases(filteredDbs);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  function handleNextClick() {
    if (!relationData.foreignDbId) {
      alert("Please choose database to make relationship!");

      return;
    }

    setRelationshipStep("stepTwo");
  }

  function handleDatabaseClick(id) {
    setIsSelected(id);

    setRelationData({
      ...relationData,
      foreignDbId: id,
    });
  }

  return (
    <>
      <Title>Step 1</Title>
      <Message>
        <p>Please choose a database that you would like to link with DBNAME</p>
      </Message>
      <Content>
        <div className="flex flex-col justify-around items-center h-auto w-60">
          <div className="flex border-2 rounded-lg justify-center items-center w-full p-2 bg-blue bg-opacity-50">
            <p>{databaseName}</p>
          </div>
          <div className="border border-blue border-dashed h-16"></div>
          <div className="flex flex-col border-2 rounded-lg items-center w-full max-h-[190px] overflow-y-scroll">
            <ul className="w-full h-auto text-center">
              {targetDatabases.map((database, index) => (
                <li
                  className={`w-full py-1 border-b-2 border-grey
                  ${isSelected === database._id ? "bg-yellow" : ""}
                  ${index === targetDatabases.length - 1 ? "border-b-0" : ""}`}
                  key={database._id}
                  onClick={() => handleDatabaseClick(database._id)}
                >
                  {database.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Content>
      <div className="flex justify-end items-center w-full">
        <Button
          className="w-20 h-8 mt-5 rounded-md ring-2 ring-blue text-blue hover:bg-blue hover:text-white"
          onClick={handleNextClick}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default StepOne;
