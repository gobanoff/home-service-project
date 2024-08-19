import styles from "./SearchInput.module.scss";

interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = ({ ...props }: SearchInputProps) => {
  return (
    <div>
      <input className={styles.searchInput} placeholder="Search" {...props} />
    </div>
  );
};

export default SearchInput;
