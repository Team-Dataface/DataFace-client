import { useState } from "react";

import Button from "../shared/Button";
import CreateDBModal from "../Modals/CreateNewDatabase/CreateDBModal";

function NoDatabase() {
  const [showCreateDBModal, setShowCreateDBModal] = useState(false);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justiy-center items-center">
        <span className="flex justify-center items-center mb-12 font-bold text-dark-grey text-[3rem]">
          No Database yet.
        </span>
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
        <CreateDBModal closeModal={() => setShowCreateDBModal(false)} />
      )}
    </div>
  );
}

export default NoDatabase;
