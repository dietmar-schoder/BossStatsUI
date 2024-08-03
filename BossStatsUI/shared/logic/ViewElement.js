export class ViewElement {
    children = [];
    startTag = "";
    content = "";
    endTag = "";
    add(element) {
        this.children.push(element);
        return element;
    }
}
