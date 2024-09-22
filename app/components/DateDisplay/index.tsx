import React from "react";

interface DateDisplayProps {
  utcDate: string;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ utcDate }) => {
  const localDate = new Date(utcDate);

  return <span>{localDate.toLocaleString()}</span>;
};

export default DateDisplay;
