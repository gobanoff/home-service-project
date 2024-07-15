import { Box, Button, Drawer, Typography } from "@mui/material";
import DatePicker from "./DatePicker";
import { Dayjs } from "dayjs";
import React from "react";
import TimePicker from "./TimePicker";
import { styled } from "@mui/system";
import styles from "./BusinessSidebarModal.module.scss";

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
  const handleTimeChange = (newTime: Dayjs | null) => {
    console.log("Selected time:", newTime?.format("HH:mm"));
  };

  const createBooking = () => {};
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
             <span className={styles.selectSpan}> Select Date and Time slot to book on a service</span>
              <strong className={styles.strong}>Select Date</strong>
            </Typography>
          )}
          <DatePicker />
          <h2>Select Time Slot</h2>
          <br />
          <TimePicker value={null} onChange={handleTimeChange} />
          <Button
            variant="contained"
            type="submit"
            onClick={createBooking}
            sx={{ mt: 2 }}
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
