import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useSetAtom, useAtomValue } from "jotai";

import {
  isEditModeAtom,
  isOnSaveAtom,
  isRelationshipAtom,
  userAtom,
  currentDBIdAtom,
  changedDocAtom,
} from "../../atoms/atoms";

import fetchData from "../../utils/axios";

import Button from "../shared/Button";

function SaveButton() {
  const queryClient = useQueryClient();

  const [isEditMode, setIsEditMode] = useAtom(isEditModeAtom);
  const setIsOnSave = useSetAtom(isOnSaveAtom);

  const isRelationship = useAtomValue(isRelationshipAtom);
  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);
  const changedDoc = useAtomValue(changedDocAtom);

  async function handleClickSave() {
    await fetchData(
      "PUT",
      `/users/${userId}/databases/${currentDBId}/documents`,
      changedDoc,
    );
  }

  const { mutate: fetchDocumentUpdate } = useMutation(handleClickSave, {
    onSuccess: () => {
      queryClient.refetchQueries(["dbDocumentList", currentDBId]);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div
      className={`flex w-20 justify-center items-center
    ${isRelationship && "hidden"}`}
    >
      <Button
        className={`w-20 h-8 rounded-md bg-white
        ${isEditMode ? "ring-4 ring-blue hover:bg-blue" : ""}`}
        onClick={() => {
          if (isEditMode) {
            fetchDocumentUpdate();
            setIsOnSave(false);
          }
          setIsEditMode(!isEditMode);
        }}
      >
        {isEditMode ? "Save" : "Edit"}
      </Button>
    </div>
  );
}

export default SaveButton;
