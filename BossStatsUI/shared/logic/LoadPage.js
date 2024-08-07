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
    async getHtml(action, width, id) {
        if (action == Page.LeaderSnapshots) {
            return await this.getLeaderSnapshotsPage(width, id);
        }
        if (action == Page.LeaderSnapshotOneToOnes) {
            return await this.getLeaderSnapshotOneToOnesPage(width, id);
        }
        if (action == Page.LeaderEvolution) {
            return await this.getLeaderEvolutionPage(width, id);
        }
        return "page not found";
    }
    // Get data and page
    async getLeaderSnapshotsPage(width, companyId) {
        if (_leaderSnapshots == null) {
            _leaderSnapshots = await this._server.getLeaderSnapshots(companyId);
        }
        return this._pages.LeaderSnapshots(width, _leaderSnapshots);
    }
    ;
    async getLeaderSnapshotOneToOnesPage(width, leaderSnapshotId) {
        _leaderSnapshotId = leaderSnapshotId;
        var leaderSnapshot = await this._server.getLeaderSnapshotOneToOnes(leaderSnapshotId);
        return this._pages.LeaderSnapshotOneToOnes(width, leaderSnapshot);
    }
    ;
    async getLeaderEvolutionPage(width, personId) {
        var leaderDataEntries = await this._server.getLeaderDataEntries(personId);
        return this._pages.LeaderEvolution(width, _leaderSnapshotId, leaderDataEntries);
    }
    ;
}
