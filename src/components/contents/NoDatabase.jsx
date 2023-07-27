import { useState } from "react";
import PropTypes from "prop-types";

import Button from "../shared/Button";
import CreateDBModal from "../Modals/CreateDBModal";

function NoDatabase({ setCurrentDBId }) {
  const [showCreateDBModal, setShowCreateDBModal] = useState(false);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justiy-center items-center">
        <h1 className="flex justify-center items-center mb-12 font-bold text-dark-grey text-[3rem]">
          No Database yet.
        </h1>
        <Button
          className="w-[250px] h-[30px] rounded-md bg-black-bg text-white hover:bg-dark-grey"
          onClick={() => {
            setShowCreateDBModal(true);
          }}
        >
          Click here to get Started!
        </Button>
      </div>
      {showCreateDBModal && (
        <CreateDBModal
          closeModal={() => setShowCreateDBModal(false)}
          setCurrentDBId={setCurrentDBId}
        />
      )}
    </div>
  );
}

NoDatabase.propTypes = {
  setCurrentDBId: PropTypes.func.isRequired,
};

export default NoDatabase;
