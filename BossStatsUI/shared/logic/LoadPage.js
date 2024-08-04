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
    async getHtml(action, id) {
        if (action == Page.LeaderSnapshots) {
            return await this.getLeaderSnapshotsPage();
        }
        if (action == Page.LeaderSnapshotOneToOnes) {
            return await this.getLeaderSnapshotOneToOnesPage(id);
        }
        if (action == Page.LeaderEvolution) {
            return await this.getLeaderEvolutionPage(id);
        }
        return "page not found";
    }
    // Pages
    async getLeaderSnapshotsPage() {
        if (_leaderSnapshots == null) {
            _leaderSnapshots = await this._server.getLeaderSnapshots("6884F73E-E237-4D80-A8B8-FB5FF9304F09");
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
        return this._pages.LeaderEvolution(_leaderSnapshotId, personId);
    }
    ;
}
