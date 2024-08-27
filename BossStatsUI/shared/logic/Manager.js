import { Person } from "../models/FuehrrStats.js";
import { Pages } from "../view/Page.js";
export class Manager {
    _server;
    _page;
    _companyId;
    _leaderSnapshots;
    _menuSelection = 0;
    _selectedLeaderSnapshotIndex = 0;
    _personCollection = new Map();
    constructor(server, page) {
        this._page = page;
        this._server = server;
    }
    // Map page and hand over params
    async getHtml(pageWithParamsParts) {
        let page = Number(pageWithParamsParts[0]);
        let params = pageWithParamsParts[1];
        if (page == Pages.Start) {
            return this.getStartPage();
        }
        if (page == Pages.LeaderSnapshotOneToOnes) {
            return await this.getLeaderSnapshotOneToOnesPage(params.split(";"));
        }
        if (page == Pages.LeaderEvolution) {
            return await this.getLeaderEvolutionPage(params.split(";"));
        }
        return "page not found";
    }
    // Get data from server (if applicable) and then html from page
    getStartPage() {
        return this._page.Start();
    }
    ;
    async getLeaderSnapshotOneToOnesPage(paramsParts) {
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
    }
    ;
    async getLeaderEvolutionPage(paramsParts) {
        this._menuSelection = Number(paramsParts[0]);
        let personId = paramsParts[1];
        let person = this._personCollection.get(personId);
        if (!person) {
            person = new Person(personId, await this._server.getLeaderDataEntries(personId));
            this._personCollection.set(personId, person);
        }
        return this._page.LeaderEvolution(this._companyId, this._menuSelection, this._selectedLeaderSnapshotIndex, personId, person.leaderDataEntries);
    }
    ;
}
