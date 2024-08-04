import { SvgButton, SvgElement, SvgPanel, SvgText } from "./SvgElements.js";
export var Page;
(function (Page) {
    Page[Page["LeaderSnapshots"] = 0] = "LeaderSnapshots";
    Page[Page["LeaderSnapshotOneToOnes"] = 1] = "LeaderSnapshotOneToOnes";
    Page[Page["LeaderEvolution"] = 2] = "LeaderEvolution";
})(Page || (Page = {}));
export class Pages {
    _dateHelper;
    _viewHelper;
    constructor(dateHelper, viewHelper) {
        this._dateHelper = dateHelper;
        this._viewHelper = viewHelper;
    }
    // Create Pages/SVG/HTML
    LeaderSnapshots(leaderSnapshots) {
        var svgPanel = new SvgPanel();
        leaderSnapshots.forEach(entry => {
            svgPanel.add(new SvgButton(this._dateHelper.toDate(entry.date), 912, Page.LeaderSnapshotOneToOnes, entry.id ?? ""));
        });
        return this._viewHelper.svgHtml(svgPanel);
    }
    LeaderSnapshotOneToOnes(leaderSnapshot) {
        var svgPanel = new SvgPanel();
        svgPanel.sub(new SvgElement(true))
            .add(new SvgButton("BACK", 76, Page.LeaderSnapshots, ""))
            .add(new SvgText(this._dateHelper.toDate(leaderSnapshot.date), 812));
        leaderSnapshot.leaderDataEntries.forEach(entry => {
            let indent = Array(entry.level + 1).join('-');
            svgPanel.sub(new SvgElement(true))
                .add(new SvgButton(indent + entry.name, 276, Page.LeaderEvolution, entry.personId))
                .add(new SvgText(entry.oneToOneQuartiles.n.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.minimum.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.q1.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.median.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.q3.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.maximum.toString(), 112));
        });
        return this._viewHelper.svgHtml(svgPanel);
    }
    LeaderEvolution(leaderSnapshotId, leaderId) {
        var svgPanel = new SvgPanel();
        svgPanel.sub(new SvgElement(true))
            .add(new SvgButton("BACK", 76, Page.LeaderSnapshotOneToOnes, leaderSnapshotId))
            .add(new SvgText(leaderId, 812));
        return this._viewHelper.svgHtml(svgPanel);
    }
}
