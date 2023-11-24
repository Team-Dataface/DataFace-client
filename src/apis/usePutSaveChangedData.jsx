import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import {
  userAtom,
  currentDBIdAtom,
  changedDocAtom,
  isListViewAtom,
  docDataAtom,
  currentDocIndexAtom,
  relationshipsDataAtom,
} from "../atoms/atoms";

import fetchData from "../utils/axios";

function usePutSaveChangedData() {
  const queryClient = useQueryClient();
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

  const { mutate: fetchSaveChangedData } = useMutation(handleClickSave, {
    onSuccess: () => {
      queryClient.refetchQueries([
        "ForeignDocuments",
        currentDBId,
        currentDocIndex,
        0,
      ]);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  return fetchSaveChangedData;
}

export default usePutSaveChangedData;
