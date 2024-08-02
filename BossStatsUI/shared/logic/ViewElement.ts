import { IViewElement } from "./IViewElement.js";

export class ViewElement implements IViewElement {
    children: IViewElement[] = [];
    startTag: string = "";
    content: string = "";
    endTag: string = "";

    add(element: IViewElement) {
        this.children.push(element);
    }
}
