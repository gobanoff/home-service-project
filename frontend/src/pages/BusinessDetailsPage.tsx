import styles from "./BusinessDetailsPage.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Business } from "../components/business/types";
import SimilarBusinessList from "../components/common/SimilarBusinessList";
import BusinessSidebarModal from "../components/common/SidebarModal/BusinessSidebarModal";
import Button from "../components/common/Button";
import { LuClock5 } from "react-icons/lu";
import { FaRegEnvelope } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import { LuUser } from "react-icons/lu";
import { FiMapPin } from "react-icons/fi";
import { CiExport } from "react-icons/ci";

const BusinessDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const apiUrl = process.env.API_URL;
        const response = await axios.get<Business>(
          // `http://localhost:3000/businesses/${id}`
          `${apiUrl}/businesses/${id}`
        );
        setBusiness(response.data);
      } catch (error) {
        console.error("Error fetching businesses data", error);
      }
    };

    fetchBusiness();
    window.scrollTo(0, 0);
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [id, message]);

  if (!business) {
    return <div className={styles.loading}>Loading...</div>;
  }
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.upperContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.imageContainer}>
            {business.imageUrls.length > 0 && (
              <img
                src={business.imageUrls[0]}
                alt={business.name}
                className={styles.image}
              />
            )}
          </div>
          <div className={styles.dataContainer}>
            <span className={styles.chip}>{business.category}</span>
            <h1 className={styles.name}>{business.name}</h1>
            <p className={styles.address}>
              <FiMapPin className={styles.fimappin} />
              {business.address}
            </p>
            <p className={styles.email}>
              <FaRegEnvelope className={styles.envelope} />
              {business.email}
            </p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <Button special>
            <CiExport className={styles.ciexport} />
          </Button>
          <p className={styles.contactPerson}>
            <LuUser className={styles.luser} />
            <span>{business.contactPerson}</span>
          </p>
          <p className={styles.available}>
            <LuClock5 className={styles.luclock} />
            <span> Available {business.available}</span>
          </p>
        </div>
      </div>

      <div className={styles.downContainer}>
        <div className={styles.downLeftContainer}>
          {message && <div className={styles.successMessage}>{message}</div>}
          <h2 className={styles.h2}>Description</h2>
          <p className={styles.about}>{business.about}</p>
          <h2 className={styles.h2}>Gallery</h2>
          <div className={styles.gallery}>
            <img
              src={business.imageUrls[0]}
              alt={business.name}
              className={styles.galImg}
            />
            <img
              src={business.imageUrls[0]}
              alt={business.name}
              className={styles.galImg}
            />
            <img
              src={business.imageUrls[0]}
              alt={business.name}
              className={styles.galImg}
            />
          </div>
        </div>
        <div className={styles.downRightContainer}>
          <Button booking onClick={openModal}>
            <GiNotebook className={styles.notebook} />
            <span>Book Appointment</span>
          </Button>

          <BusinessSidebarModal
            isOpen={isOpen}
            onClose={closeModal}
            category={business.category}
            services={business.name}
            serviceId={business._id}
            setMessage={setMessage}
          />
          <h3 className={styles.h3}>Similar Business</h3>
          <SimilarBusinessList category={business.category} />
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsPage;
