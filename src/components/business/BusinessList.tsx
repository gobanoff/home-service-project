import classNames from "classnames";
import axios from "axios";
import { Category } from "../category/types";
import BusinessCard from "./BusinessCard";
import styles from "./BusinessList.module.scss";
import { useEffect, useState } from "react";
import { Business } from "./types";
import { fetchBusinesses } from "./api";

interface BusinessListProps {
  categoryName?: Category["name"];
  className?: string;
}

const BusinessList = ({ categoryName, className }: BusinessListProps) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    fetchBusinesses()
    
      .then((response) => {
        setBusinesses(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredBusiness = categoryName
    ? businesses.filter((business) => business.category === categoryName)
    : businesses;
  return (
    <div className={classNames(styles.container, className)}>
      {filteredBusiness.map((business) => (
        <BusinessCard key={business._id} business={business} />
      ))}
    </div>
  );
};

export default BusinessList;