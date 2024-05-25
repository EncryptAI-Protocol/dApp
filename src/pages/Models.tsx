export default function Models() {
  const data = [
    {
      name: "Cat Detection",
      labels: ["Cat", "Detection"],
      hash: "80c1daf4a9a058ae9b8b716c4cdf6dc2eda9ff571f9c25cb7f528a3bb39f48ca",
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
      price: 0.5,
      accuracy: 90,
      datasets: ["95ca0e969408d1a8987780da9657764d84e36b093bb2f9ead00668c3fd7ebef9"],
    },
  ];
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-sm text-left rtl:text-righ">
          <thead className="text-xs  uppercase bg-[#ffffff0d] text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Labels</th>
              <th className="px-6 py-3">Hash</th>
              <th className="px-6 py-3">Datasets</th>
              <th className="px-6 py-3">Accuracy</th>
              <th className="px-6 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value) => (
              <DatasetRow
                key={value.hash}
                name={value.name}
                labels={value.labels}
                hash={value.hash}
                price={value.price}
                accuracy={value.accuracy}
                datasets={value.datasets}
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
  labels: Array<string>;
  hash: string;
  price: number;
  datasets: Array<string>;
  accuracy: number;
}

const DatasetRow = ({ name, labels, hash, price, datasets, accuracy }: DatasetProps) => (
  <tr className="bg-[#ffffff05] border-gray-700 text-white hover:!text-amber-300">
    <td className="px-6 py-4 font-medium whitespace-nowra">{name}</td>
    <td className="px-6 py-4">
      {" "}
      {labels.map((value) => (
        <span key={value} className="text-sm font-medium me-2 px-2.5 py-0.5 rounded bg-gray-700">
          {value}
        </span>
      ))}
    </td>
    <td className="px-6 py-4">{hash}</td>
    <td className="flex flex-col px-6 py-4">
      {datasets.map((value) => (
        <span key={value}>{value}</span>
      ))}
    </td>
    <td className="px-6 py-4">{accuracy}%</td>
    <td className="px-6 py-4">{price} DEV</td>
  </tr>
);
