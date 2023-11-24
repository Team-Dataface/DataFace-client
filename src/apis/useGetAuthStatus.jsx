/* eslint-disable consistent-return */
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import { userAtom } from "../atoms/atoms";

import authUser from "../utils/authUser";

import Loading from "../components/shared/Loading";

import CONSTANT from "../constants/constant";

function useGetAuthStatus() {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const { isLoading } = useQuery(["authStatus"], authUser, {
    retry: false,
    onSuccess: response => {
      const { success, userInfo } = response.data;

      if (success) {
        setUser(userInfo);
        navigate("/dashboard");
      } else {
        setUser("");
      }
    },
    onError: () => {
      setUser("");
      return navigate("/login");
    },
    staleTime: CONSTANT.ONE_HOUR_IN_MILLISECONDS,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }
}

export default useGetAuthStatus;
