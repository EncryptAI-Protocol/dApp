import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateDataset from "./pages/CreateDataset.tsx";
import CreateModel from "./pages/CreateModel.tsx";
import Datasets from "./pages/Datasets.tsx";
import Inference from "./pages/Inference.tsx";
import Models from "./pages/Models.tsx";
import Root from "./pages/Root.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/datasets",
        element: <Datasets />,
      },
      {
        path: "/new-dataset",
        element: <CreateDataset />,
      },
      {
        path: "/models",
        element: <Models />,
      },
      {
        path: "/new-model",
        element: <CreateModel />,
      },
      {
        path: "/inference",
        element: <Inference />,
      },
    ],
  },
]);

// biome-ignore lint: Ignore noNullAssertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          url: window.location.href,
        },
      }}
    >
      <RouterProvider router={router} />
    </MetaMaskProvider>
  </React.StrictMode>,
);
