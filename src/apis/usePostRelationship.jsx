import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import fetchData from "../utils/axios";
import { currentDBIdAtom, userAtom } from "../atoms/atoms";

import Loading from "../components/shared/Loading";

function usePostRelationship() {
  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);
  const queryClient = useQueryClient();

  async function setRelationShip(updatedRelationData) {
    await fetchData(
      "POST",
      `/users/${userId}/databases/${currentDBId}/relationships`,
      updatedRelationData,
    );
  }

  const { mutate: fetchNewRelationship, isLoading } = useMutation(
    setRelationShip,
    {
      onSuccess: () => {
        queryClient.refetchQueries(["SingleDatabase", currentDBId]);
      },
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  return fetchNewRelationship;
}

export default usePostRelationship;
