import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import styles from "./RootLayout.module.scss";

const RootLayout = () => {
  return (
    <>
      <Topbar />
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;