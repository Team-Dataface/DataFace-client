import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import fetchData from "../../utils/axios";

import Button from "../shared/Button";

function LogoutButton({ clickHandleLogout }) {
  const navigate = useNavigate();

  async function handleGoogleLogout() {
    await fetchData("POST", "/auth/logout");
  }

  const { mutate } = useMutation(handleGoogleLogout, {
    onSuccess: () => {
      clickHandleLogout(false);
      navigate("/login");
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  return (
    <div className="flex justify-center w-20">
      <Button
        className="w-20 h-8 rounded-md bg-black-bg text-white hover:bg-dark-grey"
        onClick={mutate}
      >
        Logout
      </Button>
    </div>
  );
}

export default LogoutButton;
