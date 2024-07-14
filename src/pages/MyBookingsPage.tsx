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
  const { id, date } = useParams<{ id: string; date: string; }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinessAndBookings = async () => {
      try {
        if (!date || isNaN(new Date(date).getTime())) {
          throw new Error("Invalid date format");
        }
        const response = await axios.get<{
          business: Business;
          bookings: Booking[];
        }>(`http://localhost:3000/businesses/${id}/bookings/date/${date}`);
        setBusiness(response.data.business);
        setBookings(response.data.bookings);
      } catch (error) {
        console.error("Error fetching business and bookings data:", error);
        setError("Failed to fetch business and bookings data");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessAndBookings();
  }, [id, date]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!business || bookings.length === 0) {
    return <div className={styles.noData}>No data available</div>;
  }

  return (
    <div>
      <h1>My Bookings</h1>
      <h2>{business.name}</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.businessId}>
            {booking.userName} - {booking.date.toString()} - {booking.time} -
            {booking.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookingsPage;
