import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { Box, Button, Drawer, Typography } from "@mui/material";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import { styled } from "@mui/system";
import styles from "./BusinessSidebarModal.module.scss";
import axios from "axios";
import { useVoting } from "./../VotingContext";

interface BusinessSidebarModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  services: string;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  width?: string | number;
  backgroundColor?: string;
  opacity?: number;
  title?: string;
  children?: React.ReactNode;
}

const DrawerStyled = styled(Drawer)(() => ({
  "& .MuiDrawer-paper": {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#ffffff",
    opacity: 0.9,
    padding: "16px",
  },
}));

const BusinessSidebarModal = ({
  isOpen,
  onClose,
  category,
  services,
  setMessage,
  width = "100%",
  backgroundColor = "#ffffff",
  opacity = 1,
  title = "Book on Service",
  children,
}: BusinessSidebarModalProps) => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<Dayjs | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const { increaseVote, increaseService } = useVoting();

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
    if (newDate && selectedTime) {
      const combinedDateTime = newDate
        .hour(selectedTime.hour())
        .minute(selectedTime.minute());
      if (combinedDateTime.isBefore(dayjs())) {
        setSelectedTime(null);
      }
    }
    setErrorMessage(null);
  };

  const handleTimeChange = (newTime: Dayjs | null) => {
    setSelectedTime(newTime);
    if (selectedDate && newTime) {
      const combinedDateTime = selectedDate
        .hour(newTime.hour())
        .minute(newTime.minute());
      if (combinedDateTime.isBefore(dayjs())) {
        setErrorMessage("You cannot select a past time");
        setSelectedTime(null);
      } else {
        setErrorMessage(null);
      }
    }
  };

  const createBooking = async () => {
    if (selectedDate && selectedTime) {
      const businessId = window.location.pathname.split("/")[2];
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userEmail = user.email;
      const userName = user.name;

      const bookingData = {
        businessId: businessId,
        date: selectedDate.format("YYYY-MM-DD"),
        time: selectedTime.format("HH:mm"),
        userEmail: userEmail,
        userName: userName,
        status: "confirmed",
      };

      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.post(
          `${apiUrl}/bookings`,
          // "http://localhost:3000/bookings",
          bookingData
        );
        console.log("Booking successful:", response.data);
        setMessage("Your booking successfully completed !");
        onClose();

        if (category === "cleaning") increaseVote(0);
        if (category === "painting") increaseVote(1);
        if (category === "electric") increaseVote(2);
        if (category === "shifting") increaseVote(3);
        if (category === "plumbing") increaseVote(4);
        if (category === "repair") increaseVote(5);

        if (services === "UAB Valymas") increaseService(0);
        if (services === "Išsivalyk pats") increaseService(1);
        if (services === "Moki veži") increaseService(2);
        if (services === "Elektrikas į namus") increaseService(3);
        if (services === 'UAB "Dažytoja į namus"') increaseService(4);
        if (services === "Santechnikos darbai") increaseService(5);
      } catch (error) {
        console.error("Error creating booking:", error);
        setErrorMessage("Failed to create booking. Please try again.");
      }
    } else {
      setErrorMessage("Date and Time must be selected");
    }
  };

  return (
    <DrawerStyled
      anchor="right"
      open={isOpen}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      className={styles.sidebarModal}
      sx={{
        "& .MuiDrawer-paper": {
          width: width,
          maxWidth: "490px",
          backgroundColor: backgroundColor,
          opacity: opacity,
        },
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", mt: 2, fontWeight: "900" }}
        >
          {title}
        </Typography>
        <Box sx={{ p: 2 }}>
          {children || (
            <Typography variant="body1" className={styles.BookingContainer}>
              <span className={styles.selectSpan}>
                Select Date and Time slot to book on a service
              </span>
              <strong className={styles.strong}>Select Date</strong>
            </Typography>
          )}
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            disablePast={true}
            minDate={dayjs()}
          />

          <h2>Select Time Slot</h2>

          <br />
          <TimePicker
            value={selectedTime}
            selectedDate={selectedDate}
            onChange={handleTimeChange}
          />
          {errorMessage && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}

          <Button
            variant="contained"
            type="submit"
            onClick={createBooking}
            sx={{ mt: 2 }}
            disabled={!selectedDate || !selectedTime}
          >
            Book
          </Button>
          <Button onClick={onClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Box>
    </DrawerStyled>
  );
};

export default BusinessSidebarModal;
