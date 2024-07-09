import CategoryCard from "./CategoryCard";
import { useEffect, useState } from "react";
import { Category } from "./types";
import { fetchCategories } from "./api";
import styles from "./CategoryList.module.scss";

const CategoryList = () => {
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
    <div className={styles.container}>
      {categories.map((category) => (
        <CategoryCard
          key={category.name}
          category={category}
          className={styles.card}
        />
      ))}
    </div>
  );
};

export default CategoryList;