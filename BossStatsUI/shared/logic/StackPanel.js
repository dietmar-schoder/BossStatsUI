export class StackPanel {
    root;
    constructor(element) {
        this.root = element;
    }
    html() {
        return this.htmlTree(this.root);
    }
    htmlTree(element) {
        var html = element.startTag;
        if (element.children.length > 0) {
            element.children.forEach(entry => {
                html = html + this.htmlTree(entry);
            });
        }
        else {
            html = html + element.content;
        }
        return html + element.endTag;
    }
}
//# sourceMappingURL=StackPanel.js.map