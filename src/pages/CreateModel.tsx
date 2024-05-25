export default function CreateModel() {
  return (
    <div className="flex flex-col grow">
      <span className="text-3xl font-bold border-b-[0.5px] border-neutral-700 py-4">Register Model</span>

      <form className="flex flex-col w-[25%] my-6">
        <TextInput label="Name" />
        <TextInput label="Hash" />
        <TextInput label="Dataset" />
        <TextInput label="Price" />
        <TextInput label="Source" />
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
}

const TextInput = ({ label }: TextInputProps) => (
  <div className="flex flex-col">
    <label className="my-4 text-sm font-medium text-white">{label}</label>
    <input className="border w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-1 focus:ring-amber-300 rounded-lg" />
  </div>
);
