function isMeetingWithinWorkingHours(startTime, endTime, meetingStartTime, meetingDuration) {
  startTime = formatTime(startTime);
  endTime = formatTime(endTime);
  meetingStartTime = formatTime(meetingStartTime);

  let [startHour, startMinute] = startTime.split(':');
  let [endHour, endMinute] = endTime.split(':');
  let [meetingStartHour, meetingStartMinute] = meetingStartTime.split(':');

  startHour = parseInt(startHour, 10);
  startMinute = parseInt(startMinute, 10);
  endHour = parseInt(endHour, 10);
  endMinute = parseInt(endMinute, 10);
  meetingStartHour = parseInt(meetingStartHour, 10);
  meetingStartMinute = parseInt(meetingStartMinute, 10);

  const meetingEndHour = Math.floor(meetingDuration / 60);
  const meetingEndMinute = meetingDuration % 60;

  if (meetingStartHour < startHour || (meetingStartHour === startHour && meetingStartMinute < startMinute)) {
    return false;
  } else if (meetingStartHour > endHour || (meetingStartHour === endHour && meetingStartMinute + meetingEndMinute > endMinute)) {
    return false;
  } else if (meetingStartHour + meetingEndHour > endHour || (meetingStartHour + meetingEndHour === endHour && meetingStartMinute + meetingEndMinute > endMinute)) {
    return false;
  }

  return true;
}

function formatTime(time) {
  let [hour, minute] = time.split(':');
  hour = hour.padStart(2, '0');
  minute = minute.padStart(2, '0');
  return `${hour}:${minute}`;
}

// eslint-disable-next-line no-console
console.log(isMeetingWithinWorkingHours('08:00', '17:30', '09:00', 60));
