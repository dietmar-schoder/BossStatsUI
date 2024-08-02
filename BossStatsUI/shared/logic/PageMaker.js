"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageMaker = void 0;
class PageMaker {
    getHtml(element) {
        return element.startTag + element.content + element.endTag;
    }
}
exports.PageMaker = PageMaker;
//# sourceMappingURL=PageMaker.js.map