const dayjs = require('dayjs');

const dateFormat = (date) => {
    return dayjs(date).format('MM-DD-YYYY HH:mm:ss');
};

module.exports = dateFormat ;