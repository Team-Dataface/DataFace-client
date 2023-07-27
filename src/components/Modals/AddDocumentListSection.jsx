import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";

import fetchData from "../../utils/axios";

import ModalLabel from "./ModalLabel";
import ModalInputArea from "./ModalInputArea";

function AddDocumentListSection({
  user,
  updateFieldValue,
  currentDBId,
  setFields,
}) {
  async function getDatabase() {
    const response = await fetchData(
      "GET",
      `users/${user.userId}/databases/${currentDBId}`,
    );

    return response.data.database.documents[0];
  }

  const { data, isLoading } = useQuery(["userDb"], getDatabase, {
    enabled: !!user,
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
      <div key={element.field_id} className="flex">
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
