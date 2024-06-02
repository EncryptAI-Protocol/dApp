import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Web3 from "web3";
import DataFactory from "../abi/DataFactory.json";

interface DataSource {
  name: string;
  labels: Array<string>;
  hash: string;
  price: number;
  fee: number;
  symbol: string;
}

export default function Datasets() {
  const [data, setData] = useState<DataSource[]>([]);

  useEffect(() => {
    async function getDataSources() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);

        const dataSource = new web3.eth.Contract(DataFactory, "0xf51566017d8A1ECb104B77d39BbF4Ce63DD0D3dB");

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        web3.defaultAccount = (accounts as Array<string>)[0];

        const dataSources = await dataSource.methods
          .getDataSources(20)
          .call()
          .catch((error) => console.error(error));

        if (dataSource && dataSources) {
          setData(dataSources as []);
        }
      }
    }
    getDataSources();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between border-b-[0.5px] border-neutral-700 py-2">
        <span className="text-2xl font-semibold">Data Sources</span>
        <Link className="flex justify-center items-center" to="/new-dataset">
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
              <th className="px-6 py-3">Hash</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Fee</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value) => (
              <DatasetRow
                key={value.hash}
                name={value.name}
                symbol={value.symbol}
                labels={value.labels}
                hash={value.hash}
                price={Number(value.price)}
                fee={Number(value.fee)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface DatasetProps {
  name: string;
  symbol: string;
  labels: Array<string>;
  hash: string;
  price: number;
  fee: number;
}

const DatasetRow = ({ name, symbol, labels, hash, price, fee }: DatasetProps) => (
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
    <td className="px-6 py-4">{fee} DEV</td>
  </tr>
);
