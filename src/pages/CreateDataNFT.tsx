import { type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Web3, { type Web3BaseWalletAccount } from "web3";
import TokenFactory from "../abi/TokenFactory.json";
import lighthouse from "@lighthouse-web3/sdk"


export default function CreateDataset() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [hash, setHash] = useState("");
  const [labels, setLabels] = useState("");
  const [icon, setIcon] = useState("");
  const [uri, setURI] = useState("");
  const [desc, setDesc] = useState("");
  //const [source, setSource] = useState("");
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
      const dataSource = new provider.eth.Contract(TokenFactory, "0x037DE0BDaDb48348a302094C49d772A44D2fCeA8");

      await dataSource.methods
        .createDataNFT(provider.eth.defaultAccount, name, symbol, uri, icon, price, fee, hash, labels.split(","), desc)
        .send()
        .catch((error) => console.error(error));

      navigate("/datasets");
    }
  }

  const sha256Hash = async (data: string): Promise<string> => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const uploadFile = async(file: File) =>{
    const output = await lighthouse.upload(file, "4a359f08.3822aad8946145e6a336545bfe00dfee", null)
    console.log('File Status:', output)
    const dataHash = await sha256Hash(output.data.Hash)
    setHash('0x' + dataHash)
    setURI('https://gateway.lighthouse.storage/ipfs/' + output.data.Hash)
    console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash)
  }


  return (
    <div className="flex flex-col grow">
      <span className="text-3xl font-bold border-b-[0.5px] border-neutral-700 py-4">Register Dataset</span>
      <div>
        <input onChange={e=>uploadFile(e.target.files)} type="file" />
      </div>
      <div className="pt-8 flex flex-col w-[25%]">
        <label>Hash</label>
        <input type="text" value={hash} readOnly style={{ width: '100%' }} />
      </div>
      <div className="pt-8 flex flex-col w-[25%]">
        <label>URI</label>
        <input type="text" value={uri} readOnly style={{ width: '100%' }} />
      </div>
      
      <form onSubmit={onSubmit} className="flex flex-col w-[25%] my-6">
        <TextInput onChange={(value) => setName(value)} label="Name" />
        <TextInput onChange={(value) => setSymbol(value)} label="Symbol" />
        <TextInput onChange={(value) => setDesc(value)} label="Description" />
        <TextInput onChange={(value) => setLabels(value)} label="Labels" />
        <TextInput onChange={(value) => setIcon(value)} label="Icon" />    
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
