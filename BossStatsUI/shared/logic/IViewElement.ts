export interface IViewElement {
    children: IViewElement[];
    startTag: string;
    content: string;
    endTag: string;

    add(element: IViewElement): void;
}
