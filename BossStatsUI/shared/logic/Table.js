"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
class Table {
    constructor() {
        this.children = [];
        this.startTag = "<table>";
        this.content = "";
        this.endTag = "</table>";
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
exports.Table = Table;
//# sourceMappingURL=Table.js.map