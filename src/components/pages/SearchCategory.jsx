import { useParams } from "react-router-dom";

const SearchCategory = () => {
  const { category } = useParams();

  return <div>It's {category}</div>;
};

export default SearchCategory;