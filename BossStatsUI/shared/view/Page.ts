import { Configuration } from "../helpers/Configuration.js";
import { DateHelper } from "../helpers/DateHelper.js";
import { LeaderSnapshot, LeaderDataEntry } from "../models/FuehrrStats.js";
import { SvgElement, SvgButton, SvgTextCentered, SvgText, SvgPanel } from "./Svg.js";
import { ViewHelper } from "./UICalculator.js";

export enum Pages {
    LeaderSnapshotOneToOnes,
    LeaderEvolution
}

export class Page {
    private _configuration: Configuration;
    private _dateHelper: DateHelper;
    private _viewHelper: ViewHelper;

    constructor(configuration: Configuration, dateHelper: DateHelper, viewHelper: ViewHelper) {
        this._dateHelper = dateHelper;
        this._viewHelper = viewHelper;
        this._configuration = configuration;
    }

    public LeaderSnapshotOneToOnes(companyId: string, leaderSnapshot: LeaderSnapshot, prevIndex: number, nextIndex: number): string {
        const formattedDate = this._dateHelper.daysToDdMmmYyyy(leaderSnapshot.daysSince2000);
        const leaderDataEntries = leaderSnapshot.leaderDataEntries;
        const prevPageParams = `${companyId};${prevIndex}`;
        const nextPageParams = `${companyId};${nextIndex}`;
        const tableAB: SvgElement[] = [];
        const menuButtonWidth = this._configuration.columnWidthAB(0.25);
        const menuDateWidth = this._configuration.columnWidthAB(0.5);

        tableAB.push(new SvgElement(true).add(
            new SvgButton("Prev", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", Pages.LeaderSnapshotOneToOnes, prevPageParams),
            new SvgTextCentered(formattedDate, menuDateWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", "FFFFFF"),
            new SvgButton("Next", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", Pages.LeaderSnapshotOneToOnes, nextPageParams)));

        leaderDataEntries.forEach(entry => {
            tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(
                new SvgButton(entry.name, this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "777777", Pages.LeaderEvolution, entry.personId),
                new SvgText(entry.level.toString(), this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "3D7A6E", "FAC100")))
            });

        return this._viewHelper.svgHtml(
            new SvgPanel(this._configuration.screenWidth, this._configuration.isHorizontalMain).add(
                new SvgElement().addList(tableAB))
        );

        //const tableC: SvgElement[] = []; // area C
        //const dataEntriesC: string[] = ["Area C Line 1", "Area C Line 2", "Area C Line 3", "Area C Line 4"]; // area C
        //dataEntriesC.forEach(entry => { // area C
        //    tableC.push(new SvgElement(this._configuration.isHorizontalAB).add( // area C
        //        new SvgText(entry, this._configuration.widthC, this._configuration.lineHeight, this._configuration.fontSize, "FAC100", "773D7A"))) // area C
        //}); // area C

        //return this._viewHelper.svgHtml(
        //    new SvgPanel(this._configuration.screenWidth, this._configuration.isHorizontalMain).add(
        //        new SvgElement().addList(tableAB),
        //        new SvgElement().addList(tableC)) // area C
        //);
    }

    public LeaderEvolution(backParams: string, leaderDataEntries: LeaderDataEntry[]): string {
        const tableAB: SvgElement[] = [];
        const backButtonWidth = this._configuration.columnWidthAB(0.25);
        const nameWidth = this._configuration.columnWidthAB(0.75);
        const leaderName = leaderDataEntries[0].name; // ? what if there is no first entry?

        tableAB.push(new SvgElement(true).add(
            new SvgButton("Back", backButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", Pages.LeaderSnapshotOneToOnes, backParams),
            new SvgTextCentered(leaderName, nameWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", "FFFFFF")));

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

        return this._viewHelper.svgHtml(
            new SvgPanel(this._configuration.screenWidth, this._configuration.isHorizontalMain).add(
                new SvgElement().addList(tableAB))
        );
    }
}
