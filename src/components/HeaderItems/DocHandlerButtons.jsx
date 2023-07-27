import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import fetchData from "../../utils/axios";

import Button from "../shared/Button";
import AddDocumentModal from "../Modals/AddDocumentModal";

function DocHandlerButtons({
  user,
  currentDBId,
  currentDocIndex,
  clickHandleNavigator,
}) {
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const [documentsNum, setDocumentsNum] = useState(0);

  const currentDocIndexShownToUser = currentDocIndex + 1;

  function navigateDownTilZero() {
    if (currentDocIndexShownToUser !== 1) {
      clickHandleNavigator(prev => prev - 1);
    }
  }

  function navigateDownTilMaxNum() {
    if (currentDocIndexShownToUser !== documentsNum) {
      clickHandleNavigator(prev => prev + 1);
    }
  }

  async function getDocumentsList() {
    const response = await fetchData(
      "GET",
      `users/${user}/databases/${currentDBId}`,
    );

    return response;
  }

  const { isLoading } = useQuery(["dbDocumentList"], getDocumentsList, {
    enabled: !!user && !!currentDBId,
    onSuccess: result => {
      setDocumentsNum(result.data.database.documents.length);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <div className="flex items-center">
      <Button
        className="flex justify-center items-center w-8 h-8 mr-1 rounded-md hover:bg-dark-grey"
        onClick={() => navigateDownTilZero()}
      >
        <img src="/assets/left_icon.svg" alt="left icon" />
      </Button>
      <span className="flex justify-center items-center w-20 h-8 mr-1 rounded-md bg-white">
        {currentDocIndexShownToUser} / {documentsNum}
      </span>
      <Button
        className="flex justify-center items-center w-8 h-8 mr-1 rounded-md hover:bg-dark-grey"
        onClick={() => navigateDownTilMaxNum()}
      >
        <img src="/assets/right_icon.svg" alt="right icon" />
      </Button>
      <Button
        className="flex justify-center items-center w-8 h-8 mr-1 rounded-md bg-white hover:bg-yellow"
        onClick={() => {
          setShowAddDocumentModal(true);
        }}
      >
        <img src="/assets/plus_icon.svg" alt="plus icon" />
      </Button>
      <Button className="flex justify-center items-center w-8 h-8 rounded-md bg-white hover:bg-yellow">
        <img src="/assets/minus_icon.svg" alt="minus icon" />
      </Button>
      {showAddDocumentModal && (
        <AddDocumentModal
          user={user}
          closeModal={() => setShowAddDocumentModal(false)}
          currentDBId={currentDBId}
        />
      )}
    </div>
  );
}

DocHandlerButtons.propTypes = {
  user: PropTypes.string.isRequired,
  currentDBId: PropTypes.string.isRequired,
  currentDocIndex: PropTypes.number.isRequired,
  clickHandleNavigator: PropTypes.func.isRequired,
};

export default DocHandlerButtons;
