import { useNavigate } from "react-router-dom";

import Button from "../shared/Button";

function Dashboard({ toggleModal }) {
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
        className="w-[250px] h-[30px] rounded-md bg-black-bg text-white hover:bg-dark-grey"
        onClick={() => {
          toggleModal();
        }}
      >
        Click here to get Started!
      </Button>
    </div>
  );
}

export default Dashboard;
