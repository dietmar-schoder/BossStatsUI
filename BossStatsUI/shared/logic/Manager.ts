import { LeaderSnapshot } from "../models/FuehrrStats.js";
import { Page, Pages } from "../view/Page.js";
import { FuehrrStatsServer } from "./FuehrrStatsServer.js";

export class LoadPage {
    private _server: FuehrrStatsServer;
    private _pages: Page;
    private _companyId!: string;
    private _leaderSnapshots!: LeaderSnapshot[];
    private _selectedLeaderSnapshotIndex: number = 0;

    constructor(server: FuehrrStatsServer, pages: Page) {
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
        if (action == Pages.LeaderSnapshotOneToOnes) { return await this.getLeaderSnapshotOneToOnesPage(params.split(";")); }
        //if (action == Page.LeaderEvolution) { return await this.getLeaderEvolutionPage(width, id); }
        return "page not found";
    }

    // Get data and page

    private async getLeaderSnapshotOneToOnesPage(paramsParts: string[]): Promise<string> {
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
        return this._pages.LeaderSnapshotOneToOnes(this._companyId, leaderSnapshot, prevIndex, nextIndex);
    };

    //private async getLeaderEvolutionPage(width: number, personId: string): Promise<string> {
    //    var leaderDataEntries = await this._server.getLeaderDataEntries(personId);
    //    return this._pages.LeaderEvolution(width, _leaderSnapshotId, leaderDataEntries);
    //};
}
