export default function Datasets() {
  const data = [
    {
      name: "Black Cat Dataset",
      labels: ["Cat", "Black"],
      hash: "e5c5ff1408f9793b623b1a9c83a24d27533f05ea7ab93ee67f63f4145dbdb330",
      price: 1,
      fee: 0.2,
    },
    {
      name: "Brown Cat Dataset",
      labels: ["Cat", "Brown"],
      hash: "2cc01342ecbde92646b4d1aa6018b5d82f00ea8b743bc6078396c5eed407a0ae",
      price: 2,
      fee: 0.3,
    },
    {
      name: "Dogs Dataset",
      labels: ["Dog", "Black"],
      hash: "9ef339f0ad2e21e9827990e73882224e2de8ed97b1d95d387f9e67ba04f50a68",
      price: 0.5,
      fee: 0.1,
    },
  ];
  return (
    <div className="flex flex-col w-full">
      <span className="text-2xl border-b-[0.5px] border-neutral-700 py-2 font-semibold">Data Sources</span>
      <div className="flex flex-col w-full overflow-x-auto shadow-md sm:rounded-lg my-6">
        <table className="text-sm text-left rtl:text-righ">
          <thead className="text-xs  uppercase bg-[#ffffff0d] text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
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
                labels={value.labels}
                hash={value.hash}
                price={value.price}
                fee={value.fee}
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
  fee: number;
}

const DatasetRow = ({ name, labels, hash, price, fee }: DatasetProps) => (
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
    <td className="px-6 py-4">{price} DEV</td>
    <td className="px-6 py-4">{fee} DEV</td>
  </tr>
);
