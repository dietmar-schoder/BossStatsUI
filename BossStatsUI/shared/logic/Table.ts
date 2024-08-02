import { IViewElement } from "./IViewElement";

export class Table implements IViewElement {
    children: IViewElement[] = [];
    startTag: string = "<table>";
    content: string = "";
    endTag: string = "</table>";

    add(element: IViewElement) {
        this.children.push(element);
    }

    html() {
        var html = this.startTag;
        this.children!.forEach(entry => {
            html = html + entry.html();
        });
        return html + this.endTag;
    }
}
