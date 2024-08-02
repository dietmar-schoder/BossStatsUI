export class TableData {
    constructor(content) {
        this.children = [];
        this.startTag = "<td>";
        this.endTag = "</td>";
        this.content = content;
    }
    add(element) {
        this.children.push(element);
    }
    html() {
        return this.startTag + this.content + this.endTag;
    }
}
//# sourceMappingURL=TableTd.js.map