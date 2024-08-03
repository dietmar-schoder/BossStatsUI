import { ViewElement } from "./ViewElement.js";
var grey = "rgb(230,232,232)";
var lineHeight = 24;
var margin2 = 6;
export class SvgPanel extends ViewElement {
    constructor() {
        super();
    }
    getStartTag = () => `<svg viewBox=\"0 0 ${this.width} ${this.height}\" style=\"display:block;\" xmlns=\"http://www.w3.org/2000/svg\">`;
    getEndTag = () => "</svg>";
}
export class SvgButton extends ViewElement {
    constructor(caption, width, action, id) {
        super();
        this.content = caption;
        this.width = width;
        this.height = lineHeight;
        this.action = action;
        this.id = id;
    }
    getStartTag = () => `<rect x=\"${this.x}\" y=\"${this.y}\" width=\"${this.width}\" height=\"${this.height}\" fill=\"${grey}\" stroke-width=\"0\" />
        <text alignment-baseline=\"middle\" x=\"${this.x + margin2}\" y=\"${this.y + this.height / 2 + 1}\">`;
    getEndTag = () => `</text><rect id=\"${this.action}|${this.id}\" x=\"${this.x}\" y=\"${this.y}\" width=\"${this.width}\" height=\"${this.height}\" fill=\"transparent\" stroke-width=\"0\" />`;
}
export class SvgText extends ViewElement {
    constructor(content, width) {
        super();
        this.content = content;
        this.width = width;
        this.height = lineHeight;
    }
    getStartTag = () => `<text alignment-baseline=\"middle\" x=\"${this.x}\" y=\"${this.y + this.height / 2 + 1}\">`;
    getEndTag = () => "</text>";
}
