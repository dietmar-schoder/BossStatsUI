//concurrently "http-server -a localhost -p 8080"

import { SvgPanel, SvgButton, SvgText } from "./shared/logic/SvgPanel.js";
import { ViewHelper } from "./shared/logic/ViewHelper.js";
import { Server } from "./shared/logic/Server.js";
import { ViewElement } from "./shared/logic/ViewElement.js";
import { LeaderSnapshot } from "./shared/models/LeaderSnapshot.js";

var viewHelper = new ViewHelper();
var server = new Server();
var leaderSnapshots: LeaderSnapshot[];

// Page Selector

enum Page {
    LeaderSnapshots,
    LeaderSnapshotOneToOnes
}

function selectPage(action: number, actionId: string) {
    if (action == Page.LeaderSnapshots) { getLeaderSnapshotsPage(); }
    if (action == Page.LeaderSnapshotOneToOnes) { getLeaderSnapshotOneToOnesPage(actionId); }
}

// Pages

async function getLeaderSnapshotsPage() {
    //var leaderSnapshots = await server.getLeaderSnapshots("6884F73E-E237-4D80-A8B8-FB5FF9304F09");
    var svgPanel = new SvgPanel();

    leaderSnapshots.forEach(entry => {
        svgPanel.add(new SvgButton(entry.daysSince2000?.toString() ?? "", 912, Page.LeaderSnapshotOneToOnes.toString(), entry.id ?? ""));
    })

    document.body.innerHTML = viewHelper.svgHtml(svgPanel);
};

async function getLeaderSnapshotOneToOnesPage(leaderSnapshotId: string) {
    var leaderSnapshot = await server.getLeaderSnapshotOneToOnes(leaderSnapshotId);
    var svgPanel = new SvgPanel();

    svgPanel.sub(new ViewElement(true))
        .add(new SvgButton("BACK", 80, Page.LeaderSnapshots.toString(), ""))
        .add(new SvgText(leaderSnapshot.daysSince2000!.toString(), 500));

    leaderSnapshot.leaderDataEntries!.forEach(entry => {
        svgPanel.add(new SvgText(entry.name, 912));
    })

    document.body.innerHTML = viewHelper.svgHtml(svgPanel);
};

// EventListeners

document.addEventListener("DOMContentLoaded", async function (event) {
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
