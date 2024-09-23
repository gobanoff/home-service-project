import React, { useState } from "react";
import classNames from "classnames";
import BusinessCard from "./BusinessCard";
import styles from "./BusinessList.module.scss";
import { Category } from "../category/types";
import { useBusinesses } from "./hooks";
import { Business } from "./types";
import Button from "../common/Button";

interface BusinessListProps {
  categoryName?: Category["name"];
  className?: string;
}

const BusinessList: React.FC<BusinessListProps> = ({
  categoryName,
  className,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;
  const { data } = useBusinesses({
    page: currentPage,
    limit,
  });

  const businesses: Business[] = data?.businesses ?? [];
  const totalBusinesses: number = data?.totalBusinesses ?? 1;
  const totalPages: number = Math.ceil(totalBusinesses / limit);

  const filteredBusiness = categoryName
    ? businesses.filter((business) => business.category === categoryName)
    : businesses;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className={classNames(styles.container, className)}>
        {filteredBusiness.map((business) => (
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

export default BusinessList;
