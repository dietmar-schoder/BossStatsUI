export class DateHelper {
    toDate(date) {
        return `${date.getFullYear()}-${this.format2(date.getMonth() + 1)}-${this.format2(date.getDate())}`;
    }
    daysToDdMmmYyyy(days) {
        const date = this.daysToDate(days);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    }
    daysToDate(daysSince2000) {
        let date = new Date(2000, 0, 1);
        date.setDate(date.getDate() + daysSince2000);
        return date;
    }
    format2(number) {
        return number.toString().padStart(2, '0');
    }
}
