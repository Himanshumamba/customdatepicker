import React from "react";
import WeekdayDateRangePicker from "./components/WeekdayDateRangePicker";

const App = () => {
  const predefinedRanges = [
    {
      label: "Last 7 Days",
      start: new Date(new Date().setDate(new Date().getDate() - 7)),
      end: new Date(),
    },
    {
      label: "Last 30 Days",
      start: new Date(new Date().setDate(new Date().getDate() - 30)),
      end: new Date(),
    },
  ];

  const handleDateRangeChange = (dateRange, weekends) => {
    console.log("Selected Date Range:", dateRange);
    console.log("Weekends in Range:", weekends);
  };

  return (
    <div className="date_container">
      <h1>Select Date </h1>
      <WeekdayDateRangePicker
        predefinedRanges={predefinedRanges}
        onChange={handleDateRangeChange}
      />
    </div>
  );
};

export default App;
