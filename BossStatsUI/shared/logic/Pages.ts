import { DateHelper } from "./DateHelper.js";
import { ViewHelper } from "./ViewHelper.js";
import { LeaderSnapshot, LeaderDataEntry} from "../models/FuehrrStats.js";
import { SvgButton, SvgButton2, SvgElement, SvgPanel, SvgQuartile, SvgText, SvgTextCentered } from "./SvgElements.js";
import { Configuration } from "./Configuration.js";

export enum Page {
    Test,
    LeaderSnapshots,
    LeaderSnapshotOneToOnes,
    LeaderEvolution
}

export class Pages {
    private _configuration: Configuration;
    private _dateHelper: DateHelper;
    private _viewHelper: ViewHelper;

    constructor(configuration: Configuration, dateHelper: DateHelper, viewHelper: ViewHelper) {
        this._dateHelper = dateHelper;
        this._viewHelper = viewHelper;
        this._configuration = configuration;
    }

    public Test(): string {
        const dataEntriesAB: string[] = ["Line 1 (A)|Details 1 (B)", "Line 2 (A)|Details 2 (B)", "Line 3 (A)|Details 3 (B)"];
        const dataEntriesC: string[] = ["Area C Line 1", "Area C Line 2", "Area C Line 3", "Area C Line 4"];
        const tableAB: SvgElement[] = [];
        const tableC: SvgElement[] = [];
        const menuButtonWidth: number = Math.round((this._configuration.widthAB + this._configuration.margin) * 0.25) - this._configuration.margin;
        const menuDateWidth: number = Math.round((this._configuration.widthAB + this._configuration.margin) * 0.5) - this._configuration.margin;

        const now = new Date();
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-GB', options);

        tableAB.push(new SvgElement(true).add(
            new SvgButton("Prev", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", 0, ""),
            new SvgTextCentered(formattedDate, menuDateWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", "FFFFFF"),
            new SvgButton("Next", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", 0, "")));

        dataEntriesAB.forEach(entry => {
            let entryFields: string[] = entry.split('|');
            tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(
                new SvgText(entryFields[0], this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "FAC100", "3D7A6E"),
                new SvgText(entryFields[1], this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "3D7A6E", "FAC100")))
        });

        dataEntriesC.forEach(entry => {
            tableC.push(new SvgElement(this._configuration.isHorizontalAB).add(
                new SvgText(entry, this._configuration.widthC, this._configuration.lineHeight, this._configuration.fontSize, "FAC100", "773D7A")))
        });

        return this._viewHelper.svgHtml(
            new SvgPanel(this._configuration.isHorizontalMain).add(
                new SvgElement().addList(tableAB),
                new SvgElement().addList(tableC))
        );
    }

    public LeaderSnapshots(width: number, leaderSnapshots: LeaderSnapshot[]): string {
        var svgPanel = new SvgPanel();
        leaderSnapshots.forEach(entry => {
            svgPanel.add(new SvgButton2(this._dateHelper.toDate(entry.date), width, Page.LeaderSnapshotOneToOnes, entry.id ?? ""));
        });
        return this._viewHelper.svgHtml(svgPanel)
    }

    public LeaderSnapshotOneToOnes(width: number, leaderSnapshot: LeaderSnapshot): string {
        var svgPanel = new SvgPanel();
        svgPanel.sub(new SvgElement(true))
            .add(new SvgButton2("BACK", 100 - 12, Page.LeaderSnapshots, ""))
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
                .add(new SvgButton2(entry.name, 300 - 12 - indent, Page.LeaderEvolution, entry.personId))
                .add(new SvgQuartile(entry.oneToOneQuartiles, 660));
        });
        return this._viewHelper.svgHtml(svgPanel)
    }

    public LeaderEvolution(width: number, leaderSnapshotId: string, leaderDataEntries: LeaderDataEntry[]): string {
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
        return this._viewHelper.svgHtml(svgPanel)
    }
}
