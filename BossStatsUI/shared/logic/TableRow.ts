import { IViewElement } from "./IViewElement.js";
import { ViewElement } from "./ViewElement.js";

export class TableRow extends ViewElement implements IViewElement {
    constructor() {
        super();
        this.startTag = "<tr>";
        this.endTag = "</tr>";
    }
}
