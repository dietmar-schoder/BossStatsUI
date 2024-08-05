import { DateHelper } from "./DateHelper.js";
import { ViewHelper } from "./ViewHelper.js";
import { LeaderSnapshot, LeaderDataEntry} from "../models/FuehrrStats.js";
import { SvgButton, SvgElement, SvgPanel, SvgText } from "./SvgElements.js";

export enum Page {
    LeaderSnapshots,
    LeaderSnapshotOneToOnes,
    LeaderEvolution
}

export class Pages {
    private _dateHelper: DateHelper;
    private _viewHelper: ViewHelper;

    constructor(dateHelper: DateHelper, viewHelper: ViewHelper) {
        this._dateHelper = dateHelper;
        this._viewHelper = viewHelper;
    }

    // Create Pages/SVG/HTML

    public LeaderSnapshots(leaderSnapshots: LeaderSnapshot[]): string {
        var svgPanel = new SvgPanel();
        leaderSnapshots.forEach(entry => {
            svgPanel.add(new SvgButton(this._dateHelper.toDate(entry.date), 912, Page.LeaderSnapshotOneToOnes, entry.id ?? ""));
        });
        return this._viewHelper.svgHtml(svgPanel)
    }

    public LeaderSnapshotOneToOnes(leaderSnapshot: LeaderSnapshot): string {
        var svgPanel = new SvgPanel();
        svgPanel.sub(new SvgElement(true))
            .add(new SvgButton("BACK", 76, Page.LeaderSnapshots, ""))
            .add(new SvgText(this._dateHelper.toDate(leaderSnapshot.date), 812));
        leaderSnapshot.leaderDataEntries!.forEach(entry => {
            let indent = entry.level * this._viewHelper.getMargin();
            let row = svgPanel.sub(new SvgElement(true));
            if (entry.level > 0) {
                row.add(new SvgText("", indent - this._viewHelper.getMargin()))
            }
            row
                .add(new SvgButton(entry.name, 276 - indent, Page.LeaderEvolution, entry.personId))
                .add(new SvgText(entry.oneToOneQuartiles.n.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.minimum.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.q1.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.median.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.q3.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.maximum.toString(), 112));
        });
        return this._viewHelper.svgHtml(svgPanel)
    }

    public LeaderEvolution(leaderSnapshotId: string, leaderDataEntries: LeaderDataEntry[]): string {
        var leaderName = leaderDataEntries[0].name;
        var svgPanel = new SvgPanel();
        svgPanel.sub(new SvgElement(true))
            .add(new SvgButton("BACK", 76, Page.LeaderSnapshotOneToOnes, leaderSnapshotId))
            .add(new SvgText(leaderName, 812));
        leaderDataEntries.forEach(entry => {
            svgPanel.sub(new SvgElement(true))
                .add(new SvgText(this._dateHelper.toDate(entry.date), 176))
                .add(new SvgText(entry.oneToOneQuartiles.n.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.minimum.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.q1.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.median.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.q3.toString(), 76))
                .add(new SvgText(entry.oneToOneQuartiles.maximum.toString(), 212));
        });
        return this._viewHelper.svgHtml(svgPanel)
    }
}
