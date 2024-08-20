export class Configuration {
    readonly mobileWidthMax: number = 768;
    readonly desktopWidthMax: number = 1440;
    readonly lineHeightPC: number = 24;
    readonly lineHeightMobile: number = 48;
    readonly fontSizeFactor: number = 14 / 24;

    public screenWidth: number = 0;
    public screenMode: number = 0; // 0: cinema, 1: desktop, 2: mobile

    public widthAreaAB: number = 0;
    public widthAB: number = 0;
    public widthC: number = 0;

    public lineHeight: number = 0;
    public fontSize: number = 0;

    public setWidth(screenWidth: number) {
        this.screenWidth = screenWidth;
        this.screenMode = screenWidth < this.mobileWidthMax ? 2 : screenWidth < this.desktopWidthMax ? 1 : 0;

        this.widthAreaAB = this.screenMode == 0 ? Math.round(this.screenWidth * 2 /3) : this.screenWidth;
        this.widthAB = this.screenMode == 2 ? this.widthAreaAB : Math.round(this.widthAreaAB / 2);
        this.widthC = this.screenMode == 1 ? this.widthAreaAB : this.widthAB;

        this.lineHeight = this.screenMode == 2 ? this.lineHeightMobile : this.lineHeightPC;
        this.fontSize = Math.round(this.lineHeight * this.fontSizeFactor);
    }

    public valuesToString(): string {
        return "screenWidth: " + this.screenWidth.toString() + "<br />" +
            "screenMode: " + this.screenMode.toString() + "<br />" +
            "widthAreaAB: " + this.widthAreaAB.toString() + "<br />" +
            "widthAB: " + this.widthAB.toString() + "<br />" +
            "widthC: " + this.widthC.toString() + "<br />" +
            "lineHeight: " + this.lineHeight.toString() + "<br />" +
            "fontSize: " + this.fontSize.toString();
    }
}
