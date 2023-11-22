import { useSetAtom } from "jotai";

import { showAddDocumentModalAtom } from "../../../atoms/atoms";
import useMutatePostDocument from "../../../apis/useMutatePostDocument";

import Button from "../../shared/Button";
import Modal from "../../shared/Modal";
import Title from "../SharedItems/Title";
import AddDocInputList from "./AddDocInputList";
import ContentWrapper from "../SharedItems/ContentWrapper";
import Content from "../SharedItems/Content";
import InputsArea from "../SharedItems/InputsArea";

function AddDocumentModal() {
  const fetchNewDocument = useMutatePostDocument();
  const setShowAddDocumentModal = useSetAtom(showAddDocumentModalAtom);

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
          onClick={() => fetchNewDocument()}
        >
          Submit
        </Button>
      </ContentWrapper>
    </Modal>
  );
}

export default AddDocumentModal;
