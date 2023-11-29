import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom, useAtomValue } from "jotai";
import fetchData from "../utils/axios";

import {
  currentDBIdAtom,
  isListViewAtom,
  currentDBNameAtom,
  userAtom,
  showCreateDBModalAtom,
  createDBFieldsAtom,
} from "../atoms/atoms";
import Loading from "../components/shared/Loading";

function usePostDB() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userId } = useAtomValue(userAtom);

  const setIsListView = useSetAtom(isListViewAtom);
  const setCurrentDBId = useSetAtom(currentDBIdAtom);
  const setCurrentDBName = useSetAtom(currentDBNameAtom);
  const setShowCreateDBModal = useSetAtom(showCreateDBModalAtom);
  const setCreateDBFields = useSetAtom(createDBFieldsAtom);

  async function fetchDatabase(newDatabase) {
    const response = await fetchData(
      "POST",
      `/users/${userId}/databases`,
      newDatabase,
    );

    return response;
  }

  const { mutate: fetchNewDatabase, isLoading } = useMutation(fetchDatabase, {
    onSuccess: result => {
      setCurrentDBId(result.data.newDatabase._id);
      setCurrentDBName(result.data.newDatabase.name);
      setIsListView(true);
      setCreateDBFields([
        {
          id: crypto.randomUUID(),
          fieldName: "",
          fieldType: "Text",
        },
      ]);

      queryClient.refetchQueries(["userDbList"]);

      navigate("/dashboard/listview");

      setShowCreateDBModal(false);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return fetchNewDatabase;
}

export default usePostDB;
