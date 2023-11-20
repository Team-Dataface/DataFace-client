import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import {
  currentDBIdAtom,
  isEditModeAtom,
  isOnSaveAtom,
  documentsIdsAtom,
  userAtom,
} from "../../../atoms/atoms";

import fetchData from "../../../utils/axios";
import useLoading from "../../../utils/useLoading";

import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Loading from "../../shared/Loading";

function ListView() {
  const queryClient = useQueryClient();

  const [changedDoc, setChangedDoc] = useState([]);

  const [isOnSave, setIsOnSave] = useAtom(isOnSaveAtom);

  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);
  const isEditMode = useAtomValue(isEditModeAtom);

  const setDocumentsIds = useSetAtom(documentsIdsAtom);

  async function getDocumentsList() {
    const response = await fetchData(
      "GET",
      `users/${userId}/databases/${currentDBId}`,
    );

    return response.data.database;
  }

  const { data, isLoading: isQueryLoading } = useQuery(
    ["dbDocumentList", currentDBId],
    getDocumentsList,
    {
      enabled: !!userId,
      staleTime: Infinity,
      onSuccess: result => {
        const documentsId = [];

        const docs = result.documents.map(document => {
          documentsId.push(document._id);

          return { documentId: document._id, fields: [] };
        });

        setChangedDoc(docs);
        setDocumentsIds(documentsId);
      },
      onFailure: () => {
        console.log("sending user to errorpage");
      },
    },
  );

  async function handleClickSave() {
    await fetchData(
      "PUT",
      `/users/${userId}/databases/${currentDBId}/documents`,
      changedDoc,
    );
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

  const loadingTimeout = useLoading(isQueryLoading);

  if (loadingTimeout) {
    return <Loading />;
  }

  if (!isEditMode && isOnSave) {
    fetchDocumentUpdate();
    setIsOnSave(false);
  }

  return (
    <div
      className={`relative flex w-full h-[calc(100vh-145px)] p-3 bg-white drop-shadow-md overflow-y-auto
      ${isEditMode && "ring-4 ring-blue"}`}
    >
      <table className="border-collapse w-full max-h-20 overflow-y-auto">
        <TableHead fields={data.documents[0].fields} />
        <TableBody
          documents={data.documents}
          changedDoc={changedDoc}
          setChangedDoc={setChangedDoc}
        />
      </table>
    </div>
  );
}

export default ListView;
