import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

import fetchData from "../../utils/axios";

import UserContext from "../../context/UserContext";
import CurrentDBIdContext from "../../context/CurrentDBIdContext";
import ModalLabel from "./ModalLabel";
import ModalInputArea from "./ModalInputArea";

function AddDocumentListSection({ updateFieldValue, setFields }) {
  const { userId } = useContext(UserContext);
  const currentDBId = useContext(CurrentDBIdContext);

  async function getDatabase() {
    const response = await fetchData(
      "GET",
      `users/${userId}/databases/${currentDBId}`,
    );

    return response.data.database.documents[0];
  }

  const { data, isLoading } = useQuery(["userDb", currentDBId], getDatabase, {
    enabled: !!user && !!currentDBId,
    onSuccess: result => {
      setFields(result.fields);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return data.fields.map((element, index) => {
    return (
      <div key={element._id} className="flex">
        <div className="w-[130px]">
          <ModalLabel value={element.fieldName} />
        </div>
        <div className="flex justify-center items-center px-3">
          <ModalInputArea>
            <div className="flex flex-row justify-center items-center">
              <textarea
                className="flex h-7 w-[300px] rounded-md text-center"
                onChange={event => updateFieldValue(index, event)}
              />
            </div>
          </ModalInputArea>
        </div>
      </div>
    );
  });
}

AddDocumentListSection.propTypes = {};

export default AddDocumentListSection;
