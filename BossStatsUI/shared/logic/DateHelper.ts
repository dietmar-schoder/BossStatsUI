export class DateHelper {

    public toDate(date: Date): string {
        return `${date.getFullYear()}-${this.format2(date.getMonth() + 1)}-${this.format2(date.getDate())}`;
    }

    public daysToDate(daysSince2000: number): Date {
        let date = new Date(2000, 0, 1);
        date.setDate(date.getDate() + daysSince2000);
        return date;
    }

    private format2(number: number): string {
        return number.toString().padStart(2, '0')
    }
}
