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

function useDeleteRelationship() {
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
        queryClient.refetchQueries(["DocumentsList", currentDBId]);
        queryClient.refetchQueries(["Relationships", currentDBId]);
        setShowDeleteRelationshipModal(false);
      },
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  return fetchDeleteRelationship;
}

export default useDeleteRelationship;
