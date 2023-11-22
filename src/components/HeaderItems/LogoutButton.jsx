import useMutateLogout from "../../apis/useMutateLogout";
import Button from "../shared/Button";

function LogoutButton() {
  const fetchLogout = useMutateLogout();
  return (
    <div className="flex justify-center w-20">
      <Button
        className="w-20 h-8 rounded-md bg-black-bg text-white hover:bg-dark-grey"
        onClick={() => fetchLogout()}
      >
        Logout
      </Button>
    </div>
  );
}

export default LogoutButton;
