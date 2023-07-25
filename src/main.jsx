import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./app/App";
import "./main.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools />
  </QueryClientProvider>,
  // </React.StrictMode>,
);
