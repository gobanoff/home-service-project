import { useParams } from "react-router-dom";
import BusinessCategoryList from "@/components/business/BusinessCategoryList";
import VerticalCategoryList from "@/components/category/VerticalCategoryList";
import styles from "./SearchCategory.module.scss";

const SearchCategory = () => {
  const { category } = useParams();

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        <VerticalCategoryList />
      </div>
      <div className={styles.categoryContainer}>
        <h2 className={styles.title}>{category}</h2>
        <BusinessCategoryList
          categoryName={category}
          className={styles.businessList}
        />
      </div>
    </div>
  );
};

export default SearchCategory;
