//concurrently "http-server -a localhost -p 8080"

import { LeaderSnapshot } from "./shared/models/LeaderSnapshot.js";
import { SvgPanel, SvgButton, SvgText } from "./shared/logic/SvgPanel.js";
import { ViewHelper } from "./shared/logic/ViewHelper.js";

var viewHelper = new ViewHelper()

// Page Selector

function selectPage(action: string, actionId: string) {
    if (action == "getLeaderSnapshots") { getLeaderSnapshotsPage(); }
    if (action == "getLeaderSnapshotOneToOnes") { getLeaderSnapshotOneToOnesPage(actionId); }
}

// Pages

async function getLeaderSnapshotsPage() {
    var leaderSnapshots: LeaderSnapshot[] = await getLeaderSnapshots("6884F73E-E237-4D80-A8B8-FB5FF9304F09");
    var svgPanel = new SvgPanel();

    leaderSnapshots.forEach(entry => {
        svgPanel.add(new SvgButton(entry.daysSince2000?.toString() ?? "", 912, "getLeaderSnapshotOneToOnes", entry.id ?? ""));
    })

    document.body.innerHTML = viewHelper.html(svgPanel);
};

async function getLeaderSnapshotOneToOnesPage(leaderSnapshotId: string) {
    var leaderSnapshot: LeaderSnapshot = await getLeaderSnapshotOneToOnes(leaderSnapshotId);
    var svgPanel = new SvgPanel();

    svgPanel.add(new SvgButton("BACK", 912, "getLeaderSnapshots", ""))
    leaderSnapshot.leaderDataEntries!.forEach(entry => {
        svgPanel.add(new SvgText(entry.name, 200));
    })

    document.body.innerHTML = viewHelper.html(svgPanel);
};

// Server Calls

function getLeaderSnapshots(companyId: string): Promise<LeaderSnapshot[]> {
    return getFromServer<LeaderSnapshot[]>(`https://fuehrrstats.azurewebsites.net/api/companies/${companyId}/leadersnapshots`);
}

function getLeaderSnapshotOneToOnes(leaderSnapshotId: string): Promise<LeaderSnapshot> {
    return getFromServer<LeaderSnapshot>(`https://fuehrrstats.azurewebsites.net/api/leadersnapshots/${leaderSnapshotId}`);
}

// Basics

function getFromServer<T>(url: string): Promise<T> {
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
    const request: RequestInfo = new Request(url, {
        method: 'GET',
        headers: headers
    })

    return fetch(request)
        .then(res => res.json())
        .then(res => { return res as T; })
}

document.addEventListener("DOMContentLoaded", async function (event) {
    await getLeaderSnapshotsPage();
});

document.addEventListener("click", function (event: Event) {
    if (event == null || event.target == null) { return; }
    let element = event.target as Element;
    if (element == null) { return; }
    var actionWithId = element.id.split("|");
    selectPage(actionWithId[0], actionWithId[1])
});
