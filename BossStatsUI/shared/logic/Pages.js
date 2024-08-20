import { SvgButton, SvgElement, SvgPanel, SvgQuartile, SvgText } from "./SvgElements.js";
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
        var svgPanel = new SvgPanel(this._configuration.isHorizontalMain);
        svgPanel.sub(new SvgElement(this._configuration.isHorizontalAB))
            .add(new SvgText("A", this._configuration.widthAB))
            .add(new SvgText("B", this._configuration.widthAB));
        svgPanel.add(new SvgText("C", this._configuration.widthC));
        return this._viewHelper.svgHtml(svgPanel);
    }
    LeaderSnapshots(width, leaderSnapshots) {
        var svgPanel = new SvgPanel();
        leaderSnapshots.forEach(entry => {
            svgPanel.add(new SvgButton(this._dateHelper.toDate(entry.date), width, Page.LeaderSnapshotOneToOnes, entry.id ?? ""));
        });
        return this._viewHelper.svgHtml(svgPanel);
    }
    LeaderSnapshotOneToOnes(width, leaderSnapshot) {
        var svgPanel = new SvgPanel();
        svgPanel.sub(new SvgElement(true))
            .add(new SvgButton("BACK", 100 - 12, Page.LeaderSnapshots, ""))
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
                .add(new SvgButton(entry.name, 300 - 12 - indent, Page.LeaderEvolution, entry.personId))
                .add(new SvgQuartile(entry.oneToOneQuartiles, 660));
        });
        return this._viewHelper.svgHtml(svgPanel);
    }
    LeaderEvolution(width, leaderSnapshotId, leaderDataEntries) {
        var leaderName = leaderDataEntries[0].name;
        var svgPanel = new SvgPanel();
        svgPanel.sub(new SvgElement(true))
            .add(new SvgButton("BACK", 100 - 12, Page.LeaderSnapshotOneToOnes, leaderSnapshotId))
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
