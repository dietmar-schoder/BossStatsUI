export class Configuration {
    mobileWidthMax = 768;
    desktopWidthMax = 1440;
    screenWidth = 0;
    screenMode = 0; // 0: cinema, 1: desktop, 2: mobile
    setWidth(screenWidth) {
        this.screenWidth = screenWidth;
        this.screenMode = screenWidth < this.mobileWidthMax ? 2 : screenWidth < this.desktopWidthMax ? 1 : 0;
    }
}
