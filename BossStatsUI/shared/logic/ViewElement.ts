export class ViewElement {
    public children: ViewElement[] = [];
    public startTag = "";
    public content = "";
    public endTag = "";
    public x = 0;
    public y = 0;
    public width = 0;
    public height = 0;
    public isHorizontal = false;
    public action = "";
    public id = "";

    add(element: ViewElement): ViewElement {
        this.children.push(element);
        return element;
    }

    public getStartTag = () => this.startTag;

    public getContent = () => this.content;

    public getEndTag = () => this.endTag;
}
