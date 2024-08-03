export class Server {
    // Server Calls
    getLeaderSnapshots(companyId) {
        return this.getFromServer(`https://fuehrrstats.azurewebsites.net/api/companies/${companyId}/leadersnapshots`);
    }
    getLeaderSnapshotOneToOnes(leaderSnapshotId) {
        return this.getFromServer(`https://fuehrrstats.azurewebsites.net/api/leadersnapshots/${leaderSnapshotId}`);
    }
    // Basics
    getFromServer(url) {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        const request = new Request(url, {
            method: 'GET',
            headers: headers
        });
        return fetch(request)
            .then(res => res.json())
            .then(res => { return res; });
    }
}
