import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Root() {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  return (
    <div className="flex flex-col grow">
      <div className="flex justify-between items-center h-[75px] w-full border-b-[0.5px] border-neutral-700 px-4">
        <span className="font-bold text-4xl">EncryptAI</span>
        <button
          type="button"
          className="text-amber-300 border-2 border-amber-300 p-2 rounded-lg text-lg hover:bg-amber-300 hover:bg-opacity-30 "
          onClick={connect}
        >
          <div className="flex justify-center items-center">
            {connected && account ? (
              <>
                <FaWallet className="mx-2 text-amber-300 w-5" />
                <span className="mx-2">{`${account.substring(0, 6)}...${account.substring(account.length - 6)}`}</span>
              </>
            ) : (
              <>
                <img alt="Metamask Logo" className="mx-2 w-5" src="metamask.svg" />
                <span className="mx-2">Connect Wallet</span>
              </>
            )}
          </div>
        </button>
      </div>
      <div className="flex grow">
        <Sidebar />
        <div className="flex grow p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
