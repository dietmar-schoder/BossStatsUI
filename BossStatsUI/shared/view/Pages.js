import { SvgElement, SvgButton, SvgTextCentered, SvgText, SvgPanel } from "./SvgElements.js";
export var Page;
(function (Page) {
    Page[Page["LeaderSnapshots"] = 0] = "LeaderSnapshots";
    Page[Page["LeaderSnapshotOneToOnes"] = 1] = "LeaderSnapshotOneToOnes";
    Page[Page["LeaderEvolution"] = 2] = "LeaderEvolution";
})(Page || (Page = {}));
export class Pages {
    _configuration;
    _dateHelper;
    _viewHelper;
    constructor(configuration, dateHelper, viewHelper) {
        this._dateHelper = dateHelper;
        this._viewHelper = viewHelper;
        this._configuration = configuration;
    }
    LeaderSnapshotOneToOnes(companyId, leaderSnapshots, selectedLeaderSnapshotIndex) {
        const selectedLeaderSnapshot = leaderSnapshots[selectedLeaderSnapshotIndex];
        const leaderDataEntries = leaderSnapshots[selectedLeaderSnapshotIndex].leaderDataEntries;
        const tableAB = [];
        const tableC = [];
        const menuButtonWidth = Math.round((this._configuration.widthAB + this._configuration.margin) * 0.25) - this._configuration.margin;
        const menuDateWidth = Math.round((this._configuration.widthAB + this._configuration.margin) * 0.5) - this._configuration.margin;
        const dataEntriesC = ["Area C Line 1", "Area C Line 2", "Area C Line 3", "Area C Line 4"];
        const formattedDate = this._dateHelper.daysToDdMmmYyyy(selectedLeaderSnapshot.daysSince2000);
        const prevIndex = selectedLeaderSnapshotIndex + (selectedLeaderSnapshotIndex < leaderSnapshots.length - 1 ? 1 : 0);
        const nextIndex = selectedLeaderSnapshotIndex - (selectedLeaderSnapshotIndex > 0 ? 1 : 0);
        const prevActionParams = `${companyId};${prevIndex}`;
        const nextActionParams = `${companyId};${nextIndex}`;
        tableAB.push(new SvgElement(true).add(new SvgButton("Prev", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", Page.LeaderSnapshotOneToOnes, prevActionParams), new SvgTextCentered(formattedDate, menuDateWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", "FFFFFF"), new SvgButton("Next", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", Page.LeaderSnapshotOneToOnes, nextActionParams)));
        leaderDataEntries.forEach(entry => {
            tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(new SvgText(entry.name, this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "FAC100", "3D7A6E"), new SvgText(entry.level.toString(), this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "3D7A6E", "FAC100")));
        });
        dataEntriesC.forEach(entry => {
            tableC.push(new SvgElement(this._configuration.isHorizontalAB).add(new SvgText(entry, this._configuration.widthC, this._configuration.lineHeight, this._configuration.fontSize, "FAC100", "773D7A")));
        });
        return this._viewHelper.svgHtml(new SvgPanel(this._configuration.isHorizontalMain).add(new SvgElement().addList(tableAB), new SvgElement().addList(tableC)));
    }
}
