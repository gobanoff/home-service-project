import classNames from "classnames";
import styles from "./UrlIcon.module.scss";

const UrlIcon = ({ className, style = {}, url }) => {
  return (
    <div
      className={classNames(styles.icon, className)}
      style={{
        maskImage: `url(${url})`,
        WebkitMaskImage: `url(${url})`,
        ...style,
      }}
    />
  );
};

export default UrlIcon;