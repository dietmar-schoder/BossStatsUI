export class ViewElement {
    children: ViewElement[] = [];
    startTag: string = "";
    content: string = "";
    endTag: string = "";

    add(element: ViewElement) {
        this.children.push(element);
    }
}
