import styles from "./MyBookingsPage.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Business } from "../components/business/types";

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
  const { email } = useParams<{ email: string }>();
  const [businesses, setBusinesses] = useState<{ [key: string]: Business }>({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsResponse = await axios.get<Booking[]>(
          `http://localhost:3000/bookings/user/${email}`
        );
        const userBookings = bookingsResponse.data.filter(booking => booking.userEmail === email);
        setBookings(userBookings);
        

        const businessIds = bookingsResponse.data.map((booking) => booking.businessId);
        const uniqueBusinessIds = [...new Set(businessIds)];

        const businessRequests = uniqueBusinessIds.map((id) =>
          axios.get<Business>(`http://localhost:3000/businesses/${id}`)
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
  }, [email]);

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
    <div>
      <h1 className={styles.h1}>My Bookings</h1>
      <div>
        {bookings.map((booking) => (
          <div className={styles.bookingsContainer} key={booking._id}>
            {booking.userName} - {new Date(booking.date).toLocaleDateString()} - {booking.time} - {businesses[booking.businessId]?.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingsPage;
