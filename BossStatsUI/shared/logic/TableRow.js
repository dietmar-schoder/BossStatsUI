"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableRow = void 0;
class TableRow {
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
exports.TableRow = TableRow;
//# sourceMappingURL=TableRow.js.map