import { DateHelper } from "../helpers/DateHelper.js";
import { LeaderDataEntry, LeaderSnapshot } from "../models/FuehrrStats.js";

export class FuehrrStatsServer {
    private _document: Document;
    private _dateHelper: DateHelper;

    constructor(document: Document, dateHelper: DateHelper) {
        this._document = document;
        this._dateHelper = dateHelper;
    }

    public async getLeaderSnapshots(companyId: string): Promise<LeaderSnapshot[]> {
        let leaderSnapshots = await this.getFromServer<LeaderSnapshot[]>(`https://fuehrrstats.azurewebsites.net/api/companies/${companyId}/leadersnapshots`);
        leaderSnapshots.forEach(entry => {
            entry.date = this._dateHelper.daysToDate(entry.daysSince2000);
        })
        return leaderSnapshots;
    }

    public async getLeaderSnapshotOneToOnes(leaderSnapshotId: string): Promise<LeaderSnapshot> {
        let leaderSnapshot = await this.getFromServer<LeaderSnapshot>(`https://fuehrrstats.azurewebsites.net/api/leadersnapshots/${leaderSnapshotId}`);
        leaderSnapshot.date = this._dateHelper.daysToDate(leaderSnapshot.daysSince2000);
        return leaderSnapshot;
    }

    public async getLeaderDataEntries(personId: string): Promise<LeaderDataEntry[]> {
        let leaderDataEntries = await this.getFromServer<LeaderDataEntry[]>(`https://fuehrrstats.azurewebsites.net/api/leaders/${personId}/leaderdataentries`);
        leaderDataEntries.forEach(entry => {
            entry.date = this._dateHelper.daysToDate(entry.daysSince2000);
        })
        return leaderDataEntries;
    }

    private async getFromServer<T>(url: string): Promise<T> {
        const headers: Headers = new Headers()
        headers.set('Content-Type', 'application/json')
        headers.set('Accept', 'application/json')
        const request: RequestInfo = new Request(url, { method: 'GET', headers: headers })

        this.startHourGlass();

        //await delay(1000);

        return fetch(request)
            .then(res => res.json())
            .then(res => { return res as T; })
    }

    private startHourGlass() {
        var hourGlass = this._document.getElementById("hourGlass");
        if (hourGlass) {
            hourGlass.style.display = "block";
            let rotatingLine = this._document.getElementById("rotatingLine");
            if (rotatingLine) {
                rotatingLine.style.animation = "none";
                void rotatingLine.offsetWidth;
                rotatingLine.style.animation = "rotateAnimation 2s linear infinite";
            }
        }
    }
}

//function delay(ms: number): Promise<void> {
//    return new Promise(resolve => setTimeout(resolve, ms));
//}
