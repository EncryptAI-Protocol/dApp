import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Wallet from "../components/Wallet/Wallet";
import logo from '/encryptai-white.svg';

const Root: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center h-[75px] border-b-[0.5px] border-neutral-700 px-4 bg-bg text-text">
        <span className="font-bold text-4xl pr-4">EncryptAI</span>
        <img src={logo} alt="EncryptAI logo" className="w-10 h-10" />
        <div className="flex-grow" /> {/* Spacer to push Wallet component to the right */}
        <Wallet />
      </header>
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-10 bg-bg text-text">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;
