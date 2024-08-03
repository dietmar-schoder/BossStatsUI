import { ViewElement } from "./ViewElement.js";

var margin: number = 12;
var margin2: number = margin / 2;
var grey: string = "rgb(230,232,232)";

export class SvgTable extends ViewElement {
    constructor() {
        super();
        this.width = 1000;
        this.startTag = "";
        this.endTag = "</svg>";
    }

    public getStartTag = () => `<svg viewBox=\"0 0 ${this.width} ${this.height}\" style=\"display:block;\" xmlns=\"http://www.w3.org/2000/svg\">`;

    public html2(): string {
        let h: number = 0;
        this.children.forEach(entry => {
            entry.y = h;
            h = h + entry.height + margin;
        });
        this.height = h;

        let html = this.getStartTag();
        this.children.forEach(entry => {
            html = html + entry.getStartTag() + entry.content + entry.endTag;
        });
        return html + this.endTag;
    }
}

export class SvgButton extends ViewElement {
    constructor(caption: string, width: number, action: string, id: string) {
        super();
        this.startTag = "";
        this.content = caption;
        this.endTag = "";
        this.width = width;
        this.action = action;
        this.id = id;
    }

    public getStartTag = () =>
        `<rect x=\"${this.x}\" y=\"${this.y}\" width=\"${this.width}\" height=\"${this.height}\" fill=\"${grey}\" stroke-width=\"0\" />
        <text alignment-baseline=\"middle\" x=\"${this.x + margin2}\" y=\"${this.y + this.height / 2 + 1}\">${this.content}</text>
        <rect id=\"${this.action}|${this.id}\" x=\"${this.x}\" y=\"${this.y}\" width=\"${this.width}\" height=\"${this.height}\" fill=\"transparent\" stroke-width=\"0\" />`;
}

export class SvgText extends ViewElement {
    constructor(content: string) {
        super();
        this.startTag = "";
        this.content = content;
        this.endTag = "</text>";
    }

    public getStartTag = () => `<text alignment-baseline=\"middle\" x=\"${this.x.toString()}\" y=\"${this.y + this.height / 2 + 1}\">`;
}
