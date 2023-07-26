import { useState } from "react";
import PropTypes from "prop-types";

import Button from "../shared/Button";
import AddDocumentModal from "../Modals/AddDocumentModal";

function DocHandlerButtons({ user, currentDBId }) {
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);

  return (
    <div className="flex items-center">
      <Button className="flex justify-center items-center w-8 h-8 mr-1 rounded-md hover:bg-dark-grey">
        <img src="/assets/left_icon.svg" alt="left icon" />
      </Button>
      <span className="flex justify-center items-center w-20 h-8 mr-1 rounded-md bg-white">
        0 / 0
      </span>
      <Button className="flex justify-center items-center w-8 h-8 mr-1 rounded-md hover:bg-dark-grey">
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
};

export default DocHandlerButtons;
