import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom, useAtomValue } from "jotai";

import fetchData from "../utils/axios";

import {
  currentDBIdAtom,
  userAtom,
  showDeleteRelationshipModalAtom,
  deleteTargetRelationshipAtom,
} from "../atoms/atoms";

import Loading from "../components/shared/Loading";

function useMutateDeleteRelationship() {
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

  return fetchDeleteRelationship;
}

export default useMutateDeleteRelationship;
