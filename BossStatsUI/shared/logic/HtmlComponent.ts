import { ViewElement } from "./ViewElement.js";

export class HtmlComponent {
    root: ViewElement;

    constructor(root: ViewElement) {
        this.root = root;
    }

    public html(): string {
        return this.htmlTree(this.root);
    }

    htmlTree(element: ViewElement) {
        var html = element.getStartTag() + element.content;

        if (element.children.length > 0) {
            element.children!.forEach(entry => {
                html = html + this.htmlTree(entry);
            });
        }

        return html + element.endTag;
    }
}
