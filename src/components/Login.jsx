import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import fetchData from "../utils/axios";
import { firebaseAuth } from "../app/firebaseAuth";

import Button from "./shared/Button";
import Loading from "./shared/Loading";

function Login({ setUser }) {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  async function handleGoogleLogin() {
    const result = await signInWithPopup(firebaseAuth, googleProvider);

    const userInfoObject = {
      email: result.user.email,
      username: result.user.displayName,
    };

    const response = await fetchData("POST", "/auth/login", userInfoObject);

    return response;
  }

  const { mutate: fetchLogin, isLoading } = useMutation(handleGoogleLogin, {
    onSuccess: result => {
      const { data } = result;

      setUser(data.userInfo);
      navigate("/dashboard");
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-full p-10">
      <img
        src="/assets/dataface_logo.png"
        alt="dataface logo"
        className="w-[300px]"
      />
      <h1 className="flex justify-center items-center w-full mb-5 text-[2rem]">
        Your Data, Your Way
      </h1>
      <Button
        className="flex items-center w-[230px] h-[55px] p-1 rounded-[5px] bg-google-blue drop-shadow-md hover:bg-google-blue-hover"
        onClick={fetchLogin}
      >
        <>
          <div className="flex justify-center items-center w-[48px] h-[48px] p-15 rounded-[5px] bg-white">
            <img
              className="w-[18px] h-[18px]"
              src="/assets/google_logo.png"
              alt="google logo"
            />
          </div>
          <span className="ml-5 font-roboto text-white">
            Sign in with Google
          </span>
        </>
      </Button>
    </div>
  );
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Login;
