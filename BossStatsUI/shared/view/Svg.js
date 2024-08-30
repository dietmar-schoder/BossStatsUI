const black = "rgb(0,0,0)";
const qBad = "rgb(255, 31, 31)";
const qMedium = "rgb(255,191,31)";
const qGood = "rgb(31,255,63)";
const q2Bad = "rgb(235, 15, 15)";
const q2Medium = "rgb(235,171,15)";
const q2Good = "rgb(15,235,15)";
export class SvgElement {
    children = [];
    startTag = "";
    content = "";
    endTag = "";
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    isHorizontal = false;
    get IsLeaf() {
        return this.children.length == 0;
    }
    constructor(isHorizontal = false) {
        this.isHorizontal = isHorizontal;
    }
    addList(elements) {
        this.children.push(...elements);
        return this;
    }
    add(...elements) {
        this.children.push(...elements);
        return this;
    }
    getStartTag = () => this.startTag;
    getContent = () => this.content;
    getEndTag = () => this.endTag;
}
export class SvgPanel extends SvgElement {
    screenWidth;
    hourGlassRadius;
    hourGlassSize;
    hourGlassSize2;
    hourGlassCentreX;
    constructor(screenWidth, lineHeight, isHorizontal = false) {
        super(isHorizontal);
        this.screenWidth = screenWidth;
        this.hourGlassRadius = lineHeight / 2;
        this.hourGlassSize = lineHeight + 12;
        this.hourGlassSize2 = this.hourGlassSize / 2;
        this.hourGlassCentreX = this.screenWidth - this.hourGlassSize2;
    }
    getStartTag = () => `<div width=${this.screenWidth}px><svg viewBox="0 0 ${this.screenWidth} ${this.height}" style="display:block;" xmlns="http://www.w3.org/2000/svg">`;
    getEndTag = () => `<g id="hourGlass" style="display:none">` +
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
    fontSize;
    background;
    fontColour;
    isEnabled;
    action;
    params;
    constructor(caption, width, height, fontSize, background, isEnabled, action, params) {
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
    getStartTag = () => `<rect x="${this.x}" y="${this.y}" rx="4" ry="4" width="${this.width}" height="${this.height}" fill="#${this.background}" stroke-width="0" />` +
        `<text alignment-baseline="middle" text-anchor="middle" x="${this.x + this.width / 2}" y="${this.y + this.height / 2 + 1}" font-size="${this.fontSize}" fill="#${this.fontColour}">`;
    getEndTag = () => `</text>` +
        (this.isEnabled ? `<rect id="${this.action}|${this.params}" style= "cursor:pointer" x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="transparent" stroke-width="0" />` : ``);
}
export class SvgTreeElementButton extends SvgButton {
    indent;
    constructor(caption, width, height, fontSize, background, action, params, indent) {
        super(caption, width, height, fontSize, background, true, action, params);
        this.indent = indent;
    }
    getStartTag = () => `<rect x="${this.x + this.indent}" y="${this.y}" rx="4" ry="4" width="${this.width - this.indent}" height="${this.height}" fill="#${this.background}" stroke-width="0" />` +
        `<text alignment-baseline="middle" x="${this.x + this.indent + 12}" y="${this.y + this.height / 2 + 1}" font-size="${this.fontSize}" fill="white">`;
    getEndTag = () => `</text>` +
        `<rect id="${this.action}|${this.params}" style= "cursor:pointer" x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="transparent" stroke-width="0" />`;
}
export class SvgTextCentered extends SvgElement {
    fontSize;
    colour;
    background;
    constructor(content, width, height = 24, fontSize = 14, colour = "000000", background = "FFFFFF") {
        super();
        this.content = content;
        this.width = width;
        this.height = height;
        this.fontSize = fontSize;
        this.colour = colour;
        this.background = background;
    }
    getStartTag = () => `<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="#${this.background}" stroke-width="0" />` +
        `<text alignment-baseline="middle" text-anchor="middle" x="${this.x + this.width / 2}" y="${this.y + this.height / 2 + 1}" font-size="${this.fontSize}" fill="#${this.colour}">`;
    getEndTag = () => `</text>`;
}
export class SvgText extends SvgElement {
    fontSize;
    colour;
    background;
    constructor(content, width, height = 24, fontSize = 14, colour = "000000", background = "FFFFFF") {
        super();
        this.content = content;
        this.width = width;
        this.height = height;
        this.fontSize = fontSize;
        this.colour = colour;
        this.background = background;
    }
    getStartTag = () => `<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="#${this.background}" stroke-width="0" />
        <text alignment-baseline="middle" x="${this.x + 12}" y="${this.y + this.height / 2 + 1}" font-size="${this.fontSize}" fill="#${this.colour}">`;
    getEndTag = () => `</text>`;
}
export class SvgQuartile extends SvgElement {
    menuSelection;
    widthPlusMargin;
    quartiles;
    constructor(menuSelection, height, widthPlusMargin, quartiles) {
        super();
        this.menuSelection = menuSelection;
        this.height = height;
        this.widthPlusMargin = widthPlusMargin;
        this.quartiles = quartiles;
    }
    getStartTag = () => {
        if (this.quartiles.n == 0) {
            return "";
        }
        let factor = Math.round(this.widthPlusMargin / (this.menuSelection == 2 ? 11 : 5)); // (5, 5, 11)?
        let offsetX = 18;
        let zeroMinus1 = this.menuSelection == 1 ? -1 : 0; // (0-4+, 1-5, 0-10) => start at 0 
        let min = (this.quartiles.minimum + zeroMinus1) * factor;
        let q1 = (this.quartiles.q1 + zeroMinus1) * factor;
        let med = (this.quartiles.median + zeroMinus1) * factor;
        let q3 = (this.quartiles.q3 + zeroMinus1) * factor;
        let max = (this.quartiles.maximum + zeroMinus1) * factor;
        let w1 = q1 - min;
        let w2 = med - q1;
        let w3 = q3 - med;
        let w4 = max - q3;
        let yH2 = this.y + this.height / 2 - 1;
        let mediumLimit = this.menuSelection == 0 ? 1.33 : this.menuSelection == 1 ? 2.33 : 3.33; // 1.33, 2.33, 3.33
        let goodLimit = this.menuSelection == 0 ? 2.66 : this.menuSelection == 1 ? 3.66 : 6.66; // 2.66, 3.66, 6.66
        let colour1 = this.quartiles.minimum > goodLimit ? qGood : this.quartiles.minimum > mediumLimit ? qMedium : qBad;
        let colour2 = this.quartiles.q1 > goodLimit ? qGood : this.quartiles.q1 > mediumLimit ? qMedium : qBad;
        let colourM = this.quartiles.median > goodLimit ? q2Good : this.quartiles.median > mediumLimit ? q2Medium : q2Bad;
        let colour3 = this.quartiles.q3 > goodLimit ? qGood : this.quartiles.q3 > mediumLimit ? qMedium : qBad;
        let colour4 = this.quartiles.maximum > goodLimit ? qGood : this.quartiles.maximum > mediumLimit ? qMedium : qBad;
        let svg1 = w1 > 0
            ? `<rect x="${this.x + offsetX + min - 1}" y="${this.y + 6}" width="2" height="${this.height - 12}" fill="${colour1}" stroke-width="0" />
                <rect x="${this.x + offsetX + min}" y="${yH2}" width="${w1}" height="2" fill="${colour1}" stroke-width="0" />`
            : ``;
        let svg2 = w2 > 0
            ? `<rect x="${this.x + offsetX + q1}" y="${this.y}" width="${w2}" height="${this.height}" fill="${colour2}" stroke-width="0" />`
            : ``;
        let svg3 = w3 > 0
            ? `<rect x="${this.x + offsetX + med}" y="${this.y}" width="${w3}" height="${this.height}" fill="${colour3}" stroke-width="0" />`
            : ``;
        let svg4 = w4 > 0
            ? `<rect x="${this.x + offsetX + q3}" y="${yH2}" width="${w4}" height="2" fill="${colour4}" stroke-width="0" />
                <rect x="${this.x + offsetX + max - 1}" y="${this.y + 6}" width="2" height="${this.height - 12}" fill="${colour4}" stroke-width="0" />`
            : ``;
        let svgMed = `<rect x="${this.x + offsetX + med - 2}" y="${this.y - 2}" width="4" height="${this.height + 4}" fill="${colourM}" stroke-width="0" />`;
        return svg1 + svg2 + svg3 + svg4 + svgMed;
    };
}
