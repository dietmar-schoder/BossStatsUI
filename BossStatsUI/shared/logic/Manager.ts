import { LeaderSnapshot, Person } from "../models/FuehrrStats.js";
import { Page, Pages } from "../view/Page.js";
import { FuehrrStatsServer } from "./FuehrrStatsServer.js";

export class Manager {
    private _server: FuehrrStatsServer;
    private _page: Page;
    private _companyId!: string;
    private _leaderSnapshots!: LeaderSnapshot[];
    private _menuSelection: number = 0;
    private _selectedLeaderSnapshotIndex: number = 0;
    private _personCollection: Map<string, Person> = new Map();

    constructor(server: FuehrrStatsServer, page: Page) {
        this._page = page;
        this._server = server;
    }

    // Map page and hand over params

    public async getHtml(pageWithParamsParts: string[]): Promise<string> {
        let page = Number(pageWithParamsParts[0]);
        let params = pageWithParamsParts[1];

        if (page == Pages.Start) { return this.getStartPage(); }
        if (page == Pages.LeaderSnapshotOneToOnes) { return await this.getLeaderSnapshotOneToOnesPage(params.split(";")); }
        if (page == Pages.LeaderEvolution) { return await this.getLeaderEvolutionPage(params.split(";")); }

        return "page not found";
    }

    // Get data from server (if applicable) and then html from page

    private getStartPage(): string {
        return this._page.Start();
    };

    private async getLeaderSnapshotOneToOnesPage(paramsParts: string[]): Promise<string> {
        this._companyId = paramsParts[0];
        this._menuSelection = Number(paramsParts[1]);
        this._selectedLeaderSnapshotIndex = Number(paramsParts[2]);
        const backParams = `${this._companyId};${this._menuSelection};${this._selectedLeaderSnapshotIndex}`;

        if (this._leaderSnapshots == null) {
            this._leaderSnapshots = await this._server.getLeaderSnapshots(this._companyId);
        }
        let leaderSnapshot = this._leaderSnapshots[this._selectedLeaderSnapshotIndex];
        if (leaderSnapshot.leaderDataEntries == null) {
            leaderSnapshot.leaderDataEntries = (await this._server.getLeaderSnapshotOneToOnes(leaderSnapshot.id)).leaderDataEntries;
        }
        let prevIndex = this._selectedLeaderSnapshotIndex + (this._selectedLeaderSnapshotIndex < this._leaderSnapshots.length - 1 ? 1 : 0);
        let nextIndex = this._selectedLeaderSnapshotIndex - (this._selectedLeaderSnapshotIndex > 0 ? 1 : 0);
        return this._page.LeaderSnapshotOneToOnes(this._companyId, leaderSnapshot, this._menuSelection, this._selectedLeaderSnapshotIndex, prevIndex, nextIndex);
    };

    private async getLeaderEvolutionPage(paramsParts: string[]): Promise<string> {
        this._menuSelection = Number(paramsParts[0]);
        let personId = paramsParts[1];

        let person = this._personCollection.get(personId);
        if (!person) {
            person = new Person(personId, await this._server.getLeaderDataEntries(personId));
            this._personCollection.set(personId, person);
        }

        return this._page.LeaderEvolution(this._companyId, this._menuSelection, this._selectedLeaderSnapshotIndex, personId, person.leaderDataEntries);
    };
}
