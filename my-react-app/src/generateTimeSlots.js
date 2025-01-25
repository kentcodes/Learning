const generateTimeSlots = (startHour, endHour) => {
    const timeSlots = [];
    for (let hour = startHour; hour <= endHour; hour++) {
        // Add the hour with ":00"
        timeSlots.push(`${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`);
        
        // Add the half-hour slot unless it's the last hour
        if (hour !== endHour) {
            timeSlots.push(`${hour % 12 || 12}:30 ${hour < 12 ? "AM" : "PM"}`);
        }
    }
    return timeSlots;
};
