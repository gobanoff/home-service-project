import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";

const RootLayout = () => {
  return (
    <>
      <Topbar />
      <Outlet />
    </>
  );
};

export default RootLayout;