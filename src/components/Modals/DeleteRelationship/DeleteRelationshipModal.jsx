import { useSetAtom } from "jotai";

import { showDeleteRelationshipModalAtom } from "../../../atoms/atoms";
import useDeleteRelationship from "../../../apis/useDeleteRelationship";

import Modal from "../../shared/Modal";
import Button from "../../shared/Button";
import Content from "../SharedItems/Content";
import ContentWrapper from "../SharedItems/ContentWrapper";
import Message from "../SharedItems/Message";

function DeleteRelationshipModal() {
  const setShowDeleteRelationshipModal = useSetAtom(
    showDeleteRelationshipModalAtom,
  );
  const fetchDeleteRelationship = useDeleteRelationship();

  return (
    <Modal onClick={() => setShowDeleteRelationshipModal(false)}>
      <ContentWrapper>
        <Content>
          <Message>
            <span>
              Deleting this portal will also remove the existing relationships.
              Are you sure you want to proceed?
            </span>
          </Message>
        </Content>
        <div className="flex justify-evenly items-center w-full">
          <Button
            className="w-20 h-8 rounded-md bg-black-bg text-white hover:bg-dark-grey"
            onClick={() => setShowDeleteRelationshipModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="w-20 h-8 rounded-md bg-red text-white hover:bg-red-hover"
            onClick={() => fetchDeleteRelationship()}
          >
            Delete
          </Button>
        </div>
      </ContentWrapper>
    </Modal>
  );
}

export default DeleteRelationshipModal;
