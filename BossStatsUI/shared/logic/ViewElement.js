export class ViewElement {
    children = [];
    startTag = "";
    content = "";
    endTag = "";
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    isHorizontal = false;
    action = "";
    id = "";
    add(element) {
        this.children.push(element);
        return element;
    }
    getStartTag = () => this.startTag;
    getContent = () => this.content;
    getEndTag = () => this.endTag;
}
