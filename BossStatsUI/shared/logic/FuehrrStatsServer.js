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
        this.startHourGlass();
        await delay(1000);
        return fetch(request)
            .then(res => res.json())
            .then(res => { return res; });
    }
    startHourGlass() {
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
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
