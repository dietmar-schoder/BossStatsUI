import { ViewElement } from "./ViewElement.js";

export class SvgTable extends ViewElement {
    constructor() {
        super();
        this.width = 600;
        this.startTag = "";
        this.endTag = "</svg>";
    }

    public getStartTag = () => `<svg viewBox=\"0 0 ${this.width} ${this.height}\" style=\"display:block;\" xmlns=\"http://www.w3.org/2000/svg\">`;

    public html2(): string {
        let h: number = 0;
        this.children.forEach(entry => {
            entry.y = h;
            h = h + entry.height;
        });
        this.height = h;

        let html = this.getStartTag();
        this.children.forEach(entry => {
            html = html + entry.getStartTag() + entry.content + entry.endTag;
        });
        return html + this.endTag;
    }
}

export class SvgText extends ViewElement {
    constructor(content: string) {
        super();
        this.startTag = "";
        this.content = content;
        this.endTag = "</text>";
    }

    public getStartTag = () => `<text id=\"details|${this.content}\" alignment-baseline=\"middle\" x=\"${this.x.toString()}\" y=\"${this.y + this.height / 2 + 1}\">`;
}
