import * as React from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";


interface DatePickerProps {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  disablePast?: boolean;
  minDate?: Dayjs;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, disablePast,minDate}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateCalendar", "DateCalendar"]}>
        <DateCalendar value={value} onChange={onChange} disablePast={disablePast}
        minDate={minDate} />
      </DemoContainer>
     
    </LocalizationProvider>
  );
};

export default DatePicker;
