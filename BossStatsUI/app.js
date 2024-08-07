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
var _width = 1920;
var _actionWithId;
const id = new URLSearchParams(window.location.search).get('id') ?? "";
document.addEventListener("DOMContentLoaded", async function () {
    _width = document.documentElement.clientWidth;
    document.body.innerHTML = await _loadPage.getHtml(Page.LeaderSnapshots, _width, id);
});
document.addEventListener("click", async function (event) {
    if (event == null || event.target == null) {
        return;
    }
    let element = event.target;
    if (element == null) {
        return;
    }
    _actionWithId = element.id.split("|");
    document.body.innerHTML = await _loadPage.getHtml(Number(_actionWithId[0]), _width, _actionWithId[1]);
});
//window.addEventListener("resize", async function () {
//    _width = document.documentElement.clientWidth;
//    document.body.innerHTML = await _loadPage.getHtml(Number(_actionWithId[0]), _width, _actionWithId[1]);
//});
