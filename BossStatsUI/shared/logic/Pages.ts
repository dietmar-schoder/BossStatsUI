import { DateHelper } from "./DateHelper.js";
import { ViewHelper } from "./ViewHelper.js";
import { LeaderSnapshot, LeaderDataEntry} from "../models/FuehrrStats.js";
import { SvgButton, SvgElement, SvgPanel, SvgQuartile, SvgText } from "./SvgElements.js";

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
            .add(new SvgButton("BACK", 100 - 12, Page.LeaderSnapshots, ""))
            .add(new SvgText(this._dateHelper.toDate(leaderSnapshot.date), 200 - 12 - 4))
            .add(new SvgText("0", 150 - 12))
            .add(new SvgText("1", 150 - 12))
            .add(new SvgText("2", 150 - 12))
            .add(new SvgText("3", 150 - 12))
            .add(new SvgText("4", 150 - 12));
        leaderSnapshot.leaderDataEntries!.forEach(entry => {
            let indent = entry.level * this._viewHelper.getMargin();
            let row = svgPanel.sub(new SvgElement(true));
            if (entry.level > 0) {
                row.add(new SvgText("", indent - this._viewHelper.getMargin()))
            }
            row
                .add(new SvgButton(entry.name, 300 - 12 - indent, Page.LeaderEvolution, entry.personId))
                .add(new SvgQuartile(entry.oneToOneQuartiles, 660));
        });
        return this._viewHelper.svgHtml(svgPanel)
    }

    public LeaderEvolution(leaderSnapshotId: string, leaderDataEntries: LeaderDataEntry[]): string {
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
        return this._viewHelper.svgHtml(svgPanel)
    }
}
