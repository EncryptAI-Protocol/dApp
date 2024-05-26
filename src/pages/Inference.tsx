import type React from "react";
import { useState } from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

export const data = [
  {
    name: "Cat Detection",
    labels: ["Cat", "Detection"],
    hash: "80c1daf4a9a058ae9b8b716c4cdf6dc2eda9ff571f9c25cb7f528a3bb39f48ca",
    fhe: "YES",
    price: 1,
    accuracy: 60,
    datasets: [
      "e5c5ff1408f9793b623b1a9c83a24d27533f05ea7ab93ee67f63f4145dbdb330",
      "2cc01342ecbde92646b4d1aa6018b5d82f00ea8b743bc6078396c5eed407a0ae",
    ],
  },
  {
    name: "Cat Detection v2",
    labels: ["Cat", "Detection"],
    hash: "b9529d3ad671dd120d4f0e482ca778040808b638c52be73dc39a0b965d190fd1",
    fhe: "YES",
    price: 2,
    accuracy: 80,
    datasets: [
      "e5c5ff1408f9793b623b1a9c83a24d27533f05ea7ab93ee67f63f4145dbdb330",
      "2cc01342ecbde92646b4d1aa6018b5d82f00ea8b743bc6078396c5eed407a0ae",
    ],
  },
  {
    name: "Dog Detection",
    labels: ["Dog", "Detection"],
    hash: "9ef339f0ad2e21e9827990e73882224e2de8ed97b1d95d387f9e67ba04f50a68",
    fhe: "NO",
    price: 0.5,
    accuracy: 90,
    datasets: ["95ca0e969408d1a8987780da9657764d84e36b093bb2f9ead00668c3fd7ebef9"],
  },
];

const Inference = () => {
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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
          onClick={() => alert("Inference started")}
        >
          <div className="flex justify-center items-center">
            <>
              <span className="mx-2">Launch Inference</span>
            </>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Inference;
