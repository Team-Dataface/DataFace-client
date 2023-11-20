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
import Loading from "../../shared/Loading";

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

  function adjustTextareaHeight(event) {
    event.target.style.height = `${event.target.scrollHeight}px`;
  }

  function updateFieldValue(index, event) {
    const newFields = [...fields];

    newFields[index].fieldValue = event.target.value;

    setFields(newFields);
    adjustTextareaHeight(event);
  }

  function addNewDocumentId(newId) {
    const newFields = [...documentsIds];

    newFields.push(newId);
    setDocumentsIds(newFields);
  }

  async function handleClickSave() {
    const response = await fetchData(
      "POST",
      `/users/${userId}/databases/${currentDBId}/documents`,
      fields,
    );

    return response.data.newDocument._id;
  }

  const { mutate: fetchDocumentSave, isLoading } = useMutation(
    handleClickSave,
    {
      onSuccess: result => {
        addNewDocumentId(result);
        setCurrentDocIndex(documentsIds.length);

        queryClient.refetchQueries(["dbDocumentList", currentDBId]);
        closeModal();
      },
      onFailure: () => {
        console.log("sending user to errorpage");
      },
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Modal onClick={closeModal}>
      <ContentWrapper>
        <Title>Add New Document</Title>
        <Content>
          <InputsArea>
            <AddDocInputList
              updateFieldValue={updateFieldValue}
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
