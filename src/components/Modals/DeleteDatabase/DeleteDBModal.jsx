import { useSetAtom, useAtomValue } from "jotai";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetchData from "../../../utils/axios";
import {
  currentDBIdAtom,
  currentDBNameAtom,
  userAtom,
  currentDocIndexAtom,
  showDeleteDBModalAtom,
  deleteTargetDBIdAtom,
} from "../../../atoms/atoms";

import Modal from "../../shared/Modal";
import Button from "../../shared/Button";
import Content from "../SharedItems/Content";
import ContentWrapper from "../SharedItems/ContentWrapper";
import Message from "../SharedItems/Message";
import Loading from "../../shared/Loading";

function DeleteDBModal({ databases }) {
  const queryClient = useQueryClient();

  const { userId } = useAtomValue(userAtom);
  const deleteTargetDBId = useAtomValue(deleteTargetDBIdAtom);

  const setCurrentDBId = useSetAtom(currentDBIdAtom);
  const setCurrentDBName = useSetAtom(currentDBNameAtom);
  const setShowDeleteDBModal = useSetAtom(showDeleteDBModalAtom);
  const setCurrentDocIndex = useSetAtom(currentDocIndexAtom);

  async function deleteDatabase(databaseId) {
    const response = await fetchData(
      "DELETE",
      `/users/${userId}/databases/${databaseId}`,
    );

    return response.data.databases;
  }

  const { mutate: fetchDeleteDB, isLoading } = useMutation(deleteDatabase, {
    onSuccess: result => {
      if (databases.length === 1) {
        setCurrentDocIndex(0);
        setCurrentDBName("");
      } else {
        setCurrentDBId(result[0]._id);
        setCurrentDBName(result[0].name);
      }

      setShowDeleteDBModal(false);
      queryClient.refetchQueries(["userDbList"]);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
      setShowDeleteDBModal(false);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

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
