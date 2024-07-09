export function getDateDifferenceFromNow(time) {
  let difference = new Date().getTime() - new Date(time).getTime();
  difference = difference / 1000;
  let minuteDifference = Math.floor(difference / 60);
  let hourDifference = Math.floor(difference / 3600);

  let dayDifference =
    hourDifference >= 24 ? Math.floor(hourDifference / 24) : null;
  let weekDifference =
    dayDifference >= 7 ? Math.floor(dayDifference / 7) : null;

  let message;

  if (dayDifference >= 1) {
    message = ` ${dayDifference}  ${dayDifference > 1 ? "days" : "day"}   `;
    hourDifference = 0;
  }
  if (hourDifference > 0) {
    message = ` ${hourDifference}  ${hourDifference > 1 ? "hours" : "hour"}   `;
  }

  if (minuteDifference > 0) {
    if (message) {
      if (minuteDifference < 60) {
        message = `${message} ${minuteDifference} minutes`;
      } else {
        message = `${message}`;
      }
    } else {
      message = `${minuteDifference} minutes`;
    }
  }

  if (difference) {
    message = message ? `${message} ` : `${Math.round(difference)} seconds`;
  }

  return message;
}
