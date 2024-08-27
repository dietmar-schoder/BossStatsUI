import { SvgElement, SvgButton, SvgTextCentered, SvgText, SvgPanel, SvgTreeElementButton, SvgQuartile } from "./Svg.js";
export var Pages;
(function (Pages) {
    Pages[Pages["Start"] = 0] = "Start";
    Pages[Pages["LeaderSnapshotOneToOnes"] = 1] = "LeaderSnapshotOneToOnes";
    Pages[Pages["LeaderEvolution"] = 2] = "LeaderEvolution";
})(Pages || (Pages = {}));
export class Page {
    _configuration;
    _dateHelper;
    _viewHelper;
    constructor(configuration, dateHelper, viewHelper) {
        this._dateHelper = dateHelper;
        this._viewHelper = viewHelper;
        this._configuration = configuration;
    }
    Start() {
        const tableAB = [];
        tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(new SvgTextCentered("fuehrr.com Reports", this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", "FFFFFF")));
        return this._viewHelper.svgHtml(new SvgPanel(this._configuration.screenWidth, this._configuration.lineHeight, this._configuration.isHorizontalMain).add(new SvgElement().addList(tableAB)));
    }
    LeaderSnapshotOneToOnes(companyId, leaderSnapshot, menuSelection, selectedIndex, prevIndex, nextIndex) {
        const formattedDate = this._dateHelper.daysToDdMmmYyyy(leaderSnapshot.daysSince2000);
        const leaderDataEntries = leaderSnapshot.leaderDataEntries;
        const menu1Params = `${companyId};0;${selectedIndex}`;
        const menu2Params = `${companyId};1;${selectedIndex}`;
        const menu3Params = `${companyId};2;${selectedIndex}`;
        const prevPageParams = `${companyId};${menuSelection};${prevIndex}`;
        const nextPageParams = `${companyId};${menuSelection};${nextIndex}`;
        const tableAB = [];
        const menuButtonWidth = this._configuration.columnWidthAB(0.333333);
        const prevNextButtonWidth = this._configuration.columnWidthAB(0.25);
        const menuDateWidth = this._configuration.columnWidthAB(0.5);
        const scaleUnitWidth = this._configuration.columnWidthAB(0.2);
        const canMenu1 = menuSelection != 0;
        const canMenu2 = menuSelection != 1;
        const canMenu3 = menuSelection != 2;
        const canPrev = selectedIndex < leaderDataEntries.length - 1;
        const canNext = selectedIndex > 0;
        tableAB.push(new SvgElement(true).add(new SvgElement(true).add(new SvgButton("1:1s", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canMenu1, Pages.LeaderSnapshotOneToOnes, menu1Params), new SvgButton("Performance", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canMenu2, Pages.LeaderSnapshotOneToOnes, menu2Params), new SvgButton("Engagement", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canMenu3, Pages.LeaderSnapshotOneToOnes, menu3Params))), new SvgElement(this._configuration.isHorizontalAB).add(new SvgElement(true).add(new SvgButton("Prev", prevNextButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canPrev, Pages.LeaderSnapshotOneToOnes, prevPageParams), new SvgTextCentered(formattedDate, menuDateWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", "FFFFFF"), new SvgButton("Next", prevNextButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canNext, Pages.LeaderSnapshotOneToOnes, nextPageParams)), new SvgElement(true).add(new SvgText("0", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"), new SvgText("1", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"), new SvgText("2", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"), new SvgText("3", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"), new SvgText("4", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"))));
        leaderDataEntries.forEach(entry => {
            let indent = entry.level * this._configuration.lineHeight;
            let params = `${menuSelection};${entry.personId}`;
            tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(new SvgTreeElementButton(entry.name, this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "646464", Pages.LeaderEvolution, params, indent), new SvgQuartile(this._configuration.lineHeight, this._configuration.widthAB + this._configuration.margin, entry.oneToOneQuartiles)));
        });
        return this._viewHelper.svgHtml(new SvgPanel(this._configuration.screenWidth, this._configuration.lineHeight, this._configuration.isHorizontalMain).add(new SvgElement().addList(tableAB)));
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
    LeaderEvolution(companyId, menuSelection, snapshotSelection, personId, leaderDataEntries) {
        const tableAB = [];
        const menuButtonWidth = this._configuration.columnWidthAB(0.333333);
        const backButtonWidth = this._configuration.columnWidthAB(0.25);
        const nameWidth = this._configuration.columnWidthAB(0.75);
        const scaleUnitWidth = this._configuration.columnWidthAB(0.2);
        const leaderName = leaderDataEntries[0].name;
        const backParams = `${companyId};${menuSelection};${snapshotSelection}`;
        const menu1Params = `0;${personId}`;
        const menu2Params = `1;${personId}`;
        const menu3Params = `2;${personId}`;
        const canMenu1 = menuSelection != 0;
        const canMenu2 = menuSelection != 1;
        const canMenu3 = menuSelection != 2;
        tableAB.push(new SvgElement(true).add(new SvgElement(true).add(new SvgButton("1:1s", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canMenu1, Pages.LeaderEvolution, menu1Params), new SvgButton("Performance", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canMenu2, Pages.LeaderEvolution, menu2Params), new SvgButton("Engagement", menuButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", canMenu3, Pages.LeaderEvolution, menu3Params))), new SvgElement(this._configuration.isHorizontalAB).add(new SvgElement(true).add(new SvgButton("Back", backButtonWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", true, Pages.LeaderSnapshotOneToOnes, backParams), new SvgTextCentered(leaderName, nameWidth, this._configuration.lineHeight, this._configuration.fontSize, "784ABA", "FFFFFF")), new SvgElement(true).add(new SvgText("0", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"), new SvgText("1", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"), new SvgText("2", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"), new SvgText("3", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"), new SvgText("4", scaleUnitWidth, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"))));
        leaderDataEntries.forEach(entry => {
            tableAB.push(new SvgElement(this._configuration.isHorizontalAB).add(new SvgText(this._dateHelper.daysToDdMmmYyyy(entry.daysSince2000), this._configuration.widthAB, this._configuration.lineHeight, this._configuration.fontSize, "000000", "FFFFFF"), new SvgQuartile(this._configuration.lineHeight, this._configuration.widthAB + this._configuration.margin, entry.oneToOneQuartiles)));
        });
        return this._viewHelper.svgHtml(new SvgPanel(this._configuration.screenWidth, this._configuration.lineHeight, this._configuration.isHorizontalMain).add(new SvgElement().addList(tableAB)));
    }
}
