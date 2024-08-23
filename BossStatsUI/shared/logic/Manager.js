import { Page } from "../view/Pages.js";
export class LoadPage {
    _server;
    _pages;
    _leaderSnapshots;
    _selectedLeaderSnapshotIndex = 0;
    constructor(server, pages) {
        this._pages = pages;
        this._server = server;
    }
    // "Action -> page" catalogue
    async getHtml(actionWithParams) {
        let actionWithParamsParts = actionWithParams.split("|");
        let action = Number(actionWithParamsParts[0]);
        let params = actionWithParamsParts[1];
        //if (action == Page.Test) { return this.getTestPage(id); }
        //if (action == Page.LeaderSnapshots) { return await this.getLeaderSnapshotsPage(width, id); }
        if (action == Page.LeaderSnapshotOneToOnes) {
            return await this.getLeaderSnapshotOneToOnesPage(params);
        }
        //if (action == Page.LeaderEvolution) { return await this.getLeaderEvolutionPage(width, id); }
        return "page not found";
    }
    // Get data and page
    //private async getTestPage(companyId: string): Promise<string> {
    //    if (_leaderSnapshots == null) {
    //        _leaderSnapshots = await this._server.getLeaderSnapshots(companyId);
    //    }
    //    return this._pages.LeaderSnapshotOneToOnes(_leaderSnapshots, _selectedLeaderSnapshotIndex);
    //};
    //private async getLeaderSnapshotsPage(width: number, companyId: string): Promise<string> {
    //    if (_leaderSnapshots == null) {
    //        _leaderSnapshots = await this._server.getLeaderSnapshots(companyId);
    //    }
    //    return this._pages.LeaderSnapshots(width, _leaderSnapshots);
    //};
    async getLeaderSnapshotOneToOnesPage(params) {
        let paramsParts = params.split(";");
        let companyId = paramsParts[0];
        let selectedLeaderSnapshotIndex = Number(paramsParts[1]);
        if (this._leaderSnapshots == null) {
            this._leaderSnapshots = await this._server.getLeaderSnapshots(companyId);
        }
        if (this._leaderSnapshots[selectedLeaderSnapshotIndex].leaderDataEntries == null) {
            this._leaderSnapshots[selectedLeaderSnapshotIndex].leaderDataEntries
                = (await this._server.getLeaderSnapshotOneToOnes(this._leaderSnapshots[selectedLeaderSnapshotIndex].id)).leaderDataEntries;
        }
        //var leaderSnapshot = await this._server.getLeaderSnapshotOneToOnes(leaderSnapshotId);
        return this._pages.LeaderSnapshotOneToOnes(companyId, this._leaderSnapshots, selectedLeaderSnapshotIndex);
    }
    ;
}
