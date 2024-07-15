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
  opacity = 0.9,
  title = "Book on a service",
  children,
}: BusinessSidebarModalProps) => {
  const handleTimeChange = (newTime: Dayjs | null) => {
    console.log("Selected time:", newTime?.format("HH:mm"));
  };

  const handleReserveTime = () => {};
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
          maxWidth: "400px",
          backgroundColor: backgroundColor,
          opacity: opacity,
        },
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
          {title}
        </Typography>
        <Box sx={{ p: 2 }}>
          {children || (
            <Typography variant="body1" className={styles.BookingContainer}>
              Select Date and Time slot to book on a service
              <strong>Select Date</strong>
            </Typography>
          )}
          <DatePicker />
          <h2>Select Time Slot</h2>
          <br />
          <TimePicker value={null} onChange={handleTimeChange} />
          <Button
            variant="contained"
            type="submit"
            onClick={handleReserveTime}
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