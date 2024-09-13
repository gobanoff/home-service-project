import React, { useState, useEffect } from "react";
import classNames from "classnames";
import BusinessCard from "./BusinessCard";
import styles from "./BusinessCategoryList.module.scss";
import { Category } from "../category/types";
import { useBusinessesCategory } from "./hooks";
import { Business } from "./types";
import Button from "../common/Button";

interface BusinessCategoryListProps {
  categoryName?: Category["name"];
  className?: string;
}

const BusinessCategoryList: React.FC<BusinessCategoryListProps> = ({
  categoryName,
  className,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  const [prevCategoryName, setPrevCategoryName] = useState(categoryName);

  useEffect(() => {
    if (categoryName !== prevCategoryName) {
      setCurrentPage(1);
      setPrevCategoryName(categoryName);
    }
  }, [categoryName, prevCategoryName]);

  const { data } = useBusinessesCategory({
    page: currentPage,
    limit,
    categoryName,
  });

  const businesses: Business[] = data?.businesses ?? [];
  const totalBusinesses: number = data?.total ?? 0;
  const totalPages: number = Math.ceil(totalBusinesses / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className={classNames(styles.container, className)}>
        {businesses.map((business) => (
          <BusinessCard key={business._id} business={business} />
        ))}
      </div>

      <div className={styles.businessListPagination}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          pagination
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          pagination
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default BusinessCategoryList;
