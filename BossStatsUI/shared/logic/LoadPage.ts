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

    // "Action -> page" catalogue

    public async getHtml(action: number, width: number, id: string): Promise<string> {
        if (action == Page.LeaderSnapshots) { return await this.getLeaderSnapshotsPage(width, id); }
        if (action == Page.LeaderSnapshotOneToOnes) { return await this.getLeaderSnapshotOneToOnesPage(width, id); }
        if (action == Page.LeaderEvolution) { return await this.getLeaderEvolutionPage(width, id); }
        return "page not found";
    }

    // Get data and page

    private async getLeaderSnapshotsPage(width: number, companyId: string): Promise<string> {
        if (_leaderSnapshots == null) {
            _leaderSnapshots = await this._server.getLeaderSnapshots(companyId);
        }
        return this._pages.LeaderSnapshots(width, _leaderSnapshots);
    };

    private async getLeaderSnapshotOneToOnesPage(width: number, leaderSnapshotId: string): Promise<string> {
        _leaderSnapshotId = leaderSnapshotId;
        var leaderSnapshot = await this._server.getLeaderSnapshotOneToOnes(leaderSnapshotId);
        return this._pages.LeaderSnapshotOneToOnes(width, leaderSnapshot);
    };

    private async getLeaderEvolutionPage(width: number, personId: string): Promise<string> {
        var leaderDataEntries = await this._server.getLeaderDataEntries(personId);
        return this._pages.LeaderEvolution(width, _leaderSnapshotId, leaderDataEntries);
    };
}
