import { useState, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import UserContext from "../../../context/UserContext";
import CurrentDBIdContext from "../../../context/CurrentDBIdContext";

import fetchData from "../../../utils/axios";
import useLoading from "../../../utils/useLoading";

import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Loading from "../../shared/Loading";

function ListView({
  isEditMode,
  setIsEditMode,
  currentDocIndex,
  setCurrentDocIndex,
  setDocumentsIds,
  isOnSave,
  setIsOnSave,
}) {
  const queryClient = useQueryClient();
  const { userId } = useContext(UserContext);
  const currentDBId = useContext(CurrentDBIdContext);

  const [changedDoc, setChangedDoc] = useState([]);

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
    <div className="flex bg-grey w-full h-full">
      <div
        className={`relative flex bg-white w-full m-2 p-5 drop-shadow-md
      ${isEditMode && "ring-4 ring-blue"}`}
      >
        <table className="border-collapse w-full max-h-20 overflow-y-auto">
          <TableHead fields={data.documents[0].fields} />
          <TableBody
            documents={data.documents}
            currentDocIndex={currentDocIndex}
            setCurrentDocIndex={setCurrentDocIndex}
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
  isEditMode: PropTypes.bool.isRequired,
  setIsEditMode: PropTypes.func.isRequired,
  currentDocIndex: PropTypes.number.isRequired,
  setDocumentsIds: PropTypes.func.isRequired,
};

export default ListView;
