const dayjs = require('dayjs');

// function to format a timestamp as MM-DD-YYYY HH:mm:ss
const dateFormat = (date) => {
    return dayjs(date).format('MM-DD-YYYY HH:mm:ss');
};

module.exports = dateFormat ;