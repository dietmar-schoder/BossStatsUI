import { LeaderSnapshot } from "../models/LeaderSnapshot.js";

export class Server {

// Server Calls

    public getLeaderSnapshots(companyId: string): Promise<LeaderSnapshot[]> {
        return this.getFromServer<LeaderSnapshot[]>(`https://fuehrrstats.azurewebsites.net/api/companies/${companyId}/leadersnapshots`);
    }

    public getLeaderSnapshotOneToOnes(leaderSnapshotId: string): Promise<LeaderSnapshot> {
        return this.getFromServer<LeaderSnapshot>(`https://fuehrrstats.azurewebsites.net/api/leadersnapshots/${leaderSnapshotId}`);
    }

// Basics

    private getFromServer<T>(url: string): Promise<T> {
        const headers: Headers = new Headers()
        headers.set('Content-Type', 'application/json')
        headers.set('Accept', 'application/json')
        const request: RequestInfo = new Request(url, {
            method: 'GET',
            headers: headers
        })

        return fetch(request)
            .then(res => res.json())
            .then(res => { return res as T; })
    }
}
