export class Configuration {
    private _document: Document;

    readonly mobileWidthMax: number = 768;
    readonly desktopWidthMax: number = 1440;
    readonly lineHeightPC: number = 32;
    readonly lineHeightMobile: number = 40;
    readonly fontSizeFactor: number = 14 / 24;
    public readonly margin: number = this.lineHeightPC / 3;
    public readonly margin2: number = this.margin / 2;

    public screenWidth: number = 0;
    public screenMode: number = 0; // 0: cinema, 1: desktop, 2: mobile

    public widthAreaAB: number = 0;
    public widthAB: number = 0;
    public widthC: number = 0;

    public isHorizontalMain: boolean = false;
    public isHorizontalAB: boolean = false;

    public lineHeight: number = 0;
    public fontSize: number = 0;

    constructor(document: Document) {
        this._document = document;
    }

    public setWidth() {
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

    public columnWidthAB = (factor: number): number =>
        Math.round((this.widthAB + this.margin) * factor) - this.margin;

    public valuesToString = (): string =>
        `screenWidth: ${this.screenWidth}\r\n` +
        `screenMode: ${this.screenMode}\r\n` +
        `widthAreaAB: ${this.widthAreaAB}\r\n` +
        `widthAB: ${this.widthAB}\r\n` +
        `widthC: ${this.widthC}\r\n` +
        `lineHeight: ${this.lineHeight}\r\n` +
        `fontSize: ${this.fontSize}`;
}
