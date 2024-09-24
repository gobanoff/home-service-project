import classNames from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rounded?: boolean;
  small?: boolean;
  large?: boolean;
  mini?: boolean;
  special?: boolean;
  booking?: boolean;
  status?: boolean;
  pagination?: boolean;
  profile?: boolean;
  confirm?: boolean;
}
const Button = ({
  className,
  rounded,
  small,
  mini,
  large,
  special,
  booking,
  status,
  pagination,
  profile,
  confirm,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles.button,
        rounded && styles.rounded,
        small && styles.small,
        mini && styles.mini,
        large && styles.large,
        special && styles.special,
        booking && styles.booking,
        status && styles.status,
        pagination && styles.pagination,
        profile && styles.profile,
        confirm && styles.confirm,
        className
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
