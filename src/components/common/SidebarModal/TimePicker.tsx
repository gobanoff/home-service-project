import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { styled } from "@mui/system";

interface TimePickerProps {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}

const TimeSlot = styled("div")({
  padding: "8px",
  width: "calc(100% / 3 - 16px)",
  margin: "4px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "700",
  userSelect: "none",
  textAlign: "center",
  "&:hover": { color: "white", backgroundColor: "red" },
  "&.selected": {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  "&.disabled": {
    backgroundColor: "#e0e0e0",
    color: "#9e9e9e",
    cursor: "not-allowed",
  },
});

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  const [selectedTime, setSelectedTime] = React.useState<Dayjs | null>(value);

  const handleTimeClick = (time: Dayjs) => {
    if (!isTimeDisabled(time)) {
      setSelectedTime(time);
      onChange(time);
    }
  };

  const isTimeDisabled = (time: Dayjs) => {
    const now = dayjs();
    return time.isBefore(now);
  };

  const renderTimeSlots = () => {
    const timeSlots = [];
    const startTime = dayjs().startOf("day").add(8, "hour");
    const endTime = dayjs().startOf("day").add(21.3, "hour");
    let currentTime = startTime;

    while (currentTime.isBefore(endTime)) {
      timeSlots.push(currentTime);
      currentTime = currentTime.add(30, "minute");
    }

    return timeSlots.map((time, index) => (
      <TimeSlot
        key={index}
        className={`${selectedTime?.isSame(time) ? "selected" : ""} ${
          isTimeDisabled(time) ? "disabled" : ""
        }`}
        onClick={() => handleTimeClick(time)}
      >
        {time.format("HH:mm")}
      </TimeSlot>
    ));
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>{renderTimeSlots()}</div>
  );
};

export default TimePicker;
