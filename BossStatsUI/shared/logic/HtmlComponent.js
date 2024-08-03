export class HtmlComponent {
    root;
    constructor(root) {
        this.root = root;
    }
    html() {
        return this.htmlTree(this.root);
    }
    htmlTree(element) {
        var html = element.getStartTag() + element.content;
        if (element.children.length > 0) {
            element.children.forEach(entry => {
                html = html + this.htmlTree(entry);
            });
        }
        return html + element.endTag;
    }
}
