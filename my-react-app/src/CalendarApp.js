import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment-timezone";
import './App.css'

function CalendarApp() {
    const [date, setDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [timezone, setTimezone] = useState("");
    const [timeSlots, setTimeSlots] = useState([]);

    const timezones = moment.tz.names();

    useEffect(() => {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setTimezone(userTimezone);
        generateTimeSlots(userTimezone);
    }, []);

    const generateTimeSlots = (tz) => {
        const slots = [];
        for (let hour = 9; hour <= 16; hour++) {
            const localTime1 = moment.tz({ hour, minute: 0 }, tz).format("hh:mm A");
            const localTime2 = moment.tz({ hour, minute: 30 }, tz).format("hh:mm A");
            slots.push(localTime1, localTime2);
        }
        setTimeSlots(slots);
    };

    const handleTimezoneChange = (event) => {
        const selectedTz = event.target.value;
        setTimezone(selectedTz);
        generateTimeSlots(selectedTz);
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
        setSelectedTime(null);
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        console.log(`Selected Time: ${time} (${timezone})`);
    };

    return (
        <div className="App">
            <h1>Schedule Your Event</h1>
            <Calendar onChange={handleDateChange} value={date} />
            <h2>Select Timezone:</h2>
            <select value={timezone} onChange={handleTimezoneChange}>
                {timezones.map((tz, index) => (
                    <option key={index} value={tz}>
                        {tz}
                    </option>
                ))}
            </select>
            <h2>Available Times for {date.toDateString()} ({timezone}):</h2>
            <ul>
                {timeSlots.map((time, index) => (
                    <li
                        key={index}
                        onClick={() => handleTimeSelect(time)}
                        style={{
                            cursor: "pointer",
                            backgroundColor: selectedTime === time ? "#1a73e8" : "#f1f3f4",
                            color: selectedTime === time ? "white" : "#333",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            margin: "5px",
                        }}
                    >
                        {time}
                    </li>
                ))}
            </ul>
            {selectedTime && <h3>You selected: {selectedTime} ({timezone})</h3>}
        </div>
    );
}

export default CalendarApp;
