import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Web3 from "web3";
import ModelFactory from "../abi/ModelFactory.json";

interface ModelSource {
  name: string;
  symbol: string;
  hash: string;
  labels: Array<string>;
  price: number;
}

export default function Models() {
  const [data, setData] = useState<ModelSource[]>([]);

  useEffect(() => {
    async function getModelSources() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);

        await window.ethereum.request({ method: "eth_requestAccounts" });

        const modelSource = new web3.eth.Contract(ModelFactory, "0x8C19b8A6d6d18cdc76539d13d08a3Cc5fFd875AD");

        const modelSources = await modelSource.methods
          .getModelSources(20)
          .call()
          .catch((error) => console.error(error));

        if (modelSource && modelSources) {
          setData(modelSources as []);
        }
      }
    }
    getModelSources();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between border-b-[0.5px] border-neutral-700 py-2">
        <span className="text-2xl font-semibold">Model Sources</span>
        <Link className="flex justify-center items-center" to="/new-model">
          <button
            type="button"
            className="flex items-center text-amber-300 border-2 border-amber-300 hover:bg-amber-300 hover:bg-opacity-30  p-2 rounded-lg"
          >
            <FaPlus className="w-5" />
          </button>
        </Link>
      </div>
      <div className="flex flex-col w-full overflow-x-auto shadow-md sm:rounded-lg my-6">
        <table className="text-sm text-left rtl:text-righ">
          <thead className="text-xs  uppercase bg-[#ffffff0d] text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Symbol</th>
              <th className="px-6 py-3">Labels</th>
              <th className="px-6 py-3">Dataset Hash</th>
              <th className="px-6 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value) => (
              <ModelRow
                key={value.hash}
                name={value.name}
                labels={value.labels}
                hash={value.hash}
                price={Number(value.price)}
                symbol={value.symbol}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface ModelProps {
  name: string;
  labels: Array<string>;
  hash: string;
  price: number;
  symbol: string;
}

const ModelRow = ({ name, labels, hash, price, symbol }: ModelProps) => (
  <tr className="bg-[#ffffff05] border-gray-700 text-white hover:!text-amber-300">
    <td className="px-6 py-4 font-medium whitespace-nowra">{name}</td>
    <td className="px-6 py-4">{symbol}</td>
    <td className="px-6 py-4">
      {" "}
      {labels.map((value) => (
        <span key={value} className="text-sm font-medium me-2 px-2.5 py-0.5 rounded bg-gray-700">
          {value}
        </span>
      ))}
    </td>
    <td className="px-6 py-4">{hash}</td>
    <td className="px-6 py-4">{price} DEV</td>
  </tr>
);
