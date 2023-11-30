import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom, useAtomValue } from "jotai";

import fetchData from "../utils/axios";

import {
  currentDBIdAtom,
  currentDBNameAtom,
  userAtom,
  showDeleteDBModalAtom,
} from "../atoms/atoms";

import Loading from "../components/shared/Loading";

function useDeleteDB() {
  const queryClient = useQueryClient();

  const { userId } = useAtomValue(userAtom);

  const setCurrentDBId = useSetAtom(currentDBIdAtom);
  const setCurrentDBName = useSetAtom(currentDBNameAtom);
  const setShowDeleteDBModal = useSetAtom(showDeleteDBModalAtom);

  async function deleteDatabase(databaseId) {
    const response = await fetchData(
      "DELETE",
      `/users/${userId}/databases/${databaseId}`,
    );

    return response.data.databases;
  }

  const { mutate: fetchDeleteDB, isLoading } = useMutation(deleteDatabase, {
    onSuccess: result => {
      if (result.length) {
        setCurrentDBId(result[0]._id);
        setCurrentDBName(result[0].name);
      }

      setShowDeleteDBModal(false);
      queryClient.refetchQueries(["userDbList"]);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return fetchDeleteDB;
}

export default useDeleteDB;
