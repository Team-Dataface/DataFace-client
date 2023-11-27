import { useAtom, useAtomValue, useSetAtom } from "jotai";

import {
  currentDocIndexAtom,
  isEditModeAtom,
  documentsIdsAtom,
  showAddDocumentModalAtom,
  showDeleteDocumentModalAtom,
  isLastDocumentAtom,
} from "../../atoms/atoms";

import Button from "../shared/Button";
import AddDocModal from "../Modals/AddNewDocument/AddDocModal";
import DeleteDocModal from "../Modals/DeleteDocument/DeleteDocModal";
import useGetSingleDatabase from "../../apis/useGetSingleDatabase";

function DocHandlerButtons() {
  const [currentDocIndex, setCurrentDocIndex] = useAtom(currentDocIndexAtom);
  const [showAddDocumentModal, setShowAddDocumentModal] = useAtom(
    showAddDocumentModalAtom,
  );
  const [showDeleteDocumentModal, setShowDeleteDocumentModal] = useAtom(
    showDeleteDocumentModalAtom,
  );

  const { singleDatabase } = useGetSingleDatabase();
  const documentsNum = singleDatabase?.documents.length;

  const isEditMode = useAtomValue(isEditModeAtom);
  const documentsIds = useAtomValue(documentsIdsAtom);

  const setIsLastDocument = useSetAtom(isLastDocumentAtom);

  const currentDocIndexShownToUser = currentDocIndex + 1;

  function navigateDown() {
    if (currentDocIndexShownToUser !== 1) {
      setCurrentDocIndex(prev => prev - 1);
    }
  }

  function navigateUp() {
    if (currentDocIndexShownToUser !== documentsNum) {
      setCurrentDocIndex(prev => prev + 1);
    }
  }

  function clickHandleDelete() {
    if (documentsIds.length === 1) {
      setIsLastDocument(true);
    }

    setShowDeleteDocumentModal(true);
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
      {showAddDocumentModal && <AddDocModal />}
      {showDeleteDocumentModal && <DeleteDocModal />}
    </div>
  );
}

export default DocHandlerButtons;
