import classNames from "classnames";
import { businesses } from "@/consts/business";
import BusinessCard from "./BusinessCard";
import styles from "./BusinessList.module.scss";

const BusinessList = ({ category, className }) => {
  const filteredBusiness = category
    ? businesses.filter((business) => business.category === category)
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