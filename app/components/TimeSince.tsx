import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addDefaultLocale(en);

export default function TimeSince({ date }: { date: Date }) {
  const dateToInt = new Date(date).getTime();

  return (
    <ReactTimeAgo date={dateToInt} locale="en-US" timeStyle="round-minute" />
  );
}
