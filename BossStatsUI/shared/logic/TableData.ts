import { IViewElement } from "./IViewElement.js";
import { ViewElement } from "./ViewElement.js";

export class TableData extends ViewElement implements IViewElement {
    constructor(content: string) {
        super();
        this.startTag = "<td>";
        this.content = content;
        this.endTag = "</td>";
    }
}
