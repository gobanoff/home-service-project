//import BusinessDetailsPage from "../../pages/BusinessDetailsPage";
import styles from "./SimilarBusinessList.module.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Business } from "../business/types";

interface SimilarBusinessListProps {
  category: string;
}

const SimilarBusinessList: React.FC<SimilarBusinessListProps> = ({
  category,
}) => {
  const [similarBusinesses, setSimilarBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    const fetchSimilarBusinesses = async () => {
      try {
        const response = await axios.get<Business[]>(
         // `/api/businesses/category/${category}`
          `http://localhost:3000/businesses/category/${category}`
        );
        const firstThreeBusinesses = response.data.slice(0, 3);
        setSimilarBusinesses(firstThreeBusinesses);
      } catch (error) {
        console.error("Error fetching similar businesses:", error);
      }
    };

    fetchSimilarBusinesses();
  }, [category]);

  return (
    <div>
      <ul>
        {similarBusinesses.map((business) => (
          <div className={styles.card} key={business._id}>
            <div className={styles.image}>
              <img
                src={business.imageUrls[0]}
                alt={business.name}
                className={styles.image}
              />
            </div>
            <div className={styles.data}>
              <h4 className={styles.name}>{business.name}</h4>
              <p className={styles.contactPerson}>{business.contactPerson}</p>
              <p className={styles.address}>{business.address}</p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SimilarBusinessList;
