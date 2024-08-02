import { IViewElement } from "./IViewElement";

export class PageMaker {
    getHtml(element: IViewElement) {
        return element.startTag + element.content + element.endTag;
    }
}
