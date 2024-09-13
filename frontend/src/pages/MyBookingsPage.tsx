import { useEffect, useState } from "react";
import axios from "axios";
import { Business } from "../components/business/types";
import Button from "../components/common/Button";
import { LuClock5, LuUser, LuCalendar } from "react-icons/lu";
import { FiMapPin } from "react-icons/fi";
import styles from "./MyBookingsPage.module.scss";
import buttonStyles from "../components/common/Button.module.scss";

interface Booking {
  _id: string;
  businessId: string;
  date: Date;
  time: string;
  userEmail: string;
  userName: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
}

const MyBookingsPage = () => {
  const [businesses, setBusinesses] = useState<{ [key: string]: Business }>({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<
    "confirmed" | "pending" | "cancelled" | "completed"
  >("confirmed");

  useEffect(() => {
    const fetchDataAndUpdateBookings = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const email = user.email;

      if (!email) {
        setError("Email not found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const apiUrl = process.env.API_URL;

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

        const now = new Date();
        const updatedBookings = userBookings.map((booking) => {
          const bookingDateTime = new Date(booking.date);
          bookingDateTime.setHours(Number(booking.time.split(":")[0]));
          bookingDateTime.setMinutes(Number(booking.time.split(":")[1]));

          if (booking.status === "confirmed" && now >= bookingDateTime) {
            booking.status = "pending";
            axios.put(
              `${apiUrl}/bookings/${booking._id}`,
              // `http://localhost:3000/bookings/${booking._id}`,
              {
                status: "pending",
              }
            );
          }
          return booking;
        });

        setBookings(updatedBookings);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchDataAndUpdateBookings();

    const intervalId = setInterval(fetchDataAndUpdateBookings, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleFilterClick = (
    filter: "confirmed" | "pending" | "cancelled" | "completed"
  ) => {
    setActiveFilter(filter);
  };

  const handleSetAsComleted = async (bookingId: string) => {
    try {
      const apiUrl = process.env.API_URL;
      await axios.put(
        `${apiUrl}/bookings/${bookingId}`,
        // `http://localhost:3000/bookings/${bookingId}`,
        {
          status: "completed",
        }
      );
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "completed" }
            : booking
        )
      );
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
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
            onClick={() => handleFilterClick("completed")}
            className={`${buttonStyles.status} ${
              activeFilter === "completed" ? buttonStyles.active : ""
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
                    {booking.status === "pending" && (
                      <span className={styles.buttonSpan}>
                        <Button
                          pagination
                          onClick={() => handleSetAsComleted(booking._id)}
                        >
                          Set as Completed
                        </Button>
                      </span>
                    )}
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
