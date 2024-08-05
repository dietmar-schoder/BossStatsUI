import { LeaderSnapshot } from "../models/FuehrrStats.js";
import { FuehrrStatsServer } from "./FuehrrStatsServer.js";
import { Page, Pages } from "./Pages.js";

var _leaderSnapshots: LeaderSnapshot[];
var _leaderSnapshotId: string;

export class LoadPage {
    private _server: FuehrrStatsServer;
    private _pages: Pages;

    constructor(server: FuehrrStatsServer, pages: Pages) {
        this._pages = pages;
        this._server = server;
    }

    public async getHtml(action: number, id: string): Promise<string> {
        if (action == Page.LeaderSnapshots) { return await this.getLeaderSnapshotsPage(id); }
        if (action == Page.LeaderSnapshotOneToOnes) { return await this.getLeaderSnapshotOneToOnesPage(id); }
        if (action == Page.LeaderEvolution) { return await this.getLeaderEvolutionPage(id); }
        return "page not found";
    }

    // Get data and pages

    private async getLeaderSnapshotsPage(companyId: string): Promise<string> {
        if (_leaderSnapshots == null) {
            _leaderSnapshots = await this._server.getLeaderSnapshots(companyId);
        }
        return this._pages.LeaderSnapshots(_leaderSnapshots);
    };

    private async getLeaderSnapshotOneToOnesPage(leaderSnapshotId: string): Promise<string> {
        _leaderSnapshotId = leaderSnapshotId;
        var leaderSnapshot = await this._server.getLeaderSnapshotOneToOnes(leaderSnapshotId);
        return this._pages.LeaderSnapshotOneToOnes(leaderSnapshot);
    };

    private async getLeaderEvolutionPage(personId: string): Promise<string> {
        var leaderDataEntries = await this._server.getLeaderDataEntries(personId);
        return this._pages.LeaderEvolution(_leaderSnapshotId, leaderDataEntries);
    };
}
