export class Table {
    children = [];
    startTag = "<table>";
    content = "";
    endTag = "</table>";
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
//# sourceMappingURL=Table.js.map