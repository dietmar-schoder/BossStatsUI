import { ViewElement } from "./ViewElement.js";

export class Table extends ViewElement {
    constructor() {
        super();
        this.startTag = "<table>";
        this.endTag = "</table>";
    }
}

export class TableRow extends ViewElement {
    constructor() {
        super();
        this.startTag = "<tr>";
        this.endTag = "</tr>";
    }
}

export class TableData extends ViewElement {
    constructor(content: string) {
        super();
        this.startTag = "<td>";
        this.content = content;
        this.endTag = "</td>";
    }
}
