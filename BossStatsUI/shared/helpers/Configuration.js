export class Configuration {
    mobileWidthMax = 768;
    desktopWidthMax = 1440;
    lineHeightPC = 36;
    lineHeightMobile = 48;
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
    setWidth(screenWidth) {
        this.screenWidth = screenWidth;
        this.screenMode = screenWidth < this.mobileWidthMax ? 2 : screenWidth < this.desktopWidthMax ? 1 : 0;
        this.widthAreaAB = (this.screenMode == 0 ? Math.round(this.screenWidth * 2 / 3) : this.screenWidth) - this.margin;
        this.widthAB = this.screenMode == 2 ? this.widthAreaAB : Math.round((this.widthAreaAB - this.margin) / 2);
        this.widthC = this.screenMode == 1 ? this.widthAreaAB : this.widthAB;
        this.isHorizontalMain = this.screenMode == 0;
        this.isHorizontalAB = this.screenMode < 2;
        this.lineHeight = this.screenMode == 2 ? this.lineHeightMobile : this.lineHeightPC;
        this.fontSize = Math.round(this.lineHeight * this.fontSizeFactor);
    }
    valuesToString() {
        return "screenWidth: " + this.screenWidth.toString() + "<br />" +
            "screenMode: " + this.screenMode.toString() + "<br />" +
            "widthAreaAB: " + this.widthAreaAB.toString() + "<br />" +
            "widthAB: " + this.widthAB.toString() + "<br />" +
            "widthC: " + this.widthC.toString() + "<br />" +
            "lineHeight: " + this.lineHeight.toString() + "<br />" +
            "fontSize: " + this.fontSize.toString();
    }
}
