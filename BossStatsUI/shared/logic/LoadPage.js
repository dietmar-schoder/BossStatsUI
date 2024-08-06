import { Page } from "./Pages.js";
var _leaderSnapshots;
var _leaderSnapshotId;
export class LoadPage {
    _server;
    _pages;
    constructor(server, pages) {
        this._pages = pages;
        this._server = server;
    }
    // "Action -> page" catalogue
    async getHtml(action, id) {
        if (action == Page.LeaderSnapshots) {
            return await this.getLeaderSnapshotsPage(id);
        }
        if (action == Page.LeaderSnapshotOneToOnes) {
            return await this.getLeaderSnapshotOneToOnesPage(id);
        }
        if (action == Page.LeaderEvolution) {
            return await this.getLeaderEvolutionPage(id);
        }
        return "page not found";
    }
    // Get data and page
    async getLeaderSnapshotsPage(companyId) {
        if (_leaderSnapshots == null) {
            _leaderSnapshots = await this._server.getLeaderSnapshots(companyId);
        }
        return this._pages.LeaderSnapshots(_leaderSnapshots);
    }
    ;
    async getLeaderSnapshotOneToOnesPage(leaderSnapshotId) {
        _leaderSnapshotId = leaderSnapshotId;
        var leaderSnapshot = await this._server.getLeaderSnapshotOneToOnes(leaderSnapshotId);
        return this._pages.LeaderSnapshotOneToOnes(leaderSnapshot);
    }
    ;
    async getLeaderEvolutionPage(personId) {
        var leaderDataEntries = await this._server.getLeaderDataEntries(personId);
        return this._pages.LeaderEvolution(_leaderSnapshotId, leaderDataEntries);
    }
    ;
}
