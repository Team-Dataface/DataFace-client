import { useSetAtom, useAtomValue } from "jotai";
import {
  showDeleteDBModalAtom,
  deleteTargetDBIdAtom,
} from "../../../atoms/atoms";

import Modal from "../../shared/Modal";
import Button from "../../shared/Button";
import Content from "../SharedItems/Content";
import ContentWrapper from "../SharedItems/ContentWrapper";
import Message from "../SharedItems/Message";
import useDeleteDB from "../../../apis/useDeleteDB";

function DeleteDBModal() {
  const deleteTargetDBId = useAtomValue(deleteTargetDBIdAtom);
  const setShowDeleteDBModal = useSetAtom(showDeleteDBModalAtom);

  const fetchDeleteDB = useDeleteDB();

  return (
    <Modal onClick={() => setShowDeleteDBModal(false)}>
      <ContentWrapper>
        <Content>
          <Message>
            <span>
              Are you sure you want to permanently delete this database?
            </span>
          </Message>
        </Content>
        <div className="flex justify-evenly items-center w-full">
          <Button
            className="w-20 h-8 rounded-md bg-black-bg text-white hover:bg-dark-grey"
            onClick={() => setShowDeleteDBModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="w-20 h-8 rounded-md bg-red text-white hover:bg-red-hover"
            onClick={() => fetchDeleteDB(deleteTargetDBId)}
          >
            Delete
          </Button>
        </div>
      </ContentWrapper>
    </Modal>
  );
}

export default DeleteDBModal;
