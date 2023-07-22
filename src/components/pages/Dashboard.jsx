import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

import Button from "../shared/Button";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const database = [];

  return database.length ? (
    navigate("/dashboard/listView")
  ) : (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="flex justify-center items-center mb-12 font-bold text-dark-grey text-[3rem]">
        No Database yet.
      </h1>
      <Button
        className="w-[250px] h-[30px] rounded-[5px] bg-black-bg text-white drop-shadow-md hover:bg-dark-grey"
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        Click here to get Started!
      </Button>
      {showModal &&
        createPortal(
          <div className="fixed w-[150px] h-[150px] left-1/2 top-1/2 bg-opacity-50">
            hi, I am modal.
          </div>,
          document.body,
        )}
    </div>
  );
}

export default Dashboard;
