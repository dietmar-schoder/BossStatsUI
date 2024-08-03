import { ViewElement } from "./ViewElement.js";

var margin: number = 12;

export class ViewHelper {
    public html(root: ViewElement): string {
        this.calculateSizes(root);
        this.calculateXYs(root);
        return this.htmlTree(root);
    }

    private calculateSizes(element: ViewElement) {
        if (element.children.length == 0 || element.width > 0 || element.height > 0) { return; }
        if (element.isHorizontal) {
            element.children.forEach(child => {
                this.calculateSizes(child);
                element.width += child.width + margin;
                element.height = child.height > element.height ? child.height : element.height;
            })
        }
        else {
            element.children.forEach(child => {
                this.calculateSizes(child);
                element.height += child.height + margin;
                element.width = child.width > element.width ? child.width : element.width;
            })
        }
    }

    private calculateXYs(element: ViewElement) {
        if (element.children.length == 0) { return; }
        if (element.isHorizontal) {
            var xIncrement = element.x;
            element.children.forEach(child => {
                child.x = xIncrement;
                child.y = element.y;
                xIncrement += child.width + margin;
                this.calculateXYs(child);
            })
        }
        else {
            var yIncrement = element.y;
            element.children.forEach(child => {
                child.x = element.x;
                child.y = yIncrement;
                yIncrement += child.height + margin;
                this.calculateXYs(child);
            })
        }
    }

    private htmlTree(element: ViewElement) {
        var html = element.getStartTag() + element.getContent();

        if (element.children.length > 0) {
            element.children!.forEach(child => {
                html = html + this.htmlTree(child);
            });
        }

        return html + element.getEndTag();
    }
}
