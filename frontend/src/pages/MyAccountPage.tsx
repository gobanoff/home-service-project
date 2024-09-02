import styles from "./MyAccountPage.module.scss";
//import EmailForm from "../components/common/EmailForm";
import { Business } from "../components/business/types";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/common/Button";
import ProfileModal from "../components/common/MyAccountModals/ProfileModal";
import SettingsModal from "../components/common/MyAccountModals/SettingsModal";
import PaymentModal from "../components/common/MyAccountModals/PaymentModal";
import NotificationModal from "../components/common/MyAccountModals/NotificationModal";
import DocumentsModal from "../components/common/MyAccountModals/DocumentsModal";
import ContactsModal from "../components/common/MyAccountModals/ContactsModal";
import UpgradeModal from "../components/common/MyAccountModals/UpgradeModal";
import { Link } from "react-router-dom";
import { ROUTES } from "../router/consts";

interface Booking {
  _id: string;
  businessId: string;
  date: Date;
  time: string;
  userEmail: string;
  userName: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
}
const MyAccountPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [businesses, setBusinesses] = useState<{ [key: string]: Business }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openModalType, setOpenModalType] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const bookingsPerPage = 8;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [address, setAddress] = useState<string>(user.address);

  useEffect(() => {
    const fetchAllMyBookings = async () => {
      try {
        const apiUrl = process.env.API_URL;

        if (!apiUrl) {
          throw new Error("API URL is not defined");
        }
        const bookingsResponse = await axios.get<Booking[]>(
          `${apiUrl}/bookings/user/${email}`
          // `http://localhost:3000/bookings/user/${email}`
        );
        const userBookings = bookingsResponse.data.filter(
          (booking) => booking.userEmail === email
        );
        setBookings(userBookings);
        const businessIds = userBookings.map((booking) => booking.businessId);
        const uniqueBusinessIds = [...new Set(businessIds)];

        const businessRequests = uniqueBusinessIds.map((id) =>
          axios.get<Business>(
            `${apiUrl}/businesses/${id}`
            // `http://localhost:3000/businesses/${id}`
          )
        );
        const businessesResponses = await Promise.all(businessRequests);
        const businessesData = businessesResponses.reduce((acc, response) => {
          acc[response.data._id] = response.data;
          return acc;
        }, {} as { [key: string]: Business });

        setBusinesses(businessesData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    fetchAllMyBookings();
  }, [email]);

  const updateProfile = async (
    updatedName: string,
    updatedEmail: string,
    updatedAddress: string
  ) => {
    try {
      const apiUrl = process.env.API_URL;
      const response = await axios.put(
        `${apiUrl}/auth/${user._id}`,
        //`http://localhost:3000/auth/${user._id}`,
        {
          name: updatedName,
          email: updatedEmail,
          address: updatedAddress,
        }
      );
      const updatedUser = response.data;

      setName(updatedUser.name);
      setEmail(updatedUser.email);
      setAddress(updatedUser.address);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      setError("Failed to update profile");
      console.error(error);
    }
  };
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const openModal = (type: string) => {
    setOpenModalType(type);
  };

  const closeModal = () => {
    setOpenModalType(null);
  };

  return (
    <div>
      <h1 className={styles.h1}>
        Welcome, <span className={styles.userName}>{name} </span>!
      </h1>
      <div className={styles.accountContainer}>
        <aside>
          <li>
            <Button profile onClick={() => openModal("profile")}>
              Profile
            </Button>
          </li>

          <li>Booking History</li>

          <li>
            <Button profile onClick={() => openModal("payment")}>
              Payments
            </Button>
          </li>

          <li>
            <Button profile onClick={() => openModal("settings")}>
              Privacy Settings
            </Button>
          </li>
          <Link to={ROUTES.MY_BOOKINGS}>
            <li>Scheduled Services</li>
          </Link>

          <li>Community Forum</li>
          <li>
            <Button profile onClick={() => openModal("upgrade")}>
              Upgrade Account
            </Button>
          </li>

          <li>
            <Button profile onClick={() => openModal("contacts")}>
              Contacts
            </Button>
          </li>

          <li>
            <Button profile onClick={() => openModal("documents")}>
              Documents
            </Button>
          </li>
          <a
            href="https://www.topsport.lt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>Help Center</li>
          </a>

          <li>
            <Button profile onClick={() => openModal("notifications")}>
              Notifications
            </Button>
          </li>
        </aside>
        <div className={styles.centerContainer}>
          {openModalType === "profile" && (
            <ProfileModal
              isOpen={true}
              onClose={closeModal}
              address={address}
              name={name}
              email={email}
              updateProfile={updateProfile}
            />
          )}
          {openModalType === "settings" && (
            <SettingsModal isSettingsOpen={true} onClose={closeModal} />
          )}
          {openModalType === "payment" && (
            <PaymentModal isPaymentOpen={true} onClose={closeModal} />
          )}
          {openModalType === "notifications" && (
            <NotificationModal isNotificationOpen={true} onClose={closeModal} />
          )}
          {openModalType === "documents" && (
            <DocumentsModal isDocumentsOpen={true} onClose={closeModal} />
          )}
          {openModalType === "contacts" && (
            <ContactsModal isContactsOpen={true} onClose={closeModal} />
          )}
          {openModalType === "upgrade" && (
            <UpgradeModal isUpgradeOpen={true} onClose={closeModal} />
          )}
        </div>
        <div className={styles.rightContainer}>
          <h1 className={styles.h2}>
            Your <span>Booking</span> History...
          </h1>
          <div className={styles.bookingHistory}>
            {currentBookings.map((booking) => (
              <div className={styles.bookingList} key={booking._id}>
                <p className={styles.book}>
                  <span className={styles.name}>
                    {businesses[booking.businessId]?.name}
                  </span>
                  <span className={styles.category}>
                    {businesses[booking.businessId]?.category}
                  </span>
                </p>
                <p className={styles.book}>
                  <span className={styles.date}>
                    {new Date(booking.date).toLocaleDateString("lt-LT", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </span>
                  <span className={styles.time}>{booking.time}</span>
                  <span className={styles.status}>{booking.status}</span>
                </p>
              </div>
            ))}
            <div className={styles.myAccountPagination}>
              <Button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                pagination
              >
                Previous
              </Button>
              <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages || bookings.length === 0}
                pagination
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
