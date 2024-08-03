export class ViewElement {
    children = [];
    startTag = "";
    content = "";
    endTag = "";
    x = 0;
    y = 0;
    width = 0;
    height = 24;
    add(element) {
        this.children.push(element);
        return element;
    }
    getStartTag = () => this.startTag;
    getEndTag = () => this.endTag;
}
