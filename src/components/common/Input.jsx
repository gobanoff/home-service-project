import classNames from "classnames";
import styles from "./Input.module.scss";

const Input = ({ className, ...props }) => {
  return <input className={classNames(styles.input, className)} {...props} />;
};

export default Input;