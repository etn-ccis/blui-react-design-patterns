/* eslint-disable @typescript-eslint/explicit-function-return-type */
const NOW = Date.now();
const LOCATIONS = ['Dos Valley Field', 'Jameson Field', 'Parker Field West', 'Parker Field East', 'North Park Garden'];
const DEVICES = ['MX Power Pro', 'PXL DG1', 'Pentair Aurora'];
const DETAILS = ['Over Voltage Fault', 'Over Current Fault', 'Under Voltage Fault', 'Under Current Fault'];

export function formatDate(timestamp) {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function getRandomData() {
    // const date = Math.round(NOW - Math.random()*1000000);

    return {
        date: Math.round(NOW - Math.random() * 1000000000),
        active: Math.random() < 0.3,
        location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
        device: DEVICES[Math.floor(Math.random() * DEVICES.length)],
        details: DETAILS[Math.floor(Math.random() * DETAILS.length)],
    };
}

function getAlarmList(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(getRandomData());
    }
    return data;
}

export default getAlarmList(10);
