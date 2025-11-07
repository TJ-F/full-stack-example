import React from 'react';

// the tee time operations will be limited to one day, since that is all that displays on the webpage
class TeeTime {
    constructor(time, num_golfers, total_price, availabile, paid) {
        this.time = time;
        this.num_golfers = num_golfers;
        this.total_price = total_price;
        this.availabile = availabile;
        this.paid = paid;
    }
}

// get a list of every available tee time for the day
function GenerateDefaultTeeTimes() {
    const now = new Date();
    // Convert to EST (Eastern Standard Time)
    const estNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));

    // Round up to the next 15-minute interval
    let minutes = estNow.getMinutes();
    let roundedMinutes = Math.ceil(minutes / 15) * 15;
    if (roundedMinutes === 60) {
        estNow.setHours(estNow.getHours() + 1);
        roundedMinutes = 0;
    }
    estNow.setMinutes(roundedMinutes, 0, 0);

    // Start time: rounded EST time or 8:00 AM, whichever is later
    const startHour = Math.max(estNow.getHours(), 8);
    const startMinute = estNow.getHours() > 8 ? estNow.getMinutes() : 0;
    const endHour = 20; // 8:00 PM

    const teeTimeArr = [];
    const numGolfers = 4;
    const available = true;

    for (let hour = startHour; hour <= endHour; hour++) {
        for (let min = (hour === startHour ? startMinute : 0); min < 60; min += 15) {
            if (hour === endHour && min > 0) break;
            // Format time as "hh:mm AM/PM"
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hours12 = hour % 12 === 0 ? 12 : hour % 12;
            const timeStr = `${hours12.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')} ${ampm}`;
            teeTimeArr.push(new TeeTime(
                timeStr,
                numGolfers,
                hour >= 12 ? 60 * numGolfers : 45 * numGolfers,
                available,
                false,
            ));
        }
    }
    return teeTimeArr;
}

// find the tee times that have already been booked, by getting the data from the MySQL database
function findTakenTeeTimes(teeTimeArr, date) {
    return axios.get(`/api/teetimes:${date}`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.data;
        })
        .then(data => {
            // data should be an array of taken tee times from MySQL
            // Filter teeTimeArr to only include times that are NOT taken
            return teeTimeArr.filter(teeTime =>
                !data.some(taken => taken.time === teeTime.time)
            );
        })
        .catch(error => {
            console.error('Error fetching taken tee times:', error);
            return [];
        });
}


export { TeeTime, GenerateDefaultTeeTimes, findTakenTeeTimes };
// export default TeeTime;