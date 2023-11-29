import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { userAtom } from "../atoms/atoms";
import { firebaseAuth } from "../app/firebaseAuth";

import useLoading from "../utils/useLoading";
import fetchData from "../utils/axios";

import Loading from "../components/shared/Loading";

function useGoogleLogin() {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const setUser = useSetAtom(userAtom);

  async function handleGoogleLogin() {
    const result = await signInWithPopup(firebaseAuth, googleProvider);

    const userInfoObject = {
      email: result.user.email,
      username: result.user.displayName,
    };

    const response = await fetchData("POST", "/auth/login", userInfoObject);

    return response;
  }

  const { mutate: fetchGoogleLogin, isLoading } = useMutation(
    handleGoogleLogin,
    {
      onSuccess: result => {
        const { data } = result;

        setUser(data.userInfo);
        navigate("/dashboard");
      },
    },
  );

  const loadingTimeout = useLoading(isLoading);

  if (loadingTimeout) {
    return <Loading />;
  }

  return fetchGoogleLogin;
}

export default useGoogleLogin;
