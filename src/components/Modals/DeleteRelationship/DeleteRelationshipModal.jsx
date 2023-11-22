import { useSetAtom, useAtomValue } from "jotai";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetchData from "../../../utils/axios";
import {
  currentDBIdAtom,
  userAtom,
  showDeleteRelationshipModalAtom,
  deleteTargetRelationshipAtom,
} from "../../../atoms/atoms";

import Modal from "../../shared/Modal";
import Button from "../../shared/Button";
import Content from "../SharedItems/Content";
import ContentWrapper from "../SharedItems/ContentWrapper";
import Message from "../SharedItems/Message";
import Loading from "../../shared/Loading";

function DeleteRelationshipModal() {
  const queryClient = useQueryClient();

  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);
  const deleteTargetRelationship = useAtomValue(deleteTargetRelationshipAtom);

  const setShowDeleteRelationshipModal = useSetAtom(
    showDeleteRelationshipModalAtom,
  );

  async function deleteRelationship() {
    await fetchData(
      "DELETE",
      `/users/${userId}/databases/${currentDBId}/relationships/${deleteTargetRelationship}`,
    );
  }

  const { mutate: fetchDeleteRelationship, isLoading } = useMutation(
    deleteRelationship,
    {
      onSuccess: () => {
        queryClient.refetchQueries(["dbDocumentList", currentDBId]);
        queryClient.refetchQueries(["dbRelationShips", currentDBId]);
        setShowDeleteRelationshipModal(false);
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
