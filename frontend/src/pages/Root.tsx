import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ToastList from "../components/common/Toast/ToastList";

const Root = () => {
  return (
    <>
      <div className="min-h-screen bg-black">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>

      <ToastList />
    </>
  );
};

export default Root;
