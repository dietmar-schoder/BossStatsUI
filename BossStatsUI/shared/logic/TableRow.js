export class TableRow {
    constructor() {
        this.children = [];
        this.startTag = "<tr>";
        this.content = "";
        this.endTag = "</tr>";
    }
    add(element) {
        this.children.push(element);
    }
    html() {
        var html = this.startTag;
        this.children.forEach(entry => {
            html = html + entry.html();
        });
        return html + this.endTag;
    }
}
//# sourceMappingURL=TableRow.js.map