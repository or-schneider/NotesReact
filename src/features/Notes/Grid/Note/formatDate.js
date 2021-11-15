const monthsNumericToNames = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

export default function formatDate(date) {
  date = new Date(date);

  const minutes = date.getMinutes();
  const hours = date.getHours();
  const day = date.getDate();
  const month = date.getMonth() + 1;

  let formattedTimeExtension = "";
  if (hours >= 12) formattedTimeExtension = "pm";
  else formattedTimeExtension = "am";

  let hours12 = hours % 12;
  if (hours === 12) hours12 = 12;

  let minutesString = "" + minutes;
  if (minutes < 10) minutesString = "0" + minutesString;
  const formattedTime = `${hours12}:${minutesString} ${formattedTimeExtension}`;

  let dayExtension;
  if (10 <= day && day <= 20) dayExtension = "th";
  else if (day % 10 === 1) dayExtension = "st";
  else if (day % 10 === 2) dayExtension = "nd";
  else if (day % 10 === 3) dayExtension = "rd";
  else dayExtension = "th";

  const formattedDate = `${monthsNumericToNames[month]} ${day}${dayExtension}`;

  const finalFormattedDate = `${formattedDate} ${formattedTime}`;

  return finalFormattedDate;
}
