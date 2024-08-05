import styles from "./MyBookingsPage.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Business } from "../components/business/types";
import Button from "../components/common/Button";
import { LuClock5, LuUser, LuCalendar } from "react-icons/lu";
import { FiMapPin } from "react-icons/fi";
import buttonStyles from "../components/common/Button.module.scss";

interface Booking {
  _id: string;
  businessId: string;
  date: Date;
  time: string;
  userEmail: string;
  userName: string;
  status: "confirmed" | "pending" | "cancelled";
}

const MyBookingsPage = () => {
  const [businesses, setBusinesses] = useState<{ [key: string]: Business }>({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<
    "confirmed" | "pending" | "cancelled"
  >("confirmed");

  useEffect(() => {
    const fetchBookings = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const email = user.email;

      if (!email) {
        setError("Email not found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        console.log("API URL:", apiUrl);
        if (!apiUrl) {
          throw new Error("API URL is not defined");
        }
        const bookingsResponse = await axios.get<Booking[]>(
          `${apiUrl}/bookings/user/${email}`
          //`http://localhost:3000/bookings/user/${email}`
        );
        const userBookings = bookingsResponse.data.filter(
          (booking) => booking.userEmail === email
        );
        setBookings(userBookings);

        const businessIds = bookingsResponse.data.map(
          (booking) => booking.businessId
        );
        const uniqueBusinessIds = [...new Set(businessIds)];

        const businessRequests = uniqueBusinessIds.map(
          (id) => axios.get<Business>(`${apiUrl}/businesses/${id}`)
          // (`http://localhost:3000/businesses/${id}`)
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

    fetchBookings();
  }, []);

  const handleFilterClick = (filter: "confirmed" | "pending" | "cancelled") => {
    setActiveFilter(filter);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (bookings.length === 0) {
    return <div className={styles.noData}>No bookings available</div>;
  }

  return (
    <>
      <div className={styles.myBookings}>
        <h1 className={styles.h1}>My Bookings</h1>
        <div className={styles.statusBar}>
          <Button
            onClick={() => handleFilterClick("confirmed")}
            className={`${buttonStyles.status} ${
              activeFilter === "confirmed" ? buttonStyles.active : ""
            }`}
          >
            Booked
          </Button>
          <Button
            onClick={() => handleFilterClick("pending")}
            className={`${buttonStyles.status} ${
              activeFilter === "pending" ? buttonStyles.active : ""
            }`}
          >
            In-Progress
          </Button>
          <Button
            onClick={() => handleFilterClick("cancelled")}
            className={`${buttonStyles.status} ${
              activeFilter === "cancelled" ? buttonStyles.active : ""
            }`}
          >
            Completed
          </Button>
        </div>
        <div className={styles.cardList}>
          {bookings
            .filter((booking) => booking.status === activeFilter)
            .map((booking) => (
              <div className={styles.bookingCard} key={booking._id}>
                <img
                  src={businesses[booking.businessId].imageUrls[0]}
                  alt={businesses[booking.businessId].name}
                  className={styles.image}
                />
                <div className={styles.dataList}>
                  <p className={styles.name}>
                    {businesses[booking.businessId]?.name}
                  </p>
                  <p className={styles.contactPerson}>
                    <LuUser
                      style={{
                        color: "#8056eb",
                        marginRight: "8px",
                        fontWeight: "700",
                        fontSize: "2rem",
                      }}
                    />
                    {businesses[booking.businessId].contactPerson}
                  </p>
                  <p className={styles.address}>
                    <FiMapPin
                      style={{
                        color: "#8056eb",
                        marginRight: "10px",
                        fontWeight: "700",
                        fontSize: "2rem",
                      }}
                    />
                    {businesses[booking.businessId].address}
                  </p>
                  <p className={styles.date}>
                    <LuCalendar
                      style={{
                        color: "#8056eb",
                        marginRight: "10px",
                        fontWeight: "700",
                        fontSize: "2rem",
                      }}
                    />
                    Service on :
                    <span className={styles.dateSpan}>
                      {new Date(booking.date).toLocaleDateString("lt-LT", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </span>
                  </p>
                  <p className={styles.time}>
                    <LuClock5
                      style={{
                        color: "#8056eb",
                        fontWeight: "700",
                        fontSize: "1.8rem",
                        marginRight: "10px",
                      }}
                    />
                    Service on :
                    <span className={styles.timeSpan}>{booking.time} val.</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MyBookingsPage;
