import { IViewElement } from "./IViewElement.js";

export class Table implements IViewElement {
    children: IViewElement[] = [];
    startTag: string = "<table>";
    content: string = "";
    endTag: string = "</table>";

    add(element: IViewElement) {
        this.children.push(element);
    }
}
