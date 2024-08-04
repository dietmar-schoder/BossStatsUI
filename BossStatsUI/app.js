//concurrently "http-server -a localhost -p 8080"
import { ViewHelper } from "./shared/logic/ViewHelper.js";
import { Page, Pages } from "./shared/logic/Pages.js";
import { Server } from "./shared/logic/Server.js";
var viewHelper = new ViewHelper();
var pages = new Pages(viewHelper);
var server = new Server();
var leaderSnapshots;
var _leaderSnapshotId;
// Page Selector
function selectPage(action, actionId) {
    if (action == Page.LeaderSnapshots) {
        getLeaderSnapshotsPage();
    }
    if (action == Page.LeaderSnapshotOneToOnes) {
        getLeaderSnapshotOneToOnesPage(actionId);
    }
    if (action == Page.LeaderEvolution) {
        getLeaderEvolutionPage(actionId);
    }
}
// Pages
async function getLeaderSnapshotsPage() {
    document.body.innerHTML = pages.LeaderSnapshots(leaderSnapshots);
}
;
async function getLeaderSnapshotOneToOnesPage(leaderSnapshotId) {
    _leaderSnapshotId = leaderSnapshotId;
    var leaderSnapshot = await server.getLeaderSnapshotOneToOnes(leaderSnapshotId);
    document.body.innerHTML = pages.LeaderSnapshotOneToOnes(leaderSnapshot);
}
;
async function getLeaderEvolutionPage(personId) {
    document.body.innerHTML = pages.LeaderEvolution(_leaderSnapshotId, personId);
}
;
// EventListeners
document.addEventListener("DOMContentLoaded", async function () {
    leaderSnapshots = await server.getLeaderSnapshots("6884F73E-E237-4D80-A8B8-FB5FF9304F09");
    await getLeaderSnapshotsPage();
});
document.addEventListener("click", function (event) {
    if (event == null || event.target == null) {
        return;
    }
    let element = event.target;
    if (element == null) {
        return;
    }
    var actionWithId = element.id.split("|");
    selectPage(Number(actionWithId[0]), actionWithId[1]);
});
