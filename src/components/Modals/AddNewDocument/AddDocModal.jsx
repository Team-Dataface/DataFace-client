import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useSetAtom, useAtomValue } from "jotai";

import fetchData from "../../../utils/axios";

import {
  currentDBIdAtom,
  currentDocIndexAtom,
  documentsIdsAtom,
  userAtom,
  showAddDocumentModalAtom,
  fieldsAtom,
} from "../../../atoms/atoms";

import Button from "../../shared/Button";
import Modal from "../../shared/Modal";
import Title from "../SharedItems/Title";
import AddDocInputList from "./AddDocInputList";
import ContentWrapper from "../SharedItems/ContentWrapper";
import Content from "../SharedItems/Content";
import InputsArea from "../SharedItems/InputsArea";
import Loading from "../../shared/Loading";

function AddDocumentModal() {
  const queryClient = useQueryClient();

  const [documentsIds, setDocumentsIds] = useAtom(documentsIdsAtom);

  const { userId } = useAtomValue(userAtom);
  const fields = useAtomValue(fieldsAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);

  const setCurrentDocIndex = useSetAtom(currentDocIndexAtom);
  const setShowAddDocumentModal = useSetAtom(showAddDocumentModalAtom);

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
        setShowAddDocumentModal(false);
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
    <Modal onClick={() => setShowAddDocumentModal(false)}>
      <ContentWrapper>
        <Title>Add New Document</Title>
        <Content>
          <InputsArea>
            <AddDocInputList />
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

export default AddDocumentModal;
