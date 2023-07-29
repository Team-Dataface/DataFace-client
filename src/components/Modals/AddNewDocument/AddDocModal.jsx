import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import fetchData from "../../../utils/axios";

import UserContext from "../../../context/UserContext";
import CurrentDBIdContext from "../../../context/CurrentDBIdContext";
import Button from "../../shared/Button";
import Modal from "../../shared/Modal";
import Title from "../SharedItems/Title";
import AddDocInputList from "./AddDocInputList";
import ContentWrapper from "../SharedItems/ContentWrapper";
import Content from "../SharedItems/Content";
import InputsArea from "../SharedItems/InputsArea";

function AddDocumentModal({
  closeModal,
  setDocumentsIds,
  setCurrentDocIndex,
  documentsIds,
}) {
  const queryClient = useQueryClient();

  const { userId } = useContext(UserContext);
  const currentDBId = useContext(CurrentDBIdContext);

  const [fields, setFields] = useState([]);

  function updateFieldValue(index, event) {
    const newArr = [...fields];
    newArr[index].fieldValue = event.target.value;
    setFields(newArr);
  }

  function addNewDocumentId(newId) {
    const newArr = [...documentsIds];

    newArr.push(newId);
    setDocumentsIds(newArr);
  }

  async function handleClickSave() {
    const response = await fetchData(
      "POST",
      `/users/${userId}/databases/${currentDBId}/documents`,
      fields,
    );

    return response.data.newDocument._id;
  }

  const { mutate: fetchDocumentSave } = useMutation(handleClickSave, {
    onSuccess: result => {
      queryClient.refetchQueries(["dbDocumentList"]);
      closeModal();

      addNewDocumentId(result);
      setCurrentDocIndex(documentsIds.length);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  return (
    <Modal onClick={closeModal}>
      <ContentWrapper>
        <Title value="Add New Document" />
        <Content>
          <InputsArea>
            <AddDocInputList
              updateFieldValue={updateFieldValue}
              currentDBId={currentDBId}
              setFields={setFields}
            />
          </InputsArea>
        </Content>
        <Button
          className="w-20 h-8 mt-5 rounded-md bg-black-bg text-white hover:bg-dark-grey"
          onClick={fetchDocumentSave}
        >
          Submit
        </Button>
      </ContentWrapper>
    </Modal>
  );
}

AddDocumentModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default AddDocumentModal;