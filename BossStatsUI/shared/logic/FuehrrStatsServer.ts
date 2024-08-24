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

        var loadingIndicator = this._document.getElementById("wait");
        if (loadingIndicator) {
            loadingIndicator.style.display = "block";
        }

        return fetch(request)
            .then(res => res.json())
            .then(res => { return res as T; })
    }
}
