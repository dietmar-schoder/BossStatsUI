import { DateHelper } from "./DateHelper";
import { LeaderSnapshot } from "../models/FuehrrStatsDb";

export class FuehrrStatsServer {
    private _dateHelper: DateHelper;

    constructor(dateHelper: DateHelper) {
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

    private async getFromServer<T>(url: string): Promise<T> {
        const headers: Headers = new Headers()
        headers.set('Content-Type', 'application/json')
        headers.set('Accept', 'application/json')
        const request: RequestInfo = new Request(url, { method: 'GET', headers: headers })
        return fetch(request)
            .then(res => res.json())
            .then(res => { return res as T; })
    }
}
