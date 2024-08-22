//concurrently "http-server -a localhost -p 8080"
import { DateHelper } from "./shared/logic/DateHelper.js";
import { ViewHelper } from "./shared/logic/ViewHelper.js";
import { Page, Pages } from "./shared/logic/Pages.js";
import { FuehrrStatsServer } from "./shared/logic/FuehrrStatsServer.js";
import { LoadPage } from "./shared/logic/LoadPage.js";
import { Configuration } from "./shared/logic/Configuration.js";
const _configuration = new Configuration();
const _dateHelper = new DateHelper();
const _server = new FuehrrStatsServer(_dateHelper);
const _viewHelper = new ViewHelper(_configuration);
const _pages = new Pages(_configuration, _dateHelper, _viewHelper);
const _loadPage = new LoadPage(_server, _pages);
const id = new URLSearchParams(window.location.search).get('id') ?? "";
var _actionWithParams = `${Page.LeaderSnapshotOneToOnes}|${id};0`;
document.addEventListener("DOMContentLoaded", async function () {
    console.time('_loadPage.getHtml');
    _configuration.setWidth(document.documentElement.clientWidth);
    // console.log(_configuration.valuesToString());
    document.body.innerHTML = await _loadPage.getHtml(_actionWithParams);
    console.timeEnd('_loadPage.getHtml');
});
document.addEventListener("click", async function (event) {
    if (event == null || event.target == null) {
        return;
    }
    let element = event.target;
    if (element == null) {
        return;
    }
    var loadingIndicator = document.getElementById("wait");
    if (loadingIndicator != null) {
        loadingIndicator.style.display = "block";
    }
    _actionWithParams = element.id;
    document.body.innerHTML = await _loadPage.getHtml(_actionWithParams);
});
var resizeTimeout;
window.addEventListener('resize', async function () {
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = window.setTimeout(async function () {
        console.time('_loadPage.getHtml');
        _configuration.setWidth(document.documentElement.clientWidth);
        // console.log(_configuration.valuesToString());
        document.body.innerHTML = await _loadPage.getHtml(_actionWithParams);
        console.timeEnd('_loadPage.getHtml');
    }, 10);
});
