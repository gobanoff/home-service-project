import styles from "./Avatar.module.scss";
import { PropsWithChildren } from "react";

const Avatar = ({ children }: PropsWithChildren) => {
  return <div className={styles.avatar}>{children}</div>;
};

export default Avatar;
