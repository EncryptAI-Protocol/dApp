import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi";

import CreateDataNFT from "./pages/CreateDataNFT.tsx";
import CreateModelNFT from "./pages/CreateModelNFT.tsx";
import Datasets from "./pages/Datasets.tsx";
import Inference from "./pages/Inference.tsx";
import Models from "./pages/Models.tsx";
import Root from "./pages/Root.tsx";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

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
        element: <CreateDataNFT />,
      },
      {
        path: "/models",
        element: <Models />,
      },
      {
        path: "/new-model",
        element: <CreateModelNFT />,
      },
      {
        path: "/inference",
        element: <Inference />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <RouterProvider router={router} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
