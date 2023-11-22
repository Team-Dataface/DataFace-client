import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import fetchData from "../utils/axios";
import { currentDBIdAtom, userAtom } from "../atoms/atoms";

function useMutateRelationship() {
  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);

  async function setRelationShip(updatedRelationData) {
    await fetchData(
      "POST",
      `/users/${userId}/databases/${currentDBId}/relationships`,
      updatedRelationData,
    );
  }

  const { mutate: fetchNewRelationship } = useMutation(setRelationShip, {
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  return fetchNewRelationship;
}

export default useMutateRelationship;
