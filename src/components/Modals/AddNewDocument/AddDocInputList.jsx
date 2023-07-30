import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

import fetchData from "../../../utils/axios";

import UserContext from "../../../context/UserContext";
import CurrentDBIdContext from "../../../context/CurrentDBIdContext";
import InputWrapper from "../SharedItems/InputWrapper";
import Loading from "../../shared/Loading";

function AddDocInputList({ updateFieldValue, setFields }) {
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
    enabled: !!userId && !!currentDBId,
    onSuccess: result => {
      setFields(result.fields);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  return data.fields.map((element, index) => {
    return (
      <div key={element._id} className="flex w-[500px]">
        <span
          className="flex justify-end items-center w-[150px] mr-3 text-right"
          type="text"
        >
          {element.fieldName}
        </span>
        <InputWrapper>
          <textarea
            className="flex w-full h-7 rounded-md text-center"
            onChange={event => updateFieldValue(index, event)}
          />
        </InputWrapper>
      </div>
    );
  });
}

AddDocInputList.propTypes = {
  updateFieldValue: PropTypes.func.isRequired,
  setFields: PropTypes.func.isRequired,
};

export default AddDocInputList;
