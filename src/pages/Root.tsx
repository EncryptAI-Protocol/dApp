import type React from "react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Web3 from "web3";
import logo from "/encryptai-white.svg";
import EncryptAIToken from "../abi/EncryptAIToken.json";
import Sidebar from "../components/Sidebar";
import Wallet from "../components/Wallet/Wallet";

const buyTokens = async (paymentToken: string, paymentAmount: string) => {
  if (window.ethereum) {
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const encryptAIToken = new web3.eth.Contract(EncryptAIToken, "0x6adb1da04040b7b1389fbc922b239170c86d66cf");

      // Validate payment amount
      if (!paymentAmount || Number.isNaN(Number(paymentAmount)) || Number(paymentAmount) <= 0) {
        alert("Please enter a valid payment amount.");
        return;
      }

      // Convert payment amount to a string in Wei if needed
      const amountInWei =
        paymentToken === "0x0000000000000000000000000000000000000000"
          ? web3.utils.toWei(paymentAmount, "ether")
          : paymentAmount;

      if (paymentToken === "0x0000000000000000000000000000000000000000") {
        // Ether payment
        await encryptAIToken.methods
          .buyTokens(paymentToken, amountInWei)
          .send({ from: accounts[0], value: amountInWei });
      } else {
        // ERC20 token payment
        await encryptAIToken.methods.buyTokens(paymentToken, amountInWei).send({ from: accounts[0] });
      }

      alert("Tokens purchased successfully!");
    } catch (error) {
      console.error("Error purchasing tokens:", error);
      alert("Error purchasing tokens. Please check the console for details.");
    }
  } else {
    alert("Please install MetaMask to use this feature.");
  }
};

const BuyTokensModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [paymentToken, setPaymentToken] = useState<string>("0x0000000000000000000000000000000000000000"); // Default to Ether
  const [paymentAmount, setPaymentAmount] = useState<string>("");

  const handleBuyTokens = () => {
    buyTokens(paymentToken, paymentAmount);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-black sm:mx-0 sm:h-10 sm:w-10">
                <img src="encryptai-white.svg" className="h-6 w-6" alt="Loading" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-white">Buy EAI Tokens</h3>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-300">Payment Token</label>
                  <select
                    value={paymentToken}
                    onChange={(e) => setPaymentToken(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                  >
                    <option value="0x0000000000000000000000000000000000000000">Ether</option>
                    <option value="0xB3DBC354A738eFAC879AfF8fb94f38542A324369">DEV</option>
                  </select>
                  <label className="block text-sm font-medium text-gray-300 mt-4">Payment Amount</label>
                  <input
                    type="text"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                    placeholder="Amount in Wei"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleBuyTokens}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-300 text-base font-medium text-black hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              type="button"
            >
              Buy
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Root: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    const fetchBalance = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        const encryptAIToken = new web3.eth.Contract(EncryptAIToken, "0x6adb1da04040b7b1389fbc922b239170c86d66cf");

        try {
          const balance = await encryptAIToken.methods.balanceOf(accounts[0]).call();
          setBalance(web3.utils.fromWei(balance, "ether"));
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center h-[75px] border-b-[0.5px] border-neutral-700 px-4 bg-bg text-text">
        <span className="font-bold text-4xl pr-4">EncryptAI</span>
        <img src={logo} alt="EncryptAI logo" className="w-10 h-10" />
        <div className="flex-grow" /> {/* Spacer to push Wallet component to the right */}
        <Wallet />
        <div className="ml-4 text-white">Balance: {balance} EAI</div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-4 px-4 py-2 bg-amber-300 text-black rounded hover:bg-amber-400"
          type="button"
        >
          Buy EAI Tokens
        </button>
      </header>
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-10 bg-bg text-text">
          <Outlet />
          <BuyTokensModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
      </div>
    </div>
  );
};

export default Root;
