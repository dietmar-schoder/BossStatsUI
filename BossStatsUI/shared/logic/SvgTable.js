import { ViewElement } from "./ViewElement.js";
var margin = 12;
var margin2 = margin / 2;
var grey = "rgb(230,232,232)";
export class SvgTable extends ViewElement {
    constructor() {
        super();
        this.width = 1000;
        this.startTag = "";
        this.endTag = "</svg>";
    }
    getStartTag = () => `<svg viewBox=\"0 0 ${this.width} ${this.height}\" style=\"display:block;\" xmlns=\"http://www.w3.org/2000/svg\">`;
    html() {
        let h = 0;
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
    constructor(caption, width, action, id) {
        super();
        this.startTag = "";
        this.content = caption;
        this.endTag = "";
        this.width = width;
        this.action = action;
        this.id = id;
    }
    getStartTag = () => `<rect x=\"${this.x}\" y=\"${this.y}\" width=\"${this.width}\" height=\"${this.height}\" fill=\"${grey}\" stroke-width=\"0\" />
        <text alignment-baseline=\"middle\" x=\"${this.x + margin2}\" y=\"${this.y + this.height / 2 + 1}\">${this.content}</text>
        <rect id=\"${this.action}|${this.id}\" x=\"${this.x}\" y=\"${this.y}\" width=\"${this.width}\" height=\"${this.height}\" fill=\"transparent\" stroke-width=\"0\" />`;
}
export class SvgText extends ViewElement {
    constructor(content) {
        super();
        this.startTag = "";
        this.content = content;
        this.endTag = "</text>";
    }
    getStartTag = () => `<text alignment-baseline=\"middle\" x=\"${this.x.toString()}\" y=\"${this.y + this.height / 2 + 1}\">`;
}
