import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import fetchData from "../../utils/axios";

import Button from "../shared/Button";

function LogoutButton() {
  const navigate = useNavigate();

  async function handleGoogleLogout() {
    await fetchData("POST", "/auth/logout");
  }

  const { mutate } = useMutation(handleGoogleLogout, {
    onSuccess: () => {
      navigate("/login");
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  return (
    <div className="flex w-20 justify-center">
      <Button onClick={mutate}>logout</Button>
    </div>
  );
}

export default LogoutButton;
