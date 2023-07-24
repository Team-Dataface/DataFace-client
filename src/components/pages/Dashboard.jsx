import { useState } from "react";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

import Button from "../shared/Button";
import CreateDBModal from "../Modals/CreateDBModal";

function Dashboard({ user }) {
  const navigate = useNavigate();
  const database = [];
  const [showCreateDBModal, setShowCreateDBModal] = useState(false);

  return database.length ? (
    navigate("/dashboard/listView")
  ) : (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="flex justify-center items-center mb-12 font-bold text-dark-grey text-[3rem]">
        No Database yet.
      </h1>
      <Button
        className="w-[250px] h-[30px] rounded-full bg-black-bg text-white hover:bg-dark-grey"
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
    </div>
  );
}

Dashboard.propTypes = {
  user: PropTypes.string.isRequired,
};

export default Dashboard;
