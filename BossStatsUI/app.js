//concurrently "http-server -a localhost -p 8080"
import { HtmlComponent } from "./shared/logic/HtmlComponent.js";
import { Table, TableRow, TableData } from "./shared/logic/HtmlTable.js";
import { SvgTable, SvgText } from "./shared/logic/SvgTable.js";
var selectedId;
function getLeaderSnapshot() {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    const request = new Request('https://fuehrrstats.azurewebsites.net/api/leadersnapshots/92d05a70-4e5c-4929-8c70-08dcb0d7dcba', {
        method: 'GET',
        headers: headers
    });
    return fetch(request)
        .then(res => res.json())
        .then(res => { return res; });
}
async function onLoad() {
    var leaderSnapshot = await getLeaderSnapshot();
    // ---
    var table = new Table();
    var stackPanel = new HtmlComponent(table);
    leaderSnapshot.leaderDataEntries.forEach(entry => {
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
    });
    table.add(new TableRow().add(new TableData("1.0.4")));
    // ---
    var svgTable = new SvgTable();
    leaderSnapshot.leaderDataEntries.forEach(entry => {
        svgTable.add(new SvgText(entry.id));
    });
    svgTable.add(new SvgText(selectedId));
    // ---
    document.getElementById("body").innerHTML = stackPanel.html() + svgTable.html2();
}
;
document.addEventListener("DOMContentLoaded", async function (event) {
    await onLoad();
});
document.addEventListener("click", function (event) {
    if (event == null || event.target == null) {
        return;
    }
    let element = event.target;
    if (element == null) {
        return;
    }
    selectedId = element.id;
    onLoad();
});
