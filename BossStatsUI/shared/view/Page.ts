import { Configuration } from "../helpers/Configuration.js";
import { DateHelper } from "../helpers/DateHelper.js";
import { LeaderSnapshot, LeaderDataEntry } from "../models/FuehrrStats.js";
import { SvgElement, SvgButton, SvgTextCentered, SvgText, SvgPanel, SvgTreeElementButton, SvgQuartile } from "./Svg.js";
import { ViewHelper } from "./UICalculator.js";

export enum Pages {
    Start,
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

    public Start(): string {
        const tableAB: SvgElement[] = [];

        tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(
            new SvgTextCentered("fuehrr.com Reports", this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", "FFFFFF")));

        return this._viewHelper.svgHtml(
            new SvgPanel(this._configuration.screenWidth, this._configuration.lineHeight, this._configuration.isHorizontalMain).add(
                new SvgElement().addList(tableAB))
        );
    }


    public LeaderSnapshotOneToOnes(companyId: string, leaderSnapshot: LeaderSnapshot, selectedIndex: number, prevIndex: number, nextIndex: number): string {
        const formattedDate = this._dateHelper.daysToDdMmmYyyy(leaderSnapshot.daysSince2000);
        const leaderDataEntries = leaderSnapshot.leaderDataEntries;
        const prevPageParams = `${companyId};${prevIndex}`;
        const nextPageParams = `${companyId};${nextIndex}`;
        const tableAB: SvgElement[] = [];
        const menuButtonWidth = this._configuration.columnWidthAB(0.25);
        const menuDateWidth = this._configuration.columnWidthAB(0.5);
        const scaleUnitWidth = this._configuration.columnWidthAB(0.2);
        const canPrev = selectedIndex < leaderDataEntries.length - 1;
        const canNext = selectedIndex > 0;

        tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(
            new SvgElement(true).add(
                new SvgButton("Prev", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canPrev, Pages.LeaderSnapshotOneToOnes, prevPageParams),
                new SvgTextCentered(formattedDate, menuDateWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", "FFFFFF"),
                new SvgButton("Next", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canNext, Pages.LeaderSnapshotOneToOnes, nextPageParams)
            ),
            new SvgElement(true).add(
                new SvgText("0", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"),
                new SvgText("1", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"),
                new SvgText("2", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"),
                new SvgText("3", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"),
                new SvgText("4", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"))
        )
        );

        leaderDataEntries.forEach(entry => {
            let indent = entry.level * this._configuration.lineHeight;
            tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(
                new SvgTreeElementButton(entry.name, this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "646464", Pages.LeaderEvolution, entry.personId,
                    indent),
                new SvgQuartile(this._configuration.lineHeight, this._configuration.widthAB + this._configuration.margin, entry.oneToOneQuartiles)))
        });

        return this._viewHelper.svgHtml(
            new SvgPanel(this._configuration.screenWidth, this._configuration.lineHeight, this._configuration.isHorizontalMain).add(
                new SvgElement().addList(tableAB))
        );

        // TEST areas A, B, C
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
        const scaleUnitWidth = this._configuration.columnWidthAB(0.2);
        const leaderName = leaderDataEntries[0].name;

        tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(
            new SvgElement(true).add(
                new SvgButton("Back", backButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", true, Pages.LeaderSnapshotOneToOnes, backParams),
                new SvgTextCentered(leaderName, nameWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", "FFFFFF")
            ),
            new SvgElement(true).add(
                new SvgText("0", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"),
                new SvgText("1", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"),
                new SvgText("2", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"),
                new SvgText("3", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"),
                new SvgText("4", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"))
            )
        );

        leaderDataEntries.forEach(entry => {
            tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(
                new SvgText(this._dateHelper.daysToDdMmmYyyy(entry.daysSince2000), this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"),
                new SvgQuartile(this._configuration.lineHeight, this._configuration.widthAB + this._configuration.margin, entry.oneToOneQuartiles)))
        });

        return this._viewHelper.svgHtml(
            new SvgPanel(this._configuration.screenWidth, this._configuration.lineHeight, this._configuration.isHorizontalMain).add(
                new SvgElement().addList(tableAB))
        );
    }
}
