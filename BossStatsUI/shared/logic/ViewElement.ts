export class ViewElement {
    children: ViewElement[] = [];
    startTag: string = "";
    content: string = "";
    endTag: string = "";

    add(element: ViewElement): ViewElement {
        this.children.push(element);
        return element;
    }
}
