export class FuehrrStatsServer {
    _document;
    _dateHelper;
    constructor(document, dateHelper) {
        this._document = document;
        this._dateHelper = dateHelper;
    }
    async getLeaderSnapshots(companyId) {
        let leaderSnapshots = await this.getFromServer(`https://fuehrrstats.azurewebsites.net/api/companies/${companyId}/leadersnapshots`);
        leaderSnapshots.forEach(entry => {
            entry.date = this._dateHelper.daysToDate(entry.daysSince2000);
        });
        return leaderSnapshots;
    }
    async getLeaderSnapshotOneToOnes(leaderSnapshotId) {
        let leaderSnapshot = await this.getFromServer(`https://fuehrrstats.azurewebsites.net/api/leadersnapshots/${leaderSnapshotId}`);
        leaderSnapshot.date = this._dateHelper.daysToDate(leaderSnapshot.daysSince2000);
        return leaderSnapshot;
    }
    async getLeaderDataEntries(personId) {
        let leaderDataEntries = await this.getFromServer(`https://fuehrrstats.azurewebsites.net/api/leaders/${personId}/leaderdataentries`);
        leaderDataEntries.forEach(entry => {
            entry.date = this._dateHelper.daysToDate(entry.daysSince2000);
        });
        return leaderDataEntries;
    }
    async getFromServer(url) {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        const request = new Request(url, { method: 'GET', headers: headers });
        var loadingIndicator = this._document.getElementById("wait");
        if (loadingIndicator) {
            loadingIndicator.style.display = "block";
        }
        return fetch(request)
            .then(res => res.json())
            .then(res => { return res; });
    }
}
