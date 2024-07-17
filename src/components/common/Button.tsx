//import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rounded?: boolean;
  small?: boolean;
  large?: boolean;
  special?: boolean;
  booking?: boolean;
  status?: boolean;

  // size: "small" | "medium" | "large" TODO
}
const Button = ({
  className,
  rounded,
  small,
  large,
  special,
  booking,
  status,

  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles.button,
        rounded && styles.rounded,
        small && styles.small,
        large && styles.large,
        special && styles.special,
        booking && styles.booking,
        status && styles.status,

        className
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};

//Button.propTypes = {
  //className: PropTypes.string,
 // rounded: PropTypes.bool,
  //small: PropTypes.bool,
  //large: PropTypes.bool,
 // special: PropTypes.bool,
 // booking: PropTypes.bool,
 // status: PropTypes.bool,};
export default Button;
