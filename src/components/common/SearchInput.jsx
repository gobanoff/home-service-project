import styles from "./SearchInput.module.scss";

const SearchInput = ({ ...props }) => {
  return (
    <input className={styles.searchInput} placeholder="Search" {...props} />
  );
};

export default SearchInput;
