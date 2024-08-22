import { LeaderSnapshot } from "../models/FuehrrStats.js";
import { FuehrrStatsServer } from "./FuehrrStatsServer.js";
import { Page, Pages } from "./Pages.js";

export class LoadPage {
    private _server: FuehrrStatsServer;
    private _pages: Pages;
    private _leaderSnapshots!: LeaderSnapshot[];
    private _selectedLeaderSnapshotIndex: number = 0;

    constructor(server: FuehrrStatsServer, pages: Pages) {
        this._pages = pages;
        this._server = server;
    }

    // "Action -> page" catalogue

    public async getHtml(actionWithParams: string): Promise<string> {
        let actionWithParamsParts = actionWithParams.split("|");
        let action = Number(actionWithParamsParts[0]);
        let params = actionWithParamsParts[1];

        //if (action == Page.Test) { return this.getTestPage(id); }
        //if (action == Page.LeaderSnapshots) { return await this.getLeaderSnapshotsPage(width, id); }
        if (action == Page.LeaderSnapshotOneToOnes) { return await this.getLeaderSnapshotOneToOnesPage(params); }
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

    private async getLeaderSnapshotOneToOnesPage(params: string): Promise<string> {
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
    };

    //private async getLeaderEvolutionPage(width: number, personId: string): Promise<string> {
    //    var leaderDataEntries = await this._server.getLeaderDataEntries(personId);
    //    return this._pages.LeaderEvolution(width, _leaderSnapshotId, leaderDataEntries);
    //};
}
