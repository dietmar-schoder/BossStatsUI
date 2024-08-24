import { LeaderSnapshot } from "../models/FuehrrStats.js";
import { Page, Pages } from "../view/Page.js";
import { FuehrrStatsServer } from "./FuehrrStatsServer.js";

export class Manager {
    private _server: FuehrrStatsServer;
    private _page: Page;
    private _companyId!: string;
    private _leaderSnapshots!: LeaderSnapshot[];
    private _selectedLeaderSnapshotIndex: number = 0;
    private _backParams!: string;

    constructor(server: FuehrrStatsServer, page: Page) {
        this._page = page;
        this._server = server;
    }

    // Map page and hand over params

    public async getHtml(pageWithParamsParts: string[]): Promise<string> {
        let page = Number(pageWithParamsParts[0]);
        let params = pageWithParamsParts[1];

        if (page == Pages.LeaderSnapshotOneToOnes) { return await this.getLeaderSnapshotOneToOnesPage(params.split(";")); }
        if (page == Pages.LeaderEvolution) { return await this.getLeaderEvolutionPage(params); }

        return "page not found";
    }

    // Get data from server and then html from page

    private async getLeaderSnapshotOneToOnesPage(paramsParts: string[]): Promise<string> {
        this._companyId = paramsParts[0];
        this._selectedLeaderSnapshotIndex = Number(paramsParts[1]);
        this._backParams = `${this._companyId};${this._selectedLeaderSnapshotIndex}`;

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
    };

    private async getLeaderEvolutionPage(personId: string): Promise<string> {
        var leaderDataEntries = await this._server.getLeaderDataEntries(personId);
        return this._page.LeaderEvolution(this._backParams, leaderDataEntries);
    };
}
