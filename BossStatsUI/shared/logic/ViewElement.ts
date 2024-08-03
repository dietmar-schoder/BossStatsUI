export class ViewElement {
    public children: ViewElement[] = [];
    public startTag: string = "";
    public content: string = "";
    public endTag: string = "";
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;
    public isHorizontal: boolean = false;
    public action: string = "";
    public id: string = "";

    add(element: ViewElement): ViewElement {
        this.children.push(element);
        return element;
    }

    public getStartTag = () => this.startTag;

    public getContent = () => this.content;

    public getEndTag = () => this.endTag;
}
