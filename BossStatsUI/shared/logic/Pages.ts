import { LeaderSnapshot } from "../models/FuehrrStatsDb.js";
import { SvgButton, SvgElement, SvgPanel, SvgText } from "./SvgElements.js";
import { ViewHelper } from "./ViewHelper.js";

export enum Page {
    LeaderSnapshots,
    LeaderSnapshotOneToOnes,
    LeaderEvolution
}

export class Pages {
    private _viewHelper: ViewHelper;

    constructor(viewHelper: ViewHelper) {
        this._viewHelper = viewHelper;
    }

    public LeaderSnapshots(leaderSnapshots: LeaderSnapshot[]): string {
        var svgPanel = new SvgPanel();
        leaderSnapshots.forEach(entry => {
            svgPanel.add(new SvgButton(entry.daysSince2000?.toString() ?? "", 912, Page.LeaderSnapshotOneToOnes, entry.id ?? ""));
        });
        return this._viewHelper.svgHtml(svgPanel)
    }

    public LeaderSnapshotOneToOnes(leaderSnapshot: LeaderSnapshot): string {
        var svgPanel = new SvgPanel();
        svgPanel.sub(new SvgElement(true))
            .add(new SvgButton("BACK", 76, Page.LeaderSnapshots, ""))
            .add(new SvgText(leaderSnapshot.daysSince2000!.toString(), 812));
        leaderSnapshot.leaderDataEntries!.forEach(entry => {
            svgPanel.sub(new SvgElement(true))
                .add(new SvgButton(entry.name, 276, Page.LeaderEvolution, entry.personId))
                .add(new SvgText(entry.oneToOneQuartiles.n.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.minimum.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.q1.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.median.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.q3.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.maximum.toString(), 112));
        });
        return this._viewHelper.svgHtml(svgPanel)
    }

    public LeaderEvolution(leaderSnapshotId: string, leaderId: string): string {
        var svgPanel = new SvgPanel();
        svgPanel.sub(new SvgElement(true))
            .add(new SvgButton("BACK", 76, Page.LeaderSnapshotOneToOnes, leaderSnapshotId))
            .add(new SvgText(leaderId, 812));
        return this._viewHelper.svgHtml(svgPanel)
    }
}
