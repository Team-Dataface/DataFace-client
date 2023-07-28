import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import fetchData from "../../../utils/axios";

import TableHead from "./TableHead";
import TableBody from "./TableBody";

function ListView({
  user,
  currentDBId,
  isEditMode,
  setIsEditMode,
  currentDocIndex,
  setDocumentsIds,
}) {
  const [changedDoc, setChangedDoc] = useState([]);
  const [isOnSave, setIsOnSave] = useState(false);
  const queryClient = useQueryClient();

  async function getDocumentsList() {
    const response = await fetchData(
      "GET",
      `users/${user.userId}/databases/${currentDBId}`,
    );

    return response.data.database.documents;
  }

  const { data: documents, isLoading } = useQuery(
    ["dbDocumentList", currentDBId],
    getDocumentsList,
    {
      enabled: !!user,
      onSuccess: result => {
        const newArr = [];
        const docs = result.map(document => {
          newArr.push(document._id);
          return { documentId: document._id, fields: [] };
        });

        setChangedDoc(docs);
        setDocumentsIds(newArr);
      },
      onFailure: () => {
        console.log("sending user to errorpage");
      },
    },
  );

  async function handleClickSave() {
    await fetchData(
      "PUT",
      `/users/${user.userId}/databases/${currentDBId}/documents`,
      changedDoc,
    );
  }

  const { mutate: fetchDocumentUpdate } = useMutation(handleClickSave, {
    onSuccess: () => {
      queryClient.refetchQueries(["dbDocumentList"]);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (!isEditMode && isOnSave) {
    fetchDocumentUpdate();
    setIsOnSave(false);
  }

  return (
    <div className="flex bg-grey w-full h-full">
      <div
        className={`relative flex bg-white w-full m-2 p-5 drop-shadow-md
      ${isEditMode ? "ring-4 ring-blue" : null}`}
      >
        <table className="border-collapse w-full max-h-20 overflow-y-auto">
          <TableHead fields={documents[0].fields} />
          <TableBody
            documents={documents}
            currentDocIndex={currentDocIndex}
            changedDoc={changedDoc}
            setChangedDoc={setChangedDoc}
            setIsOnSave={setIsOnSave}
            setIsEditMode={setIsEditMode}
            isEditMode={isEditMode}
          />
        </table>
      </div>
    </div>
  );
}

ListView.propTypes = {
  user: PropTypes.string.isRequired,
  currentDBId: PropTypes.string.isRequired,
};

export default ListView;
