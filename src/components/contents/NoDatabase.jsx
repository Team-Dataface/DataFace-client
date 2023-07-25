import { useState } from "react";

import Button from "../shared/Button";
import CreateDBModal from "../Modals/CreateDBModal";

function NoDatabase({ user }) {
  const [showCreateDBModal, setShowCreateDBModal] = useState(false);

  return (
    <>
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
      {showCreateDBModal && (
        <CreateDBModal
          user={user}
          closeModal={() => setShowCreateDBModal(false)}
        />
      )}
    </>
  );
}

export default NoDatabase;
