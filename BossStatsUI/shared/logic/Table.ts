import { IViewElement } from "./IViewElement.js";
import { ViewElement } from "./ViewElement.js";

export class Table extends ViewElement implements IViewElement {
    constructor() {
        super();
        this.startTag = "<table>";
        this.endTag = "</table>";
    }
}
