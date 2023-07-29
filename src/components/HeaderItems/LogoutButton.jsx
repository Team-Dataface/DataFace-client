import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetchData from "../../utils/axios";

import Button from "../shared/Button";
import Loading from "../shared/Loading";

function LogoutButton({ clickHandleLogout }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleGoogleLogout() {
    await fetchData("POST", "/auth/logout");
  }

  const { mutate: fetchLogout, isLoading } = useMutation(handleGoogleLogout, {
    onSuccess: () => {
      clickHandleLogout("");
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

LogoutButton.propTypes = {
  clickHandleLogout: PropTypes.func.isRequired,
};

export default LogoutButton;
