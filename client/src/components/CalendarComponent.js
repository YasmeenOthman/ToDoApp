import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CalendarComponent() {
  return (
    <div>
      <DatePicker selected={new Date()} onChange={() => {}} inline />
    </div>
  );
}

export default CalendarComponent;
