import { Outlet } from "react-router-dom";

function ContentsContainer() {
  return (
    <div className="flex justify-center items-center w-full p-3 bg-grey">
      <Outlet />
    </div>
  );
}

export default ContentsContainer;
