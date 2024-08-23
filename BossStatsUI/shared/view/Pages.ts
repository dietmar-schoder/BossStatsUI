import { Configuration } from "../helpers/Configuration.js";
import { DateHelper } from "../helpers/DateHelper.js";
import { LeaderSnapshot, LeaderDataEntry } from "../models/FuehrrStats.js";
import { SvgElement, SvgButton, SvgTextCentered, SvgText, SvgPanel } from "./SvgElements.js";
import { ViewHelper } from "./UICalculator.js";

export enum Page {
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

    public LeaderSnapshotOneToOnes(companyId: string, leaderSnapshots: LeaderSnapshot[], selectedLeaderSnapshotIndex: number): string {
        const selectedLeaderSnapshot: LeaderSnapshot = leaderSnapshots[selectedLeaderSnapshotIndex];
        const leaderDataEntries: LeaderDataEntry[] = leaderSnapshots[selectedLeaderSnapshotIndex].leaderDataEntries;
        const tableAB: SvgElement[] = [];
        const tableC: SvgElement[] = [];
        const menuButtonWidth: number = Math.round((this._configuration.widthAB + this._configuration.margin) * 0.25) - this._configuration.margin;
        const menuDateWidth: number = Math.round((this._configuration.widthAB + this._configuration.margin) * 0.5) - this._configuration.margin;

        const dataEntriesC: string[] = ["Area C Line 1", "Area C Line 2", "Area C Line 3", "Area C Line 4"];

        const formattedDate = this._dateHelper.daysToDdMmmYyyy(selectedLeaderSnapshot.daysSince2000);
        const prevIndex = selectedLeaderSnapshotIndex + (selectedLeaderSnapshotIndex < leaderSnapshots.length - 1 ? 1 : 0);
        const nextIndex = selectedLeaderSnapshotIndex - (selectedLeaderSnapshotIndex > 0 ? 1 : 0);
        const prevActionParams = `${companyId};${prevIndex}`;
        const nextActionParams = `${companyId};${nextIndex}`;

        tableAB.push(new SvgElement(true).add(
            new SvgButton("Prev", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", Page.LeaderSnapshotOneToOnes, prevActionParams),
            new SvgTextCentered(formattedDate, menuDateWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", "FFFFFF"),
            new SvgButton("Next", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", Page.LeaderSnapshotOneToOnes, nextActionParams)));

        leaderDataEntries.forEach(entry => {
            tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(
                new SvgText(entry.name, this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "FAC100", "3D7A6E"),
                new SvgText(entry.level.toString(), this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "3D7A6E", "FAC100")))
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

    //public LeaderSnapshots(width: number, leaderSnapshots: LeaderSnapshot[]): string {
    //    var svgPanel = new SvgPanel();
    //    leaderSnapshots.forEach(entry => {
    //        svgPanel.add(new SvgButton2(this._dateHelper.toDate(entry.date), width, Page.LeaderSnapshotOneToOnes, entry.id ?? ""));
    //    });
    //    return this._viewHelper.svgHtml(svgPanel)
    //}

    //public LeaderSnapshotOneToOnes(width: number, leaderSnapshot: LeaderSnapshot): string {
    //    var svgPanel = new SvgPanel();
    //    svgPanel.sub(new SvgElement(true))
    //        .add(new SvgButton2("BACK", 100 - 12, Page.LeaderSnapshots, ""))
    //        .add(new SvgText(this._dateHelper.toDate(leaderSnapshot.date), 200 - 12 - 4))
    //        .add(new SvgText("0", 150 - 12))
    //        .add(new SvgText("1", 150 - 12))
    //        .add(new SvgText("2", 150 - 12))
    //        .add(new SvgText("3", 150 - 12))
    //        .add(new SvgText("4", 150 - 12));
    //    leaderSnapshot.leaderDataEntries!.forEach(entry => {
    //        let indent = entry.level * this._viewHelper.getMargin();
    //        let row = svgPanel.sub(new SvgElement(true));
    //        if (entry.level > 0) {
    //            row.add(new SvgText("", indent - this._viewHelper.getMargin()))
    //        }
    //        row
    //            .add(new SvgButton2(entry.name, 300 - 12 - indent, Page.LeaderEvolution, entry.personId))
    //            .add(new SvgQuartile(entry.oneToOneQuartiles, 660));
    //    });
    //    return this._viewHelper.svgHtml(svgPanel)
    //}

//    public LeaderEvolution(width: number, leaderSnapshotId: string, leaderDataEntries: LeaderDataEntry[]): string {
//        var leaderName = leaderDataEntries[0].name;
//        var svgPanel = new SvgPanel();
//        svgPanel.sub(new SvgElement(true))
//            .add(new SvgButton2("BACK", 100 - 12, Page.LeaderSnapshotOneToOnes, leaderSnapshotId))
//            .add(new SvgText(leaderName, 200 - 12 - 4))
//            .add(new SvgText("0", 150 - 12))
//            .add(new SvgText("1", 150 - 12))
//            .add(new SvgText("2", 150 - 12))
//            .add(new SvgText("3", 150 - 12))
//            .add(new SvgText("4", 150 - 12));
//        leaderDataEntries.forEach(entry => {
//            svgPanel.sub(new SvgElement(true))
//                .add(new SvgText(this._dateHelper.toDate(entry.date), 300 - 12))
//                .add(new SvgQuartile(entry.oneToOneQuartiles, 660));
//        });
//        return this._viewHelper.svgHtml(svgPanel)
//    }
}
