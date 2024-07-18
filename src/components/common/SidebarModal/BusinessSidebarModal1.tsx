import { Box, Button, Drawer, Typography } from "@mui/material";
import DatePicker from "./DatePicker";
import  { Dayjs } from "dayjs";
import React, { useState } from "react";
import TimePicker from "./TimePicker";
import { styled } from "@mui/system";
import styles from "./BusinessSidebarModal.module.scss";
import axios from "axios";


interface BusinessSidebarModalProps {
  isOpen: boolean;
  onClose: () => void;
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
  width = "100%",
  backgroundColor = "#ffffff",
  opacity = 1,
  title = "Book on Service",
  children,
}: BusinessSidebarModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
    setErrorMessage(null);
  };

  const handleTimeChange = (newTime: Dayjs | null) => {
    setSelectedTime(newTime);
    setErrorMessage(null);
  };
 // const isDateTimeValid = (): boolean => {
  //  if (!selectedDate || !selectedTime) return false; 
  //  const now = dayjs(); 
  //  const selectedDateTime = dayjs(selectedDate).set({
  //    hour: selectedTime.hour(),
   //   minute: selectedTime.minute(),
    //  second: selectedTime.second(), });
  //  return selectedDateTime.isAfter(now);  };

  const createBooking = async () => {
    if (selectedDate && selectedTime ) {
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
        const response = await axios.post(
          "http://localhost:3000/bookings",
          bookingData
        );
        console.log("Booking successful:", response.data);
        onClose();
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
          <DatePicker value={selectedDate} onChange={handleDateChange} />

          <h2>Select Time Slot</h2>

          <br />
          <TimePicker value={selectedTime} onChange={handleTimeChange} />
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
