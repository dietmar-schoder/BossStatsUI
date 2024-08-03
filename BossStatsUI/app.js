//concurrently "http-server -a localhost -p 8080"
import { SvgPanel, SvgButton, SvgText } from "./shared/logic/SvgPanel.js";
import { ViewHelper } from "./shared/logic/ViewHelper.js";
var viewHelper = new ViewHelper();
// Page Selector
function selectPage(action, actionId) {
    if (action == "getLeaderSnapshots") {
        getLeaderSnapshotsPage();
    }
    if (action == "getLeaderSnapshotOneToOnes") {
        getLeaderSnapshotOneToOnesPage(actionId);
    }
}
// Pages
async function getLeaderSnapshotsPage() {
    var leaderSnapshots = await getLeaderSnapshots("6884F73E-E237-4D80-A8B8-FB5FF9304F09");
    var svgPanel = new SvgPanel();
    leaderSnapshots.forEach(entry => {
        svgPanel.add(new SvgButton(entry.daysSince2000?.toString() ?? "", 912, "getLeaderSnapshotOneToOnes", entry.id ?? ""));
    });
    document.body.innerHTML = viewHelper.html(svgPanel);
}
;
async function getLeaderSnapshotOneToOnesPage(leaderSnapshotId) {
    var leaderSnapshot = await getLeaderSnapshotOneToOnes(leaderSnapshotId);
    var svgPanel = new SvgPanel();
    svgPanel.add(new SvgButton("BACK", 912, "getLeaderSnapshots", ""));
    leaderSnapshot.leaderDataEntries.forEach(entry => {
        svgPanel.add(new SvgText(entry.name, 200));
    });
    document.body.innerHTML = viewHelper.html(svgPanel);
}
;
// Server Calls
function getLeaderSnapshots(companyId) {
    return getFromServer(`https://fuehrrstats.azurewebsites.net/api/companies/${companyId}/leadersnapshots`);
}
function getLeaderSnapshotOneToOnes(leaderSnapshotId) {
    return getFromServer(`https://fuehrrstats.azurewebsites.net/api/leadersnapshots/${leaderSnapshotId}`);
}
// Basics
function getFromServer(url) {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    const request = new Request(url, {
        method: 'GET',
        headers: headers
    });
    return fetch(request)
        .then(res => res.json())
        .then(res => { return res; });
}
document.addEventListener("DOMContentLoaded", async function (event) {
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
    selectPage(actionWithId[0], actionWithId[1]);
});
