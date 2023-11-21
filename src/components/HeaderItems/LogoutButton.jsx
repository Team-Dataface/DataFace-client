import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import fetchData from "../../utils/axios";

import { userAtom } from "../../atoms/atoms";

import Button from "../shared/Button";
import Loading from "../shared/Loading";

function LogoutButton() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const setUser = useSetAtom(userAtom);

  async function handleGoogleLogout() {
    await fetchData("POST", "/auth/logout");
  }

  const { mutate: fetchLogout, isLoading } = useMutation(handleGoogleLogout, {
    onSuccess: () => {
      setUser("");
      queryClient.clear();
      navigate("/login");
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center w-20">
      <Button
        className="w-20 h-8 rounded-md bg-black-bg text-white hover:bg-dark-grey"
        onClick={fetchLogout}
      >
        Logout
      </Button>
    </div>
  );
}

export default LogoutButton;
