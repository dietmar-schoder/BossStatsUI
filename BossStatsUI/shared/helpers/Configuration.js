export class Configuration {
    _document;
    mobileWidthMax = 768;
    desktopWidthMax = 1440;
    lineHeightPC = 32;
    lineHeightMobile = 40;
    fontSizeFactor = 14 / 24;
    margin = this.lineHeightPC / 3;
    margin2 = this.margin / 2;
    screenWidth = 0;
    screenMode = 0; // 0: cinema, 1: desktop, 2: mobile
    widthAreaAB = 0;
    widthAB = 0;
    widthC = 0;
    isHorizontalMain = false;
    isHorizontalAB = false;
    lineHeight = 0;
    fontSize = 0;
    constructor(document) {
        this._document = document;
    }
    setWidth() {
        this.screenWidth = this._document.documentElement.clientWidth;
        this.screenMode = this.screenWidth < this.mobileWidthMax ? 2 : this.screenWidth < this.desktopWidthMax ? 1 : 0;
        this.widthAreaAB = (this.screenMode == 0 ? Math.round(this.screenWidth * 2 / 3) : this.screenWidth) - this.margin;
        this.widthAB = this.screenMode == 2 ? this.widthAreaAB : Math.round((this.widthAreaAB - this.margin) / 2);
        this.widthC = this.screenMode == 1 ? this.widthAreaAB : this.widthAB;
        this.isHorizontalMain = this.screenMode == 0;
        this.isHorizontalAB = this.screenMode < 2;
        this.lineHeight = this.screenMode == 2 ? this.lineHeightMobile : this.lineHeightPC;
        this.fontSize = Math.round(this.lineHeight * this.fontSizeFactor);
    }
    columnWidthAB = (factor) => Math.round((this.widthAB + this.margin) * factor) - this.margin;
    valuesToString = () => `screenWidth: ${this.screenWidth}\r\n` +
        `screenMode: ${this.screenMode}\r\n` +
        `widthAreaAB: ${this.widthAreaAB}\r\n` +
        `widthAB: ${this.widthAB}\r\n` +
        `widthC: ${this.widthC}\r\n` +
        `lineHeight: ${this.lineHeight}\r\n` +
        `fontSize: ${this.fontSize}`;
}
