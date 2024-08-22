import { SvgButton, SvgButton2, SvgElement, SvgPanel, SvgQuartile, SvgText, SvgTextCentered } from "./SvgElements.js";
export var Page;
(function (Page) {
    Page[Page["Test"] = 0] = "Test";
    Page[Page["LeaderSnapshots"] = 1] = "LeaderSnapshots";
    Page[Page["LeaderSnapshotOneToOnes"] = 2] = "LeaderSnapshotOneToOnes";
    Page[Page["LeaderEvolution"] = 3] = "LeaderEvolution";
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
    Test() {
        const dataEntriesAB = ["Line 1 (A)|Details 1 (B)", "Line 2 (A)|Details 2 (B)", "Line 3 (A)|Details 3 (B)"];
        const dataEntriesC = ["Area C Line 1", "Area C Line 2", "Area C Line 3", "Area C Line 4"];
        const tableAB = [];
        const tableC = [];
        const menuButtonWidth = Math.round((this._configuration.widthAB + this._configuration.margin) * 0.25) - this._configuration.margin;
        const menuDateWidth = Math.round((this._configuration.widthAB + this._configuration.margin) * 0.5) - this._configuration.margin;
        const now = new Date();
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-GB', options);
        tableAB.push(new SvgElement(true).add(new SvgButton("Prev", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", 0, ""), new SvgTextCentered(formattedDate, menuDateWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", "FFFFFF"), new SvgButton("Next", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", 0, "")));
        dataEntriesAB.forEach(entry => {
            let entryFields = entry.split('|');
            tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(new SvgText(entryFields[0], this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "FAC100", "3D7A6E"), new SvgText(entryFields[1], this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "3D7A6E", "FAC100")));
        });
        dataEntriesC.forEach(entry => {
            tableC.push(new SvgElement(this._configuration.isHorizontalAB).add(new SvgText(entry, this._configuration.widthC, this._configuration.lineHeight, this._configuration.fontSize, "FAC100", "773D7A")));
        });
        return this._viewHelper.svgHtml(new SvgPanel(this._configuration.isHorizontalMain).add(new SvgElement().addList(tableAB), new SvgElement().addList(tableC)));
    }
    LeaderSnapshots(width, leaderSnapshots) {
        var svgPanel = new SvgPanel();
        leaderSnapshots.forEach(entry => {
            svgPanel.add(new SvgButton2(this._dateHelper.toDate(entry.date), width, Page.LeaderSnapshotOneToOnes, entry.id ?? ""));
        });
        return this._viewHelper.svgHtml(svgPanel);
    }
    LeaderSnapshotOneToOnes(width, leaderSnapshot) {
        var svgPanel = new SvgPanel();
        svgPanel.sub(new SvgElement(true))
            .add(new SvgButton2("BACK", 100 - 12, Page.LeaderSnapshots, ""))
            .add(new SvgText(this._dateHelper.toDate(leaderSnapshot.date), 200 - 12 - 4))
            .add(new SvgText("0", 150 - 12))
            .add(new SvgText("1", 150 - 12))
            .add(new SvgText("2", 150 - 12))
            .add(new SvgText("3", 150 - 12))
            .add(new SvgText("4", 150 - 12));
        leaderSnapshot.leaderDataEntries.forEach(entry => {
            let indent = entry.level * this._viewHelper.getMargin();
            let row = svgPanel.sub(new SvgElement(true));
            if (entry.level > 0) {
                row.add(new SvgText("", indent - this._viewHelper.getMargin()));
            }
            row
                .add(new SvgButton2(entry.name, 300 - 12 - indent, Page.LeaderEvolution, entry.personId))
                .add(new SvgQuartile(entry.oneToOneQuartiles, 660));
        });
        return this._viewHelper.svgHtml(svgPanel);
    }
    LeaderEvolution(width, leaderSnapshotId, leaderDataEntries) {
        var leaderName = leaderDataEntries[0].name;
        var svgPanel = new SvgPanel();
        svgPanel.sub(new SvgElement(true))
            .add(new SvgButton2("BACK", 100 - 12, Page.LeaderSnapshotOneToOnes, leaderSnapshotId))
            .add(new SvgText(leaderName, 200 - 12 - 4))
            .add(new SvgText("0", 150 - 12))
            .add(new SvgText("1", 150 - 12))
            .add(new SvgText("2", 150 - 12))
            .add(new SvgText("3", 150 - 12))
            .add(new SvgText("4", 150 - 12));
        leaderDataEntries.forEach(entry => {
            svgPanel.sub(new SvgElement(true))
                .add(new SvgText(this._dateHelper.toDate(entry.date), 300 - 12))
                .add(new SvgQuartile(entry.oneToOneQuartiles, 660));
        });
        return this._viewHelper.svgHtml(svgPanel);
    }
}
