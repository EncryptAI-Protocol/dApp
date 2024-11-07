import { useEffect, useState } from "react";
import { FaPlus, FaDownload } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Web3 from "web3";
import tokenFactory from "../abi/TokenFactory.json";

interface Attributes {
  name: string;
  datasetHash: string;
  tokenPrice: number;
  fee: number;
  symbol: string;
  desc: string;
  labels: Array<string>;
  ipfsURI: string;
  icon: string;
}

interface DataSource {
  attributes: Attributes;
  owner: string;
}

export default function Datasets() {
  const [data, setData] = useState<DataSource[]>([]);

  useEffect(() => {
    async function getDataSources() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);

        const dataSource = new web3.eth.Contract(tokenFactory, "0x4657d5c40ddbc649bb9592b969fda9c642c34a86");

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        web3.defaultAccount = (accounts as Array<string>)[0];

        const dataSources = await dataSource.methods
          .getAllMintedDataNFTs()
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
        <span className="text-2xl font-semibold">Datasets</span>
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
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Symbol</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Labels</th>
              <th className="px-6 py-3">Hash</th>
              <th className="px-6 py-3">Owner</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Fee</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value) => (
              <DatasetRow
                uri={value.attributes.ipfsURI}
                icon={value.attributes.icon}
                name={value.attributes.name}
                symbol={value.attributes.symbol}
                desc={value.attributes.desc}
                labels={value.attributes.labels}
                datasetHash={value.attributes.datasetHash}
                owner={value.owner}
                tokenPrice={Number(value.attributes.tokenPrice)}
                fee={Number(value.attributes.fee)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface DatasetProps {
  uri: string;
  icon: string;
  name: string;
  symbol: string;
  desc: string;
  labels: Array<string>;
  datasetHash: string;
  owner: string;
  tokenPrice: number;
  fee: number;
}

const DatasetRow = ({ uri, icon, name, symbol, desc, labels, datasetHash, owner, tokenPrice, fee }: DatasetProps) => {
  console.log('URI:', uri);
  return (
  <tr className="bg-[#ffffff05] border-gray-700 text-white hover:!text-amber-300">
    <td className="px-6 py-4">
      <a href={uri} download className="text-amber-300 hover:underline flex items-center justify-center">
        <FaDownload className="w-5 h-5" />
      </a>
    </td>
    <td className="px-6 py-4" style={{ width: '100px', height: '100px' }}>
        <img src={icon} alt={`${name} icon`} />
    </td>
    <td className="px-6 py-4 font-medium whitespace-nowra">{name}</td>
    <td className="px-6 py-4">{symbol}</td>
    <td className="px-6 py-4">{desc}</td>
    <td className="px-6 py-4">
    {" "}
    {labels.map((value) => (
      <span key={value} className="text-sm font-medium me-2 px-2.5 py-0.5 rounded bg-gray-700">
        {value}
      </span>
    ))}
  </td>
    <td className="px-6 py-4">{datasetHash.slice(0,9)}...{datasetHash.slice(-9,)}</td>
    <td className="px-6 py-4">{owner.slice(0,9)}...{owner.slice(-9,)}</td>
    <td className="px-6 py-4">{tokenPrice} EAI</td>
    <td className="px-6 py-4">{fee} EAI</td>
  </tr>
);
}
