export class DateHelper {
    toDate(date) {
        return `${date.getFullYear()}-${this.format2(date.getMonth())}-${this.format2(date.getDate())}`;
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
