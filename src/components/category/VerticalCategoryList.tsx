import CategoryCard from "./CategoryCard";
import { useState, useEffect } from "react";
import { Category } from "./types";
import { fetchCategories } from "./api";
import styles from "./VerticalCategoryList.module.scss";

const VerticalCategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories()
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <h2 className={styles.title}>Categories</h2>
      {categories.map((category) => (
        <CategoryCard key={category.name} category={category} />
      ))}
    </div>
  );
};

export default VerticalCategoryList;
