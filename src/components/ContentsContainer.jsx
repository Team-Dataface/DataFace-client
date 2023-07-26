import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

import fetchData from "../utils/axios";

function Dashboard({ user }) {
  const navigate = useNavigate();

  async function getDatabaseList() {
    const response = await fetchData("GET", `users/${user}/databases`);

    return response;
  }

  const { isLoading } = useQuery(["userDbList"], getDatabaseList, {
    enabled: !!user,
    onSuccess: result => {
      const { data } = result;

      if (!data.databases.length) {
        navigate("/dashboard/nodatabase");
        return;
      }

      navigate("/dashboard/listview");
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return <Outlet />;
}

Dashboard.propTypes = {
  user: PropTypes.string.isRequired,
};

export default Dashboard;
