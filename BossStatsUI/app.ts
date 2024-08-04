//concurrently "http-server -a localhost -p 8080"

import { LeaderSnapshot } from "./shared/models/LeaderSnapshot.js";
import { Server } from "./shared/logic/Server.js";
import { SvgElement, SvgPanel, SvgButton, SvgText } from "./shared/logic/SvgElements.js";
import { ViewHelper } from "./shared/logic/ViewHelper.js";

var server = new Server();
var viewHelper = new ViewHelper();

var leaderSnapshots: LeaderSnapshot[];
var _leaderSnapshotId: string;

// Page Selector

enum Page {
    LeaderSnapshots,
    LeaderSnapshotOneToOnes,
    LeaderEvolution
}

function selectPage(action: number, actionId: string) {
    if (action == Page.LeaderSnapshots) { getLeaderSnapshotsPage(); }
    if (action == Page.LeaderSnapshotOneToOnes) { getLeaderSnapshotOneToOnesPage(actionId); }
    if (action == Page.LeaderEvolution) { getLeaderEvolutionPage(actionId); }
}

// Pages

async function getLeaderSnapshotsPage() {
    //var leaderSnapshots = await server.getLeaderSnapshots("6884F73E-E237-4D80-A8B8-FB5FF9304F09");
    var svgPanel = new SvgPanel();

    leaderSnapshots.forEach(entry => {
        svgPanel.add(new SvgButton(entry.daysSince2000?.toString() ?? "", 912, Page.LeaderSnapshotOneToOnes, entry.id ?? ""));
    })

    document.body.innerHTML = viewHelper.svgHtml(svgPanel);
};

async function getLeaderSnapshotOneToOnesPage(leaderSnapshotId: string) {
    _leaderSnapshotId = leaderSnapshotId;
    var leaderSnapshot = await server.getLeaderSnapshotOneToOnes(leaderSnapshotId);
    var svgPanel = new SvgPanel();

    svgPanel.sub(new SvgElement(true))
        .add(new SvgButton("BACK", 76, Page.LeaderSnapshots, ""))
        .add(new SvgText(leaderSnapshot.daysSince2000!.toString(), 812));

    leaderSnapshot.leaderDataEntries!.forEach(entry => {
        svgPanel.sub(new SvgElement(true))
            .add(new SvgButton(entry.name, 276, Page.LeaderEvolution, entry.id))
            .add(new SvgText(entry.oneToOneQuartiles.n.toString(), 76))
            .add(new SvgText(entry.oneToOneQuartiles.minimum.toString(), 76))
            .add(new SvgText(entry.oneToOneQuartiles.q1.toString(), 76))
            .add(new SvgText(entry.oneToOneQuartiles.median.toString(), 76))
            .add(new SvgText(entry.oneToOneQuartiles.q3.toString(), 76))
            .add(new SvgText(entry.oneToOneQuartiles.maximum.toString(), 112));
    })

    document.body.innerHTML = viewHelper.svgHtml(svgPanel);
};

async function getLeaderEvolutionPage(leaderId: string) {
    var svgPanel = new SvgPanel();

    svgPanel.sub(new SvgElement(true))
        .add(new SvgButton("BACK", 76, Page.LeaderSnapshotOneToOnes, _leaderSnapshotId))
        .add(new SvgText(leaderId, 812));

    document.body.innerHTML = viewHelper.svgHtml(svgPanel);
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
