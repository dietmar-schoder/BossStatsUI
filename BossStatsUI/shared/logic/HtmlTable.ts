import { SvgElement } from "./SvgElements.js";

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

export class Table extends SvgElement {
    constructor() {
        super();
        this.startTag = "<table>";
        this.endTag = "</table>";
    }
}

export class TableRow extends SvgElement {
    constructor() {
        super();
        this.startTag = "<tr>";
        this.endTag = "</tr>";
    }
}

export class TableData extends SvgElement {
    constructor(content: string) {
        super();
        this.startTag = "<td>";
        this.content = content;
        this.endTag = "</td>";
    }
}
