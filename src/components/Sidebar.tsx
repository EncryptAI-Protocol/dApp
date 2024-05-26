import { useState } from "react";
import type { IconType } from "react-icons";
import { MdOutlineDataObject } from "react-icons/md";
import { MdMiscellaneousServices } from "react-icons/md";
import { MdComputer } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const options = [
    { name: "Datasets", icon: MdOutlineDataObject, path: "/datasets" },
    { name: "Models", icon: MdMiscellaneousServices, path: "/models" },
    { name: "Inference", icon: MdComputer, path: "/Inference" },
  ];
  const [selected, setSelection] = useState(options[0].name);

  const getOptions = (options: Array<{ name: string; icon: IconType; path: string }>) =>
    options.map((value, index) => (
      <Option
        key={`${value.name}-${index}`}
        name={value.name}
        Icon={value.icon}
        isSelected={selected === value.name}
        path={value.path}
        onClick={() => setSelection(value.name)}
      />
    ));

  return (
    <div className="flex flex-col w-[100px] h-full px-2 py-2 border-r-[0.5px] border-neutral-700">
      {getOptions(options)}
    </div>
  );
}

interface OptiobProps {
  name: string;
  Icon: IconType;
  isSelected: boolean;
  path: string;
  onClick: () => void;
}

function Option({ name, Icon, isSelected, onClick, path }: OptiobProps) {
  return (
    <Link className="flex justify-center items-center" to={path}>
      <button
        className={`flex flex-col grow justify-center items-center p-2 my-2 rounded-xl ${
          isSelected ? "text-amber-300" : "text-white"
        } hover:bg-amber-100 hover:bg-opacity-25 hover:text-amber-300`}
        onClick={() => onClick()}
        type="button"
      >
        <Icon className="text-2xl mb-2" />
        <span className="text-m">{name}</span>
      </button>
    </Link>
  );
}
