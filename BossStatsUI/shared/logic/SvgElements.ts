import { Quartiles } from "../models/FuehrrStats";

var grey = "rgb(230,232,232)";
var black = "rgb(0,0,0)";
var qBad = "rgb(255, 31, 31)";
var qMedium = "rgb(255,191,31)";
var qGood = "rgb(31,255,63)";
var q2Bad = "rgb(235, 15, 15)";
var q2Medium = "rgb(235,171,15)";
var q2Good = "rgb(15,235,15)";
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
    constructor(isHorizontal: boolean = false) {
        super(isHorizontal);
    }

    public getStartTag = () =>
        `<svg viewBox=\"0 0 ${this.width} ${this.height}\" style=\"display:block;\" xmlns=\"http://www.w3.org/2000/svg\">`;

    public getEndTag = () =>
        `<rect id=\"wait\" style=\"display:none\" x=\"0\" y=\"0\" width=\"24\" height=\"24\" fill=\"${black}\" stroke-width=\"0\" />
        </svg>`;
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
        `</text>
        <rect id=\"${this.action}|${this.id}\" style= "\cursor:pointer\" x=\"${this.x}\" y=\"${this.y}\" width=\"${this.width}\" height=\"${this.height}\" fill=\"transparent\" stroke-width=\"0\" />`;
}

export class SvgText extends SvgElement {
    constructor(content: string, width: number) {
        super();
        this.content = content;
        this.width = width;
        this.height = lineHeight;
    }

    public getStartTag = () =>
        `<rect x=\"${this.x}\" y=\"${this.y}\" width=\"${this.width}\" height=\"${this.height}\" fill=\"#DDDDDD\" stroke-width=\"0\" />` +
        `<text alignment-baseline=\"middle\" x=\"${this.x}\" y=\"${this.y + this.height / 2 + 1}\">`;

    public getEndTag = () =>
        "</text>";
}

export class SvgQuartile extends SvgElement {
    private _quartiles: Quartiles;

    constructor(quartiles: Quartiles, width: number) {
        super();
        this.width = width;
        this.height = lineHeight;
        this._quartiles = quartiles;
    }

    public getStartTag = () => {
        let factor = 600 / 4;
        let min = this._quartiles.minimum * factor;
        let q1 = this._quartiles.q1 * factor;
        let q3 = this._quartiles.q3 * factor;
        let max = this._quartiles.maximum * factor;
        let w1 = q1 - min > 1 ? q1 - min - 1 : 2;
        let w2 = q3 - q1 > 1 ? q3 - q1 - 1 : 2;
        let w3 = max - q3 > 1 ? max - q3 : 0;
        let med = this._quartiles.median * factor;

        let colourMin = this._quartiles.minimum > 2.66 ? qGood : this._quartiles.minimum > 1.33 ? qMedium : qBad;
        let colourQ1 = this._quartiles.q1 > 2.66 ? qGood : this._quartiles.q1 > 1.33 ? qMedium : qBad;
        let colourQ3 = this._quartiles.q3 > 2.66 ? qGood : this._quartiles.q3 > 1.33 ? qMedium : qBad;
        let colourMed = this._quartiles.median > 2.66 ? q2Good : this._quartiles.median > 1.33 ? q2Medium : q2Bad;

        return `
            <rect x=\"${this.x + min}\" y=\"${this.y}\" width=\"${w1}\" height=\"${this.height}\" fill=\"${colourMin}\" stroke-width=\"0\" />
            <rect x=\"${this.x + q1}\" y=\"${this.y}\" width=\"${w2}\" height=\"${this.height}\" fill=\"${colourQ1}\" stroke-width=\"0\" />
            <rect x=\"${this.x + q3}\" y=\"${this.y}\" width=\"${w3}\" height=\"${this.height}\" fill=\"${colourQ3}\" stroke-width=\"0\" />
            <rect x=\"${this.x + med}\" y=\"${this.y - 2}\" width=\"${2}\" height=\"${this.height + 4}\" fill=\"${colourMed}\" stroke-width=\"0\" />`
            //+ `<text alignment-baseline=\"middle\" x=\"${this.x}\" y=\"${this.y + this.height / 2 + 1}\">
            //${this._quartiles.minimum} ${this._quartiles.q1} ${this._quartiles.median} ${this._quartiles.q3} ${this._quartiles.maximum} 
            //</text>`
            ;
    }
}
