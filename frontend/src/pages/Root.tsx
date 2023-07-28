import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ToastList from "../components/common/Toast/ToastList";

const Root = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main>
        <Outlet />
        <ToastList />
      </main>
    </div>
  );
};

export default Root;
