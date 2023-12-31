import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import {
  userAtom,
  currentDBIdAtom,
  changedDocAtom,
  currentViewAtom,
  documentsDataAtom,
  currentDocIndexAtom,
  relationshipsDataAtom,
} from "../atoms/atoms";

import fetchData from "../utils/axios";

function usePutSaveChangedData() {
  const queryClient = useQueryClient();
  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);
  const changedDoc = useAtomValue(changedDocAtom);
  const currentView = useAtomValue(currentViewAtom);
  const documentsData = useAtomValue(documentsDataAtom);
  const currentDocIndex = useAtomValue(currentDocIndexAtom);
  const relationshipsData = useAtomValue(relationshipsDataAtom);

  async function handleClickSave() {
    if (currentView === "list") {
      await fetchData(
        "PUT",
        `/users/${userId}/databases/${currentDBId}/documents`,
        changedDoc,
      );

      return;
    }

    await fetchData(
      "PUT",
      `/users/${userId}/databases/${currentDBId}/documents/${documentsData[currentDocIndex]._id}`,
      { fields: documentsData[currentDocIndex].fields },
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
      if (relationshipsData?.length) {
        relationshipsData.forEach(relationship => {
          queryClient.refetchQueries([
            "ForeignDocuments",
            currentDBId,
            currentDocIndex,
            relationship._id,
          ]);
        });
      }

      queryClient.refetchQueries(["SingleDatabase", currentDBId]);
    },
    refetchOnWindowFocus: false,
  });

  return fetchSaveChangedData;
}

export default usePutSaveChangedData;
