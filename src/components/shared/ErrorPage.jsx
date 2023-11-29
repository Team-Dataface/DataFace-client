import { useNavigate } from "react-router-dom";

import Button from "./Button";

function ErrorPage({ error }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-[500px]">
        <h1 className="text-9xl text-red mb-5">Oops!</h1>
        <h2 className="text-4xl text-red mb-10">Something went wrong.</h2>
        <div className="mb-20">
          <h3 className="text-md">Error Code: {error.status}</h3>
          <p className="text-md mb-8">
            {error ? error.message : "An unexpected error occurred."}
          </p>
        </div>
        <div>
          <Button
            className="px-4 py-2 mr-4 text-white bg-red rounded-md hover:bg-red-hover focus:ring-2 focus:ring-red"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            className="px-4 py-2 text-white bg-red rounded-md hover:bg-red-hover focus:ring-2 focus:ring-red"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <img
          id="Image by storyset on Freepik"
          className="w-[600px]"
          src="/assets/error_image.jpg"
          alt="error illustration"
        />
      </div>
    </div>
  );
}

export default ErrorPage;
