import React, { useState } from "react";
import "../styles/WeekdayDateRangePicker.css";

const WeekdayDateRangePicker = ({ predefinedRanges = [], onChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [isOpen, setIsOpen] = useState(false); 

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const formatDate = (date) => date.toISOString().split("T")[0];

  const getWeekendsInRange = (start, end) => {
    const weekends = [];
    let current = new Date(start);

    while (current <= end) {
      if (isWeekend(current)) {
        weekends.push(formatDate(current));
      }
      current.setDate(current.getDate() + 1);
    }

    return weekends;
  };

  const handleDateClick = (date) => {
    if (isWeekend(date)) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setStartDate(date);
      } else {
        setEndDate(date);
        const weekends = getWeekendsInRange(startDate, date);
        onChange([formatDate(startDate), formatDate(date)], weekends);
      }
    }
  };

  const renderDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      days.push(<div className="empty-day" key={`empty-${i}`} />);
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const currentDate = new Date(year, month, day);
      const isSelected =
        startDate &&
        endDate &&
        currentDate >= startDate &&
        currentDate <= endDate;
      const isHighlighted = startDate && !endDate && currentDate >= startDate;

      days.push(
        <div
          key={day}
          className={`day ${
            isWeekend(currentDate) ? "weekend" : ""
          } ${isSelected ? "selected" : ""} ${
            isHighlighted ? "highlighted" : ""
          }`}
          onClick={() => handleDateClick(currentDate)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const renderNavigation = () => (
    <div className="header">
      <button
        onClick={() => {
          if (month === 0) {
            setMonth(11);
            setYear((prev) => prev - 1); 
          } else {
            setMonth((prev) => prev - 1);
          }
        }}
      >
        Prev
      </button>
      <span>
        {year} - {month + 1}
      </span>
      <button
        onClick={() => {
          if (month === 11) {
            setMonth(0);
            setYear((prev) => prev + 1); 
          } else {
            setMonth((prev) => prev + 1);
          }
        }}
      >
        Next
      </button>
    </div>
  );
  
  const renderPredefinedRanges = () => (
    <div className="predefined-ranges">
      {predefinedRanges.map((range) => (
        <button
          key={range.label}
          onClick={() => {
            setStartDate(range.start);
            setEndDate(range.end);
            const weekends = getWeekendsInRange(range.start, range.end);
            onChange([formatDate(range.start), formatDate(range.end)], weekends);
          }}
        >
          {range.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="date-range-picker-container">
      <input
        type="text"
        placeholder="Select date range"
        readOnly
        value={
          startDate && endDate
            ? `${formatDate(startDate)} to ${formatDate(endDate)}`
            : ""
        }
        onClick={() => setIsOpen(!isOpen)} 
        className="date-picker-input"
      />
      {isOpen && (
        <div className="date-range-picker">
          {renderNavigation()}
          <div className="days">{renderDays()}</div>
          {renderPredefinedRanges()}
        </div>
      )}
    </div>
  );
};

export default WeekdayDateRangePicker;
