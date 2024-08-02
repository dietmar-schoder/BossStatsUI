import { ViewElement } from "./ViewElement.js";
export class TableData extends ViewElement {
    constructor(content) {
        super();
        this.startTag = "<td>";
        this.content = content;
        this.endTag = "</td>";
    }
}
//# sourceMappingURL=TableData.js.map