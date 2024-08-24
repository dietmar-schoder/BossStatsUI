import { Pages } from "../view/Page.js";
export class Manager {
    _server;
    _page;
    _companyId;
    _leaderSnapshots;
    _selectedLeaderSnapshotIndex = 0;
    constructor(server, page) {
        this._page = page;
        this._server = server;
    }
    // Map page and hand over params
    async getHtml(pageWithParamsParts) {
        let page = Number(pageWithParamsParts[0]);
        let params = pageWithParamsParts[1];
        if (page == Pages.LeaderSnapshotOneToOnes) {
            return await this.getLeaderSnapshotOneToOnesPage(params.split(";"));
        }
        if (page == Pages.LeaderEvolution) {
            return await this.getLeaderEvolutionPage(params);
        }
        return "page not found";
    }
    // Get data from server and then html from page
    async getLeaderSnapshotOneToOnesPage(paramsParts) {
        this._companyId = paramsParts[0];
        this._selectedLeaderSnapshotIndex = Number(paramsParts[1]);
        if (this._leaderSnapshots == null) {
            this._leaderSnapshots = await this._server.getLeaderSnapshots(this._companyId);
        }
        let leaderSnapshot = this._leaderSnapshots[this._selectedLeaderSnapshotIndex];
        if (leaderSnapshot.leaderDataEntries == null) {
            leaderSnapshot.leaderDataEntries = (await this._server.getLeaderSnapshotOneToOnes(leaderSnapshot.id)).leaderDataEntries;
        }
        let prevIndex = this._selectedLeaderSnapshotIndex + (this._selectedLeaderSnapshotIndex < this._leaderSnapshots.length - 1 ? 1 : 0);
        let nextIndex = this._selectedLeaderSnapshotIndex - (this._selectedLeaderSnapshotIndex > 0 ? 1 : 0);
        return this._page.LeaderSnapshotOneToOnes(this._companyId, leaderSnapshot, prevIndex, nextIndex);
    }
    ;
    async getLeaderEvolutionPage(personId) {
        var leaderDataEntries = await this._server.getLeaderDataEntries(personId);
        return personId; // this._pages.LeaderEvolution(width, _leaderSnapshotId, leaderDataEntries);
    }
    ;
}
