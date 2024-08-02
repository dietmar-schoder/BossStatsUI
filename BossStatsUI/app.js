var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Table } from "./shared/logic/Table";
import { TableRow } from "./shared/logic/TableRow";
import { TableData } from "./shared/logic/TableTd";
function getOneToOnes() {
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
window.onload = function () {
    return __awaiter(this, void 0, void 0, function* () {
        var leaderSnapshot = yield getOneToOnes();
        //var body: string = "<table>";
        //leaderSnapshot.leaderDataEntries!.forEach(entry => {
        //    body = body +
        //        `<tr>` +
        //            `<td>${entry.id}</td>` +
        //            `<td>${entry.name}</td>` +
        //            `<td>${entry.oneToOneQuartiles.n}</td>` +
        //            `<td>${entry.oneToOneQuartiles.minimum}</td>` +
        //            `<td>${entry.oneToOneQuartiles.q1}</td>` +
        //            `<td>${entry.oneToOneQuartiles.median}</td>` +
        //            `<td>${entry.oneToOneQuartiles.q3}</td>` +
        //            `<td>${entry.oneToOneQuartiles.maximum}</td>` +
        //            `<td>${entry.oneToOneQuartiles.iqr}</td>` +
        //        `</tr>`;
        //})
        //body = body + "</table>";
        //document.getElementById("body")!.innerHTML = body;
        var table = new Table();
        leaderSnapshot.leaderDataEntries.forEach(entry => {
            var row = new TableRow();
            row.add(new TableData(entry.id));
            row.add(new TableData(entry.name));
        });
        document.getElementById("body").innerHTML = table.html();
    });
};
//# sourceMappingURL=app.js.map