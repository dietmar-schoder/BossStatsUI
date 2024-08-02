import { IViewElement } from "./IViewElement.js";

export class StackPanel {
    root: IViewElement;
    constructor(element: IViewElement) {
        this.root = element;
    }

    public html(): string {
        return this.htmlTree(this.root);
    }

    htmlTree(element: IViewElement) {
        var html = element.startTag;
        if (element.children.length > 0) {
            element.children!.forEach(entry => {
                html = html + this.htmlTree(entry);
            });
        }
        else {
            html = html + element.content;
        }
        return html + element.endTag;
    }
}
