import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import fetchData from "../../utils/axios";
import { firebaseAuth } from "../app/firebaseAuth";

import googleLogo from "../../assets/google_logo.png";
import logo from "../../assets/dataface_logo.png";

function Login() {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  async function handleGoogleLogin() {
    const result = await signInWithPopup(firebaseAuth, googleProvider);

    const userInfoObject = {
      email: result.user.email,
      username: result.user.displayName,
    };

    console.log(userInfoObject);

    const response = await fetchData("POST", "/login", userInfoObject);
  }

  const { mutate, isError, isSuccess } = useMutation(handleGoogleLogin);

  if (isSuccess) {
    navigate("/dashboard");
  }

  if (isError) {
    console.log("sending user to errorpage");
  }

  return (
    <div className="flex flex-col justify-center items-center p-20">
      <img src={logo} alt="logo" className="w-[30rem]" />
      <h1 className="flex justify-center items-center w-full mb-20 text-[3rem]">
        Your Data, Your Way
      </h1>
      <button
        className="flex items-center w-[250px] h-[55px] p-1 rounded-[5px] bg-google-blue drop-shadow-md hover:bg-google-blue-hover"
        onClick={mutate}
      >
        <div className="flex justify-center items-center w-[48px] h-[48px] p-15 rounded-[5px] bg-white ">
          <img
            className="w-[18px] h-[18px]"
            src={googleLogo}
            alt="google-login"
          />
        </div>
        <span className="ml-5 font-roboto text-white">Sign in with Google</span>
      </button>
    </div>
  );
}

export default Login;
