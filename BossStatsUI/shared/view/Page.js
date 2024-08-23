import { SvgElement, SvgButton, SvgTextCentered, SvgText, SvgPanel } from "./Svg.js";
export var Pages;
(function (Pages) {
    Pages[Pages["LeaderSnapshotOneToOnes"] = 0] = "LeaderSnapshotOneToOnes";
    Pages[Pages["LeaderEvolution"] = 1] = "LeaderEvolution";
})(Pages || (Pages = {}));
export class Page {
    _configuration;
    _dateHelper;
    _viewHelper;
    constructor(configuration, dateHelper, viewHelper) {
        this._dateHelper = dateHelper;
        this._viewHelper = viewHelper;
        this._configuration = configuration;
    }
    LeaderSnapshotOneToOnes(companyId, leaderSnapshot, prevIndex, nextIndex) {
        const formattedDate = this._dateHelper.daysToDdMmmYyyy(leaderSnapshot.daysSince2000);
        const leaderDataEntries = leaderSnapshot.leaderDataEntries;
        const prevActionParams = `${companyId};${prevIndex}`;
        const nextActionParams = `${companyId};${nextIndex}`;
        const tableAB = [];
        const menuButtonWidth = Math.round((this._configuration.widthAB + this._configuration.margin) * 0.25) - this._configuration.margin;
        const menuDateWidth = Math.round((this._configuration.widthAB + this._configuration.margin) * 0.5) - this._configuration.margin;
        tableAB.push(new SvgElement(true).add(new SvgButton("Prev", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", Pages.LeaderSnapshotOneToOnes, prevActionParams), new SvgTextCentered(formattedDate, menuDateWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", "FFFFFF"), new SvgButton("Next", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", Pages.LeaderSnapshotOneToOnes, nextActionParams)));
        leaderDataEntries.forEach(entry => {
            tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(new SvgText(entry.name, this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "FAC100", "3D7A6E"), new SvgText(entry.level.toString(), this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "3D7A6E", "FAC100")));
        });
        const tableC = []; // area C
        const dataEntriesC = ["Area C Line 1", "Area C Line 2", "Area C Line 3", "Area C Line 4"]; // area C
        dataEntriesC.forEach(entry => {
            tableC.push(new SvgElement(this._configuration.isHorizontalAB).add(// area C
            new SvgText(entry, this._configuration.widthC, this._configuration.lineHeight, this._configuration.fontSize, "FAC100", "773D7A"))); // area C
        }); // area C
        return this._viewHelper.svgHtml(new SvgPanel(this._configuration.isHorizontalMain).add(new SvgElement().addList(tableAB), new SvgElement().addList(tableC)) // area C
        );
    }
}
