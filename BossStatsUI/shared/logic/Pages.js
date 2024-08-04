import { SvgButton, SvgElement, SvgPanel, SvgText } from "./SvgElements.js";
export var Page;
(function (Page) {
    Page[Page["LeaderSnapshots"] = 0] = "LeaderSnapshots";
    Page[Page["LeaderSnapshotOneToOnes"] = 1] = "LeaderSnapshotOneToOnes";
    Page[Page["LeaderEvolution"] = 2] = "LeaderEvolution";
})(Page || (Page = {}));
export class Pages {
    LeaderSnapshots(viewHelper, leaderSnapshots) {
        var svgPanel = new SvgPanel();
        leaderSnapshots.forEach(entry => {
            svgPanel.add(new SvgButton(entry.daysSince2000?.toString() ?? "", 912, Page.LeaderSnapshotOneToOnes, entry.id ?? ""));
        });
        return viewHelper.svgHtml(svgPanel);
    }
    LeaderSnapshotOneToOnes(viewHelper, leaderSnapshot) {
        var svgPanel = new SvgPanel();
        svgPanel.sub(new SvgElement(true))
            .add(new SvgButton("BACK", 76, Page.LeaderSnapshots, ""))
            .add(new SvgText(leaderSnapshot.daysSince2000.toString(), 812));
        leaderSnapshot.leaderDataEntries.forEach(entry => {
            svgPanel.sub(new SvgElement(true))
                .add(new SvgButton(entry.name, 276, Page.LeaderEvolution, entry.personId))
                .add(new SvgText(entry.oneToOneQuartiles.n.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.minimum.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.q1.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.median.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.q3.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.maximum.toString(), 112));
        });
        return viewHelper.svgHtml(svgPanel);
    }
    LeaderEvolution(viewHelper, leaderSnapshotId, leaderId) {
        var svgPanel = new SvgPanel();
        svgPanel.sub(new SvgElement(true))
            .add(new SvgButton("BACK", 76, Page.LeaderSnapshotOneToOnes, leaderSnapshotId))
            .add(new SvgText(leaderId, 812));
        return viewHelper.svgHtml(svgPanel);
    }
}
