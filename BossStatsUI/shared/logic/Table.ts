import { IViewElement } from "./IViewElement.js";
import { ViewElement } from "./ViewElement.js";

export class Table extends ViewElement implements IViewElement {
    constructor() {
        super();
        this.startTag = "<table>";
        this.endTag = "</table>";
    }
}

export class TableRow extends ViewElement implements IViewElement {
    constructor() {
        super();
        this.startTag = "<tr>";
        this.endTag = "</tr>";
    }
}

export class TableData extends ViewElement implements IViewElement {
    constructor(content: string) {
        super();
        this.startTag = "<td>";
        this.content = content;
        this.endTag = "</td>";
    }
}
