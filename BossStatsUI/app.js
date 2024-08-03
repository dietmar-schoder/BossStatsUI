//concurrently "http-server -a localhost -p 8080"
//import { HtmlComponent } from "./shared/logic/HtmlComponent.js";
//import { Table, TableRow, TableData } from "./shared/logic/HtmlTable.js";
import { SvgTable, SvgButton, SvgText } from "./shared/logic/SvgTable.js";
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
    // ---
    //var table = new Table();
    //var stackPanel = new HtmlComponent(table);
    //leaderSnapshot.leaderDataEntries!.forEach(entry => {
    //    var row = new TableRow();
    //    row.add(new TableData(entry.id));
    //    row.add(new TableData(entry.name));
    //    row.add(new TableData(entry.oneToOneQuartiles.n.toString()));
    //    row.add(new TableData(entry.oneToOneQuartiles.minimum.toString()));
    //    row.add(new TableData(entry.oneToOneQuartiles.q1.toString()));
    //    row.add(new TableData(entry.oneToOneQuartiles.median.toString()));
    //    row.add(new TableData(entry.oneToOneQuartiles.q3.toString()));
    //    row.add(new TableData(entry.oneToOneQuartiles.maximum.toString()));
    //    row.add(new TableData(entry.oneToOneQuartiles.iqr.toString()));
    //    table.add(row);
    //})
    //table.add(new TableRow().add(new TableData("1.0.4")));
    //document.getElementById("body")!.innerHTML = stackPanel.html();
    var svgTable = new SvgTable();
    leaderSnapshots.forEach(entry => {
        svgTable.add(new SvgButton(entry.daysSince2000?.toString() ?? "", 300, "getLeaderSnapshotOneToOnes", entry.id ?? ""));
    });
    document.getElementById("body").innerHTML = svgTable.html();
}
;
async function getLeaderSnapshotOneToOnesPage(leaderSnapshotId) {
    var leaderSnapshot = await getLeaderSnapshotOneToOnes(leaderSnapshotId);
    var svgTable = new SvgTable();
    svgTable.add(new SvgButton("BACK", 300, "getLeaderSnapshots", ""));
    leaderSnapshot.leaderDataEntries.forEach(entry => {
        svgTable.add(new SvgText(entry.name));
    });
    document.getElementById("body").innerHTML = svgTable.html();
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
