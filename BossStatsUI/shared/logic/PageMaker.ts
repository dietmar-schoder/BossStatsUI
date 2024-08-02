import { IViewElement } from "./IViewElement.js";

export class PageMaker {
    getHtml(element: IViewElement) {
        return element.startTag + element.content + element.endTag;
    }
}
