import type React from "react";
import { useEffect, useState } from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import Web3 from "web3";
import ModelFactory from "../abi/ModelFactory.json";

interface ModelSource {
  name: string;
  symbol: string;
  hash: string;
  labels: Array<string>;
  price: number;
}

const Inference = () => {
  const [data, setData] = useState<ModelSource[]>([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    // biome-ignore lint/complexity/useOptionalChain: <explanation>
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      alert("Please upload an image file");
    }
  };

  const handleImageDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.items[0].getAsFile();
    if (file?.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      alert("Please drop an image file");
    }
  };

  const selectedModelData = data.find((model) => model.name === selectedModel);

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
        <span className="text-2xl w-full font-semibold">AI Inference</span>
      </div>

      <div className="w-full items-center max-w-md p-4 rounded shadow-md">
        <label className="block">
          <span className="text-white">Select Model:</span>
          <select className="form-select mt-1 block w-full" value={selectedModel} onChange={handleModelChange}>
            {data.map((model) => (
              <option key={model.hash} value={model.name}>
                {model.name}
              </option>
            ))}
          </select>
        </label>
        {selectedModelData && (
          <p className="mt-2">
            {selectedModelData.fhe === "YES" ? (
              <IoShieldCheckmarkSharp title="This model is FHE compiled" className="text-amber-200 h-8 w-8" />
            ) : null}
          </p>
        )}

        <label className="block mt-4">
          <span className="text-white">Upload Image:</span>
          <input className="mt-1" type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <div
          onDrop={handleImageDrop}
          onDragOver={(event) => event.preventDefault()}
          className="mt-4 border-2 border-dashed border-gray-200 h-32 flex items-center justify-center text-gray-500"
        >
          Drop image here
        </div>
        <button
          type="button"
          className="mt-4 text-amber-300 border-2 border-amber-300 rounded-lg text-lg hover:bg-amber-300 hover:bg-opacity-30"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex justify-center items-center">
            <>
              <span className="mx-2">Launch Inference</span>
            </>
          </div>
        </button>
        {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-black sm:mx-0 sm:h-10 sm:w-10">
                      <img src="encryptai-white.svg" className="h-6 w-6" alt="Loading" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-white pt-2 pb-10">Inference Launched</h3>
                    </div>
                  </div>
                  <div className="w-full bg-gray-900 rounded-full h-2.5 dark:bg-gray-900">
                      <div className="bg-amber-300 h-2.5 rounded-full pt-2 animate-width-full"></div>
                  </div>
                </div>
                <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-4 text-amber-300 border-2 border-amber-300 rounded-lg text-lg hover:bg-amber-300 hover:bg-opacity-30"
                  onClick={() => setIsModalOpen(false)}
                >
                  <div className="flex justify-center items-center">
                    <>
                      <span className="mx-2">Close</span>
                    </>
                  </div>
                </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inference;
