//concurrently "http-server -a localhost -p 8080"
import { DateHelper } from "./shared/logic/DateHelper.js";
import { ViewHelper } from "./shared/logic/ViewHelper.js";
import { Page, Pages } from "./shared/logic/Pages.js";
import { FuehrrStatsServer } from "./shared/logic/FuehrrStatsServer.js";
import { LoadPage } from "./shared/logic/LoadPage.js";
var _dateHelper = new DateHelper();
var _server = new FuehrrStatsServer(_dateHelper);
var _viewHelper = new ViewHelper();
var _pages = new Pages(_dateHelper, _viewHelper);
var _loadPage = new LoadPage(_server, _pages);
document.addEventListener("DOMContentLoaded", async function () {
    document.body.innerHTML = await _loadPage.getHtml(Page.LeaderSnapshots, "");
});
document.addEventListener("click", async function (event) {
    if (event == null || event.target == null) {
        return;
    }
    let element = event.target;
    if (element == null) {
        return;
    }
    var actionWithId = element.id.split("|");
    document.body.innerHTML = await _loadPage.getHtml(Number(actionWithId[0]), actionWithId[1]);
});
