import { Configuration } from "../helpers/Configuration.js";
import { SvgElement } from "./Svg.js";

var margin = 12;

export class ViewHelper {
    private config: Configuration;

    constructor(config: Configuration) {
        this.config = config;
    }

    public svgHtml(root: SvgElement): string {
        this.calculateSizes(root);
        this.calculateXYs(root);
        return this.html(root);
    }

    public html(root: SvgElement): string {
        return this.htmlTree(root);
    }

    public getMargin = () => margin;

    private calculateSizes(element: SvgElement) {
        if (element.IsLeaf || element.width > 0 || element.height > 0) { return; }
        if (element.isHorizontal) {
            element.children.forEach(child => {
                this.calculateSizes(child);
                var margin = child.IsLeaf ? this.config.margin : 0;
                element.width += child.width + margin;
                element.height = (child.height + margin) > element.height ? (child.height + margin) : element.height;
            })
        }
        else {
            element.children.forEach(child => {
                this.calculateSizes(child);
                var margin = child.IsLeaf ? this.config.margin : 0;
                element.height += child.height + margin;
                element.width = (child.width + margin) > element.width ? (child.width + margin) : element.width;
            })
        }
    }

    private calculateXYs(element: SvgElement) {
        if (element.IsLeaf) { return; }
        if (element.isHorizontal) {
            var xIncrement = element.x;
            element.children.forEach(child => {
                var margin = child.IsLeaf ? this.config.margin : 0;
                var offset = child.IsLeaf ? this.config.margin2 : 0;
                child.x = xIncrement + offset;
                child.y = element.y + offset;
                xIncrement += child.width + margin;
                this.calculateXYs(child);
            })
        }
        else {
            var yIncrement = element.y;
            element.children.forEach(child => {
                var margin = child.IsLeaf ? this.config.margin : 0;
                var offset = child.IsLeaf ? this.config.margin2 : 0;
                child.x = element.x + offset;
                child.y = yIncrement + offset;
                yIncrement += child.height + margin;
                this.calculateXYs(child);
            })
        }
    }

    private htmlTree(element: SvgElement) {
        var html = element.getStartTag() + element.getContent();

        if (element.children.length > 0) {
            element.children.forEach(child => {
                html += this.htmlTree(child);
            });
        }

        return html + element.getEndTag();
    }
}
