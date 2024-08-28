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

    public LeaderSnapshotOneToOnes(companyId: string, leaderSnapshot: LeaderSnapshot, menuSelection: number, selectedIndex: number, prevIndex: number, nextIndex: number): string {
        const formattedDate = this._dateHelper.daysToDdMmmYyyy(leaderSnapshot.daysSince2000);
        const leaderDataEntries = leaderSnapshot.leaderDataEntries;
        const menu1Params = `${companyId};0;${selectedIndex}`;
        const menu2Params = `${companyId};1;${selectedIndex}`;
        const menu3Params = `${companyId};2;${selectedIndex}`;
        const prevPageParams = `${companyId};${menuSelection};${prevIndex}`;
        const nextPageParams = `${companyId};${menuSelection};${nextIndex}`;
        const tableAB: SvgElement[] = [];
        const menuButtonWidth = this._configuration.columnWidthAB(0.333333);
        const prevNextButtonWidth = this._configuration.columnWidthAB(0.25);
        const menuDateWidth = this._configuration.columnWidthAB(0.5);
        const canMenu1 = menuSelection != 0;
        const canMenu2 = menuSelection != 1;
        const canMenu3 = menuSelection != 2;
        const canPrev = selectedIndex < leaderDataEntries.length - 1;
        const canNext = selectedIndex > 0;

        tableAB.push(
            new SvgElement(true).add(
                new SvgElement(true).add(
                    new SvgButton("1:1s", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canMenu1, Pages.LeaderSnapshotOneToOnes, menu1Params),
                    new SvgButton("Performance", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canMenu2, Pages.LeaderSnapshotOneToOnes, menu2Params),
                    new SvgButton("Engagement", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canMenu3, Pages.LeaderSnapshotOneToOnes, menu3Params)
                )
            ),
            new SvgElement(this._configuration.isHorizontalAB).add(
                new SvgElement(true).add(
                    new SvgButton("Prev", prevNextButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canPrev, Pages.LeaderSnapshotOneToOnes, prevPageParams),
                    new SvgTextCentered(formattedDate, menuDateWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", "FFFFFF"),
                    new SvgButton("Next", prevNextButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canNext, Pages.LeaderSnapshotOneToOnes, nextPageParams)
                ),
                this.quartileScaleSvgElement(menuSelection, this._configuration)
            )
        );

        leaderDataEntries.forEach(entry => {
            let indent = entry.level * this._configuration.lineHeight;
            let params = `${menuSelection};${entry.personId}`;
            let quartiles = menuSelection == 0 ? entry.oneToOneQuartiles : menuSelection == 1 ? entry.performanceQuartiles : entry.engagementQuartiles;

            tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(
                new SvgTreeElementButton(entry.name, this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "646464", Pages.LeaderEvolution, params,
                    indent),
                new SvgQuartile(this._configuration.lineHeight, this._configuration.widthAB + this._configuration.margin, quartiles)))
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

    public LeaderEvolution(companyId: string, menuSelection: number, snapshotSelection: number, personId: string, leaderDataEntries: LeaderDataEntry[]): string {
        const tableAB: SvgElement[] = [];
        const menuButtonWidth = this._configuration.columnWidthAB(0.333333);
        const backButtonWidth = this._configuration.columnWidthAB(0.25);
        const nameWidth = this._configuration.columnWidthAB(0.75);
        const leaderName = leaderDataEntries[0].name;
        const backParams = `${companyId};${menuSelection};${snapshotSelection}`;
        const menu1Params = `0;${personId}`;
        const menu2Params = `1;${personId}`;
        const menu3Params = `2;${personId}`;
        const canMenu1 = menuSelection != 0;
        const canMenu2 = menuSelection != 1;
        const canMenu3 = menuSelection != 2;

        tableAB.push(
            new SvgElement(true).add(
                new SvgElement(true).add(
                    new SvgButton("1:1s", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canMenu1, Pages.LeaderEvolution, menu1Params),
                    new SvgButton("Performance", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canMenu2, Pages.LeaderEvolution, menu2Params),
                    new SvgButton("Engagement", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canMenu3, Pages.LeaderEvolution, menu3Params)
                )
            ),
            new SvgElement(this._configuration.isHorizontalAB).add(
                new SvgElement(true).add(
                    new SvgButton("Back", backButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", true, Pages.LeaderSnapshotOneToOnes, backParams),
                    new SvgTextCentered(leaderName, nameWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", "FFFFFF")
                ),
                this.quartileScaleSvgElement(menuSelection, this._configuration)
            )
        );

        leaderDataEntries.forEach(entry => {
            let quartiles = menuSelection == 0 ? entry.oneToOneQuartiles : menuSelection == 1 ? entry.performanceQuartiles : entry.engagementQuartiles;
            tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(
                new SvgText(this._dateHelper.daysToDdMmmYyyy(entry.daysSince2000), this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"),
                new SvgQuartile(this._configuration.lineHeight, this._configuration.widthAB + this._configuration.margin, quartiles)))
        });

        return this._viewHelper.svgHtml(
            new SvgPanel(this._configuration.screenWidth, this._configuration.lineHeight, this._configuration.isHorizontalMain).add(
                new SvgElement().addList(tableAB))
        );
    }

    private quartileScaleSvgElement(menuSelection: number, configuration: Configuration): SvgElement {
        const from = menuSelection == 1 ? 1 : 0; // 0, 1, 0
        const to = menuSelection == 0 ? 4 : menuSelection == 5 ? 1 : 10; // 4, 5, 10
        const scaleUnitFactor = menuSelection == 2 ? 0.088 : 0.2; // 5, 5, 11
        const scaleUnitWidth = configuration.columnWidthAB(scaleUnitFactor);
        const svgElement = new SvgElement(true);

        for (let i = from; i <= to; i++) {
            svgElement.add(this.quartileScaleSvgText(i, scaleUnitWidth, configuration));
        }

        return svgElement;
    };

    private quartileScaleSvgText(index: number, scaleUnitWidth: number, configuration: Configuration): SvgText {
        return new SvgText(index.toString(), scaleUnitWidth, configuration.lineHeight, configuration.fontSize, "000000", "FFFFFF");
    }
}
