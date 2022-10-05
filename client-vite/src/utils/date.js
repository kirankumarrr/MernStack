import moment from 'moment';

export function getYearAndMonth(currentDate) {
    const date = moment(currentDate)
    const year = date.year()
    const monthInNumber = date.month() + 1;

    const month = moment(monthInNumber, 'M').format('MMMM').toLowerCase();
    console.log("UTIL", { date, year, monthInNumber, month })
    return `${year}/${month}`;
}
