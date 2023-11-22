import { useAtom, useSetAtom } from "jotai";

import {
  showDeleteDocumentModalAtom,
  isLastDocumentAtom,
} from "../../../atoms/atoms";

import useMutateDeleteDocument from "../../../apis/useMutateDeleteDocument";

import Modal from "../../shared/Modal";
import Button from "../../shared/Button";
import Content from "../SharedItems/Content";
import ContentWrapper from "../SharedItems/ContentWrapper";
import Message from "../SharedItems/Message";

function DeleteDocModal() {
  const [isLastDocument, setIsLastDocument] = useAtom(isLastDocumentAtom);
  const setShowDeleteDocumentModal = useSetAtom(showDeleteDocumentModalAtom);
  const fetchDeleteDocument = useMutateDeleteDocument();

  function clickHandleCancel() {
    setShowDeleteDocumentModal(false);
    setIsLastDocument(false);
  }

  return (
    <Modal onClick={() => setShowDeleteDocumentModal(false)}>
      <ContentWrapper>
        <Content>
          <Message>
            {!isLastDocument
              ? "Are you sure you want to permanently delete this document?"
              : "Please ensure that the database contains at least one document before proceeding"}
          </Message>
        </Content>
        <div className="flex justify-evenly items-center w-full">
          <Button
            className="w-20 h-8 rounded-md bg-black-bg text-white hover:bg-dark-grey"
            onClick={clickHandleCancel}
          >
            Cancel
          </Button>
          {!isLastDocument && (
            <Button
              className="w-20 h-8 rounded-md bg-red text-white hover:bg-red-hover"
              onClick={() => fetchDeleteDocument()}
            >
              Delete
            </Button>
          )}
        </div>
      </ContentWrapper>
    </Modal>
  );
}

export default DeleteDocModal;
