import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";

import {
  isEditModeAtom,
  isRelationshipAtom,
  userAtom,
  currentDBIdAtom,
  changedDocAtom,
  isListViewAtom,
  docDataAtom,
  currentDocIndexAtom,
  relationshipsDataAtom,
} from "../../atoms/atoms";

import fetchData from "../../utils/axios";

import Button from "../shared/Button";

function SaveButton() {
  const queryClient = useQueryClient();

  const [isEditMode, setIsEditMode] = useAtom(isEditModeAtom);

  const isRelationship = useAtomValue(isRelationshipAtom);
  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);
  const changedDoc = useAtomValue(changedDocAtom);
  const isListview = useAtomValue(isListViewAtom);
  const docData = useAtomValue(docDataAtom);
  const currentDocIndex = useAtomValue(currentDocIndexAtom);
  const relationshipsData = useAtomValue(relationshipsDataAtom);

  async function handleClickSave() {
    if (isListview) {
      await fetchData(
        "PUT",
        `/users/${userId}/databases/${currentDBId}/documents`,
        changedDoc,
      );

      return;
    }

    await fetchData(
      "PUT",
      `/users/${userId}/databases/${currentDBId}/documents/${docData[currentDocIndex]._id}`,
      { fields: docData[currentDocIndex].fields },
    );

    if (relationshipsData?.length) {
      await fetchData(
        "PUT",
        `/users/${userId}/databases/${currentDBId}/relationships`,
        relationshipsData,
      );
    }
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
