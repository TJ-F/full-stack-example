function format24to12(time) {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = ((hours + 11) % 12 + 1).toString().padStart(2, '0');
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

function format12to24(time) {
  const [timePart, period] = time.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);
  if (period === 'PM' && hours < 12) {
    hours += 12;
  }
  if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}


function convertTo24HourDateTime(timeStr) {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');

  if (modifier === 'PM' && hours !== '12') {
    hours = String(parseInt(hours, 10) + 12);
  }
  if (modifier === 'AM' && hours === '12') {
    hours = '00';
  }

  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
};

export { format24to12, format12to24, convertTo24HourDateTime };