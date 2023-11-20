import { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import PropTypes from "prop-types";

import fetchData from "../../utils/axios";

import { currentDBIdAtom } from "../../atoms/atoms";
import UserContext from "../../context/UserContext";
import Button from "../shared/Button";
import AddDocModal from "../Modals/AddNewDocument/AddDocModal";
import DeleteDocModal from "../Modals/DeleteDocument/DeleteDocModal";
import Loading from "../shared/Loading";

function DocHandlerButtons({
  isEditMode,
  currentDocIndex,
  setCurrentDocIndex,
  documentsIds,
  setDocumentsIds,
}) {
  const { userId } = useContext(UserContext);
  const currentDBId = useAtomValue(currentDBIdAtom);

  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const [showDeleteDocumentModal, setShowDeleteDocumentModal] = useState(false);
  const [documentsNum, setDocumentsNum] = useState(0);
  const [isLastDocument, setIsLastDocument] = useState(false);

  const queryClient = useQueryClient();

  const currentDocIndexShownToUser = currentDocIndex + 1;

  function navigateDown() {
    if (currentDocIndexShownToUser !== 1) {
      setCurrentDocIndex(prev => prev - 1);
      queryClient.refetchQueries([
        "foreignDocuments",
        currentDBId,
        currentDocIndex,
      ]);
    }
  }

  function navigateUp() {
    if (currentDocIndexShownToUser !== documentsNum) {
      setCurrentDocIndex(prev => prev + 1);
      queryClient.refetchQueries([
        "foreignDocuments",
        currentDBId,
        currentDocIndex,
      ]);
    }
  }

  function clickHandleDelete() {
    if (documentsIds.length === 1) {
      setIsLastDocument(true);
    }

    setShowDeleteDocumentModal(true);
  }

  async function getDocumentsList() {
    const response = await fetchData(
      "GET",
      `users/${userId}/databases/${currentDBId}`,
    );

    return response.data.database;
  }

  const { isLoading } = useQuery(
    ["dbDocumentList", currentDBId],
    getDocumentsList,
    {
      retry: false,
      enabled: !!userId && !!currentDBId,
      onSuccess: result => {
        setDocumentsNum(result.documents.length);
      },
      onFailure: () => {
        console.log("sending user to errorpage");
      },
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );

  if (isLoading && currentDBId) {
    return <Loading />;
  }

  return (
    <div className="flex items-center">
      <Button
        className={`flex justify-center items-center w-8 h-8 mr-1 rounded-md
        ${isEditMode ? "hover:none" : "hover:bg-dark-grey"}`}
        onClick={() => navigateDown()}
        disabled={isEditMode}
      >
        <img src="/assets/left_icon.svg" alt="left icon" />
      </Button>
      <span
        className={`flex justify-center items-center w-20 h-8 mr-1 rounded-md
        ${isEditMode ? "bg-dark-grey" : "bg-white"}`}
      >
        {currentDocIndexShownToUser} / {documentsNum}
      </span>
      <Button
        className={`flex justify-center items-center w-8 h-8 mr-1 rounded-md
        ${isEditMode ? "hover:none" : "hover:bg-dark-grey"}`}
        onClick={() => navigateUp()}
        disabled={isEditMode}
      >
        <img src="/assets/right_icon.svg" alt="right icon" />
      </Button>
      <Button
        className={`flex justify-center items-center w-8 h-8 mr-1 rounded-md
          ${
            isEditMode ? "bg-dark-grey hover:none" : "bg-white hover:bg-yellow"
          }`}
        onClick={() => {
          setShowAddDocumentModal(true);
        }}
        disabled={isEditMode}
      >
        <img src="/assets/plus_icon.svg" alt="plus icon" />
      </Button>
      <Button
        className={`flex justify-center items-center w-8 h-8 rounded-md
        ${isEditMode ? "bg-dark-grey hover:none" : "bg-white hover:bg-yellow"}`}
        onClick={clickHandleDelete}
        disabled={isEditMode}
      >
        <img src="/assets/minus_icon.svg" alt="minus icon" />
      </Button>
      {showAddDocumentModal && (
        <AddDocModal
          closeModal={() => setShowAddDocumentModal(false)}
          documentsIds={documentsIds}
          setDocumentsIds={setDocumentsIds}
          currentDocIndex={currentDocIndex}
          setCurrentDocIndex={setCurrentDocIndex}
        />
      )}
      {showDeleteDocumentModal && (
        <DeleteDocModal
          user={userId}
          closeModal={() => setShowDeleteDocumentModal(false)}
          currentDocIndex={currentDocIndex}
          documentsIds={documentsIds}
          setCurrentDocIndex={setCurrentDocIndex}
          isLastDocument={isLastDocument}
          setIsLastDocument={setIsLastDocument}
        />
      )}
    </div>
  );
}

DocHandlerButtons.propTypes = {
  currentDocIndex: PropTypes.number.isRequired,
  setCurrentDocIndex: PropTypes.func.isRequired,
};

export default DocHandlerButtons;
