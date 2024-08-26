import { Quartiles } from "../models/FuehrrStats.js";

var grey = "rgb(230,232,232)";
var black = "rgb(0,0,0)";
var qBad = "rgb(255, 31, 31)";
var qMedium = "rgb(255,191,31)";
var qGood = "rgb(31,255,63)";
var q2Bad = "rgb(235, 15, 15)";
var q2Medium = "rgb(235,171,15)";
var q2Good = "rgb(15,235,15)";
var lineHeight = 0;

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

    public get IsLeaf(): boolean {
        return this.children.length == 0;
    }

    constructor(isHorizontal = false) {
        this.isHorizontal = isHorizontal;
    }

    addList(elements: SvgElement[]): SvgElement {
        this.children.push(...elements);
        return this;
    }
    add(...elements: SvgElement[]): SvgElement {
        this.children.push(...elements);
        return this;
    }

    public getStartTag = () => this.startTag;

    public getContent = () => this.content;

    public getEndTag = () => this.endTag;
}

export class SvgPanel extends SvgElement {
    private screenWidth: number;
    private hourGlassRadius: number;
    private hourGlassSize: number;
    private hourGlassSize2: number;
    private hourGlassCentreX: number;

    constructor(screenWidth: number, lineHeight: number, isHorizontal: boolean = false) {
        super(isHorizontal);
        this.screenWidth = screenWidth;
        this.hourGlassRadius = lineHeight / 2;
        this.hourGlassSize = lineHeight + 12;
        this.hourGlassSize2 = this.hourGlassSize / 2;
        this.hourGlassCentreX = this.screenWidth - this.hourGlassSize2;
    }

    public getStartTag = () =>
        `<div width=${this.screenWidth}px><svg viewBox="0 0 ${this.screenWidth} ${this.height}" style="display:block;" xmlns="http://www.w3.org/2000/svg">`;

    public getEndTag = () =>
        `<g id="hourGlass" style="display:none">` +
        `<rect x="${this.screenWidth - this.hourGlassSize}" y="0" width="${this.hourGlassSize}" height="${this.hourGlassSize}" fill="#FFFFFF" stroke-width="0" />` +
        `<circle cx="${this.hourGlassCentreX}" cy="${this.hourGlassSize2}" r="${this.hourGlassRadius}" fill="${black}" stroke-width="0" />` +
        `<line id="rotatingLine" x1="${this.hourGlassCentreX}" y1="6" x2="${this.hourGlassCentreX}" y2="${this.hourGlassSize2}" stroke="white" stroke-width="1"` +
        ` style="transform-origin: ${this.hourGlassCentreX}px ${this.hourGlassSize2}px;" />` +
        `</g></div></svg>`;
}

//export class SvgButton2 extends SvgElement {
//    constructor(caption: string, width: number, action: number, id: string) {
//        super();
//        this.content = caption;
//        this.width = width;
//        this.height = 24;
//        this.action = action;
//        this.id = id;
//    }

//    public getStartTag = () =>
//        `<rect x=\"${this.x}\" y=\"${this.y}\" width=\"${this.width}\" height=\"${this.height}\" fill=\"${grey}\" stroke-width=\"0\" />` +
//        `<text alignment-baseline=\"middle\" x=\"${this.x + margin2}\" y=\"${this.y + this.height / 2 + 1}\">`;

//    public getEndTag = () =>
//        `</text>` +
//        `<rect id=\"${this.action}|${this.id}\" style= "\cursor:pointer\" x=\"${this.x}\" y=\"${this.y}\" width=\"${this.width}\" height=\"${this.height}\" fill=\"transparent\" stroke-width=\"0\" />`;
//}

export class SvgButton extends SvgElement {
    protected fontSize: number;
    protected background: string;
    protected fontColour: string;
    protected isEnabled: boolean;
    protected action: number;
    protected params: string;

    constructor(caption: string, width: number, height: number, fontSize: number, background: string, isEnabled: boolean, action: number, params: string) {
        super();
        this.content = caption;
        this.width = width;
        this.height = height;
        this.fontSize = fontSize;
        this.background = isEnabled ? background : "999999";
        this.fontColour = isEnabled ? "FFFFFF" : "CCCCCC";
        this.isEnabled = isEnabled;
        this.action = action;
        this.params = params;
    }

    public getStartTag = () =>
        `<rect x="${this.x}" y="${this.y}" rx="4" ry="4" width="${this.width}" height="${this.height}" fill="#${this.background}" stroke-width="0" />` +
        `<text alignment-baseline="middle" text-anchor="middle" x="${this.x + this.width / 2}" y="${this.y + this.height / 2 + 1}" font-size="${this.fontSize}" fill="#${this.fontColour}">`;

    public getEndTag = () =>
        `</text>` +
        (this.isEnabled ? `<rect id="${this.action}|${this.params}" style= "cursor:pointer" x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="transparent" stroke-width="0" />` : ``);
}

export class SvgTreeElementButton extends SvgButton {
    private indent: number;

    constructor(caption: string, width: number, height: number, fontSize: number, background: string, action: number, params: string,
        indent: number) {
        super(caption, width, height, fontSize, background, true, action, params);
        this.indent = indent;
    }

    public getStartTag = () =>
        `<rect x="${this.x + this.indent}" y="${this.y}" rx="4" ry="4" width="${this.width - this.indent}" height="${this.height}" fill="#${this.background}" stroke-width="0" />` +
        `<text alignment-baseline="middle" x="${this.x + this.indent + 12}" y="${this.y + this.height / 2 + 1}" font-size="${this.fontSize}" fill="white">`;

    public getEndTag = () =>
        `</text>` +
        `<rect id="${this.action}|${this.params}" style= "cursor:pointer" x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="transparent" stroke-width="0" />`;
}

export class SvgTextCentered extends SvgElement {
    private fontSize: number;
    private colour: string;
    private background: string;

    constructor(content: string, width: number, height: number = 24, fontSize: number = 14, colour: string = "000000", background: string = "FFFFFF") {
        super();
        this.content = content;
        this.width = width;
        this.height = height;
        this.fontSize = fontSize;
        this.colour = colour;
        this.background = background;
    }

    public getStartTag = () =>
        `<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="#${this.background}" stroke-width="0" />` +
        `<text alignment-baseline="middle" text-anchor="middle" x="${this.x + this.width / 2}" y="${this.y + this.height / 2 + 1}" font-size="${this.fontSize}" fill="#${this.colour}">`;

    public getEndTag = () =>
        `</text>`;
}

export class SvgText extends SvgElement {
    private fontSize: number;
    private colour: string;
    private background: string;

    constructor(content: string, width: number, height: number = 24, fontSize: number = 14, colour: string = "000000", background: string = "FFFFFF") {
        super();
        this.content = content;
        this.width = width;
        this.height = height;
        this.fontSize = fontSize;
        this.colour = colour;
        this.background = background;
    }

    public getStartTag = () =>
        `<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="#${this.background}" stroke-width="0" />` +
        `<text alignment-baseline="middle" x="${this.x + 12}" y="${this.y + this.height / 2 + 1}" font-size="${this.fontSize}" fill="#${this.colour}">`;

    public getEndTag = () =>
        `</text>`;
}

export class SvgQuartile extends SvgElement {
    private widthPlusMargin: number;
    private quartiles: Quartiles;

    constructor(height: number, widthPlusMargin: number, quartiles: Quartiles) {
        super();
        this.height = height;
        this.widthPlusMargin = widthPlusMargin;
        this.quartiles = quartiles;
    }

    public getStartTag = () => {
        let factor = Math.round(this.widthPlusMargin / 5);
        let offsetX = 18;
        let min = this.quartiles.minimum * factor;
        let q1 = this.quartiles.q1 * factor;
        let q3 = this.quartiles.q3 * factor;
        let max = this.quartiles.maximum * factor;
        let w1 = q1 - min > 1 ? q1 - min - 1 : 2;
        let w2 = q3 - q1 > 1 ? q3 - q1 - 1 : 2;
        let w3 = max - q3 > 1 ? max - q3 : 0;
        let med = this.quartiles.median * factor;

        let colourMin = this.quartiles.minimum > 2.66 ? qGood : this.quartiles.minimum > 1.33 ? qMedium : qBad;
        let colourQ1 = this.quartiles.q1 > 2.66 ? qGood : this.quartiles.q1 > 1.33 ? qMedium : qBad;
        let colourQ3 = this.quartiles.q3 > 2.66 ? qGood : this.quartiles.q3 > 1.33 ? qMedium : qBad;
        let colourMed = this.quartiles.median > 2.66 ? q2Good : this.quartiles.median > 1.33 ? q2Medium : q2Bad;

        return `<rect x="${this.x + offsetX + min}" y="${this.y}" width="${w1}" height="${this.height}" fill="${colourMin}" stroke-width="0" />
            <rect x="${this.x + offsetX + q1}" y="${this.y}" width="${w2}" height="${this.height}" fill="${colourQ1}" stroke-width="0" />
            <rect x="${this.x + offsetX + q3}" y="${this.y}" width="${w3}" height="${this.height}" fill="${colourQ3}" stroke-width="0" />
            <rect x="${this.x + offsetX + med}" y="${this.y - 2}" width="${2}" height="${this.height + 4}" fill="${colourMed}" stroke-width="0" />`
            //+ `<text alignment-baseline=\"middle\" x=\"${this.x}\" y=\"${this.y + this.height / 2 + 1}\">
            //${this._quartiles.minimum} ${this._quartiles.q1} ${this._quartiles.median} ${this._quartiles.q3} ${this._quartiles.maximum} 
            //</text>`
            ;
    }
}
