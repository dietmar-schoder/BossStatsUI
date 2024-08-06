import { OneToOneQuartiles } from "../models/FuehrrStats";

var grey = "rgb(230,232,232)";
var q = "rgb(155,96,155)";
var lineHeight = 24;
var margin2 = 6;

export class SvgElement {
    public children: SvgElement[] = [];
    public startTag = "";
    public content = "";
    public endTag = "";
    public x = 0;
    public y = 0;
    public width = 0;
    public height = 0;
    public isHorizontal = false;
    public action = 0;
    public id = "";

    constructor(isHorizontal = false) {
        this.isHorizontal = isHorizontal;
    }

    add(element: SvgElement): SvgElement {
        this.children.push(element);
        return this;
    }

    sub(element: SvgElement): SvgElement {
        this.children.push(element);
        return element;
    }

    public getStartTag = () => this.startTag;

    public getContent = () => this.content;

    public getEndTag = () => this.endTag;
}

export class SvgPanel extends SvgElement {
    constructor() {
        super();
    }

    public getStartTag = () =>
        `<svg viewBox=\"0 0 ${this.width} ${this.height}\" style=\"display:block;\" xmlns=\"http://www.w3.org/2000/svg\">`;

    public getEndTag = () =>
        "</svg>";
}

export class SvgButton extends SvgElement {
    constructor(caption: string, width: number, action: number, id: string) {
        super();
        this.content = caption;
        this.width = width;
        this.height = lineHeight;
        this.action = action;
        this.id = id;
    }

    public getStartTag = () =>
        `<rect x=\"${this.x}\" y=\"${this.y}\" width=\"${this.width}\" height=\"${this.height}\" fill=\"${grey}\" stroke-width=\"0\" />
        <text alignment-baseline=\"middle\" x=\"${this.x + margin2}\" y=\"${this.y + this.height / 2 + 1}\">`;

    public getEndTag = () =>
        `</text><rect id=\"${this.action}|${this.id}\" x=\"${this.x}\" y=\"${this.y}\" width=\"${this.width}\" height=\"${this.height}\" fill=\"transparent\" stroke-width=\"0\" />`;
}

export class SvgText extends SvgElement {
    constructor(content: string, width: number) {
        super();
        this.content = content;
        this.width = width;
        this.height = lineHeight;
    }

    public getStartTag = () =>
        `<text alignment-baseline=\"middle\" x=\"${this.x}\" y=\"${this.y + this.height / 2 + 1}\">`;

    public getEndTag = () =>
        "</text>";
}

export class SvgQuartile extends SvgElement {
    private _quartiles: OneToOneQuartiles;

    constructor(quartiles: OneToOneQuartiles, width: number) {
        super();
        this.width = width;
        this.height = lineHeight;
        this._quartiles = quartiles;
    }

    public getStartTag = () => {
        let factor = 612 / 4;
        let min = this._quartiles.minimum * factor;
        let q1 = this._quartiles.q1 * factor;
        let med = this._quartiles.median * factor;
        let q3 = this._quartiles.q3 * factor;
        let max = this._quartiles.maximum * factor;
        return `<rect x=\"${this.x + min}\" y=\"${this.y}\" width=\"${q1 - min - 1}\" height=\"${this.height}\" fill=\"${q}\" stroke-width=\"0\" />
            <rect x=\"${this.x + q1}\" y=\"${this.y}\" width=\"${med - q1 - 1}\" height=\"${this.height}\" fill=\"${q}\" stroke-width=\"0\" />
            <rect x=\"${this.x + med + 1}\" y=\"${this.y}\" width=\"${q3 - med - 2}\" height=\"${this.height}\" fill=\"${q}\" stroke-width=\"0\" />
            <rect x=\"${this.x + q3}\" y=\"${this.y}\" width=\"${max - q3 - 1}\" height=\"${this.height}\" fill=\"${q}\" stroke-width=\"0\" />`;
    }
}
