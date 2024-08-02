import { IViewElement } from "./IViewElement";

export class TableData implements IViewElement {
    children: IViewElement[] = [];
    startTag: string = "<td>";
    content: string;
    endTag: string = "</td>";
    constructor(content: string) {
        this.content = content;
    }

    add(element: IViewElement) {
        this.children.push(element);
    }

    html() {
        return this.startTag + this.content + this.endTag;
    }
}
