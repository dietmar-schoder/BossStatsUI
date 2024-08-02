import { LeaderSnapshot } from "./shared/models/LeaderSnapshot.js";
import { StackPanel } from "./shared/logic/StackPanel.js";
import { Table } from "./shared/logic/Table.js";
import { TableData } from "./shared/logic/TableData.js";
import { TableRow } from "./shared/logic/TableRow.js";

function getLeaderSnapshot(): Promise<LeaderSnapshot> {
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
    const request: RequestInfo = new Request('https://fuehrrstats.azurewebsites.net/api/leadersnapshots/92d05a70-4e5c-4929-8c70-08dcb0d7dcba', {
        method: 'GET',
        headers: headers
    })

    return fetch(request)
        .then(res => res.json())
        .then(res => { return res as LeaderSnapshot; })
}

async function onLoad() {
    var leaderSnapshot: LeaderSnapshot = await getLeaderSnapshot();
    var table = new Table();
    var stackPanel = new StackPanel(table);

    leaderSnapshot.leaderDataEntries!.forEach(entry => {
        var row = new TableRow();
        row.add(new TableData(entry.id));
        row.add(new TableData(entry.name));
        row.add(new TableData(entry.oneToOneQuartiles.n.toString()));
        row.add(new TableData(entry.oneToOneQuartiles.minimum.toString()));
        row.add(new TableData(entry.oneToOneQuartiles.q1.toString()));
        row.add(new TableData(entry.oneToOneQuartiles.median.toString()));
        row.add(new TableData(entry.oneToOneQuartiles.q3.toString()));
        row.add(new TableData(entry.oneToOneQuartiles.maximum.toString()));
        row.add(new TableData(entry.oneToOneQuartiles.iqr.toString()));
        table.add(row);
    })

    document.getElementById("body")!.innerHTML = stackPanel.html();
};

document.addEventListener("DOMContentLoaded", async function (event) {
    await onLoad();
});
