import { IViewElement } from "./IViewElement.js";

export class TableRow implements IViewElement {
    children: IViewElement[] = [];
    startTag: string = "<tr>";
    content: string = "";
    endTag: string = "</tr>";

    add(element: IViewElement) {
        this.children.push(element);
    }
}
