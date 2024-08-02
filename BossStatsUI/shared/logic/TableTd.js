export class TableData {
    children = [];
    startTag = "<td>";
    content;
    endTag = "</td>";
    constructor(content) {
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