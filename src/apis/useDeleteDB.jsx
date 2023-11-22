import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom, useAtomValue } from "jotai";

import fetchData from "../utils/axios";

import {
  databasesAtom,
  currentDBIdAtom,
  currentDBNameAtom,
  userAtom,
  currentDocIndexAtom,
  showDeleteDBModalAtom,
} from "../atoms/atoms";

import Loading from "../components/shared/Loading";

function useDeleteDB() {
  const queryClient = useQueryClient();

  const { userId } = useAtomValue(userAtom);
  const databases = useAtomValue(databasesAtom);

  const setCurrentDBId = useSetAtom(currentDBIdAtom);
  const setCurrentDBName = useSetAtom(currentDBNameAtom);
  const setCurrentDocIndex = useSetAtom(currentDocIndexAtom);
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

  return fetchDeleteDB;
}

export default useDeleteDB;
