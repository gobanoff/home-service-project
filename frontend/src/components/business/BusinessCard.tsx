import Button from "../common/Button";
import styles from "./BusinessCard.module.scss";
import { Business } from "./types";
import { useNavigate } from "react-router-dom";
interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (business._id) {
      navigate(`/details/${business._id}`);
    } else {
      console.error("Business ID is undefined");
    }
  };
  return (
    <div className={styles.card}>
      {business.imageUrls.length && (
        <img
          src={business.imageUrls[0]}
          alt={business.name}
          className={styles.image}
        />
      )}
      <div className={styles.infoContainer}>
        <span className={styles.chip}>{business.category}</span>
        <h3 className={styles.name}>{business.name}</h3>
        <p className={styles.contactPerson}>{business.contactPerson}</p>
        <p className={styles.address}>{business.address}</p>
        <Button onClick={handleCardClick}>Book now</Button>
      </div>
    </div>
  );
};

export default BusinessCard;
