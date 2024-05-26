import { type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Web3, { type Web3BaseWalletAccount } from "web3";
import DataFactory from "../abi/DataFactory.json";

export default function CreateDataset() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [hash, setHash] = useState("");
  const [labels, setLabels] = useState("");
  const [source, setSource] = useState("");
  const [price, setPrice] = useState(0);
  const [fee, setFee] = useState(0);

  const [provider, setProvider] = useState<Web3>();

  const navigate = useNavigate();

  useEffect(() => {
    async function initProvider() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        web3.defaultAccount = (accounts as Array<string>)[0];

        setProvider(web3);
      }
    }
    initProvider();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (provider) {
      const dataSource = new provider.eth.Contract(DataFactory, "0xf51566017d8A1ECb104B77d39BbF4Ce63DD0D3dB");

      await dataSource.methods
        .createDataSource(name, symbol, source, hash, labels.split(","), price, fee)
        .send()
        .catch((error) => console.error(error));

      navigate("/datasets");
    }
  }

  return (
    <div className="flex flex-col grow">
      <span className="text-3xl font-bold border-b-[0.5px] border-neutral-700 py-4">Register Data Source</span>

      <form onSubmit={onSubmit} className="flex flex-col w-[25%] my-6">
        <TextInput onChange={(value) => setName(value)} label="Name" />
        <TextInput onChange={(value) => setSymbol(value)} label="Symbol" />
        <TextInput onChange={(value) => setHash(value)} label="Hash" />
        <TextInput onChange={(value) => setLabels(value)} label="Labels" />
        <TextInput onChange={(value) => setSource(value)} label="Source" />
        <TextInput onChange={(value) => setPrice(Number(value))} label="Price" />
        <TextInput onChange={(value) => setFee(Number(value))} label="Fee" />
        <button
          type="submit"
          className="text-amber-300 border-2 border-amber-300 hover:bg-amber-300 hover:bg-opacity-30 rounded-lg p-2 text-center my-10"
        >
          Create
        </button>
      </form>
    </div>
  );
}

interface TextInputProps {
  label: string;
  onChange: (value: string) => void;
}

const TextInput = ({ label, onChange }: TextInputProps) => (
  <div className="flex flex-col">
    <label className="my-4 text-sm font-medium text-white">{label}</label>
    <input
      onChange={(e) => onChange(e.target.value)}
      className="border w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-1 focus:ring-amber-300 rounded-lg"
    />
  </div>
);
