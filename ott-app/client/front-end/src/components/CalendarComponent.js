import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarComponent({ onDateChange }) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (onDateChange) {
      onDateChange(date); // call when component loads or when date/onDateChange changes
    }
  }, [date, onDateChange]);

  const onChange = (newDate) => {
    setDate(newDate);
    if (onDateChange) {
      onDateChange(newDate); // call when user changes date
    }
  };

  return (
    <div className="calendar ms-2 mt-2">
      <Calendar
        onChange={onChange}
        value={date}
        calendarType="gregory"
        // date can only be today or later
        minDate={new Date()}
      />
      <p>Selected date: {date.toDateString()}</p>
    </div>
  );
}

export default CalendarComponent;
