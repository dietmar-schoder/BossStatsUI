//concurrently "http-server -a localhost -p 8080"

import { Page, Pages } from "./shared/logic/Pages.js";
import { Server } from "./shared/logic/Server.js";
import { ViewHelper } from "./shared/logic/ViewHelper.js";
import { LeaderSnapshot } from "./shared/models/LeaderSnapshot.js";

var pages = new Pages();
var server = new Server();
var viewHelper = new ViewHelper();

var leaderSnapshots: LeaderSnapshot[];
var _leaderSnapshotId: string;

// Page Selector

function selectPage(action: number, actionId: string) {
    if (action == Page.LeaderSnapshots) { getLeaderSnapshotsPage(); }
    if (action == Page.LeaderSnapshotOneToOnes) { getLeaderSnapshotOneToOnesPage(actionId); }
    if (action == Page.LeaderEvolution) { getLeaderEvolutionPage(actionId); }
}

// Pages

async function getLeaderSnapshotsPage() {
    //var leaderSnapshots = await server.getLeaderSnapshots("6884F73E-E237-4D80-A8B8-FB5FF9304F09");
    document.body.innerHTML = pages.LeaderSnapshots(viewHelper, leaderSnapshots);
};

async function getLeaderSnapshotOneToOnesPage(leaderSnapshotId: string) {
    _leaderSnapshotId = leaderSnapshotId;
    var leaderSnapshot = await server.getLeaderSnapshotOneToOnes(leaderSnapshotId);
    document.body.innerHTML = pages.LeaderSnapshotOneToOnes(viewHelper, leaderSnapshot);
};

async function getLeaderEvolutionPage(personId: string) {
    document.body.innerHTML = pages.LeaderEvolution(viewHelper, _leaderSnapshotId, personId);
};

// EventListeners

document.addEventListener("DOMContentLoaded", async function () {
    leaderSnapshots = await server.getLeaderSnapshots("6884F73E-E237-4D80-A8B8-FB5FF9304F09");
    await getLeaderSnapshotsPage();
});

document.addEventListener("click", function (event: Event) {
    if (event == null || event.target == null) { return; }
    let element = event.target as Element;
    if (element == null) { return; }
    var actionWithId = element.id.split("|");
    selectPage(Number(actionWithId[0]), actionWithId[1])
});
