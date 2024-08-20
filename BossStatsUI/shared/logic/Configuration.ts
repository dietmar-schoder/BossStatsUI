export class Configuration {
    readonly mobileWidthMax: number = 768;
    readonly desktopWidthMax: number = 1440;
    public screenWidth: number = 0;
    public screenMode: number = 0; // 0: cinema, 1: desktop, 2: mobile

    public setWidth(screenWidth: number) {
        this.screenWidth = screenWidth;
        this.screenMode = screenWidth < this.mobileWidthMax ? 2 : screenWidth < this.desktopWidthMax ? 1 : 0;
    }
}
