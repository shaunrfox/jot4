import React from "react";
import { format } from "date-fns";
import Text, { TextProps } from "~/components/Text";

interface DateDisplayProps extends TextProps {
  utcDate: string;
  dateFormat?: string;
  font?: "default" | "mono";
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  sx?: SxProp;
}

const DateDisplay: React.FC<DateDisplayProps> = ({
  utcDate,
  dateFormat,
  font = "default",
  level = 3,
  sx,
}) => {
  const localDate = format(new Date(utcDate), dateFormat || "yyyy-MM-dd");

  return (
    <Text font={font} level={level} sx={sx}>
      {localDate}
    </Text>
  );
};

export default DateDisplay;
