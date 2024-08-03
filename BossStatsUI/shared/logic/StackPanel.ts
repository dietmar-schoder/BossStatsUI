import { ViewElement } from "./ViewElement.js";

export class StackPanel {
    root: ViewElement;
    constructor(element: ViewElement) {
        this.root = element;
    }

    public html(): string {
        return this.htmlTree(this.root);
    }

    htmlTree(element: ViewElement) {
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
