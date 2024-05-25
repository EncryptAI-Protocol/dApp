import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Root() {
  return (
    <>
      <Sidebar />
      <div className="flex grow p-10">
        <Outlet />
      </div>
    </>
  );
}
