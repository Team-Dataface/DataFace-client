import { useNavigate } from "react-router-dom";

import Button from "./Button";

function ErrorPage({ error }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-around w-full min-h-screen">
      <div className="flex flex-col justify-center h-full">
        <p className="text-xl">Error Code: {error.status}</p>
        <p className="text-xl mb-8">
          {error ? error.message : "An unexpected error occurred."}
        </p>
        <h1 className="text-8xl text-red mb-16">Oops!</h1>
        <p className="text-xl mb-8">Here are some helpful Links instead</p>
        <div className="flex justify-between mt-6">
          <Button
            className="px-4 py-2 text-white bg-red rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={() => navigate("/login")}
          >
            <span>Login</span>
          </Button>
          <Button
            className="px-4 py-2 text-white bg-red rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={() => window.location.reload()}
          >
            <span>Retry</span>
          </Button>
        </div>
      </div>
      <div>
        <p>Error image will be here</p>
      </div>
    </div>
  );
}

export default ErrorPage;
