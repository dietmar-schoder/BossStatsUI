"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableData = void 0;
class TableData {
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
exports.TableData = TableData;
//# sourceMappingURL=TableTd.js.map