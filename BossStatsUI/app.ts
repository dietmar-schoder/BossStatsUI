//concurrently "http-server -a localhost -p 8080"

import { DateHelper } from "./shared/logic/DateHelper.js";
import { ViewHelper } from "./shared/logic/ViewHelper.js";
import { Page, Pages } from "./shared/logic/Pages.js";
import { FuehrrStatsServer } from "./shared/logic/FuehrrStatsServer.js";
import { LoadPage } from "./shared/logic/LoadPage.js";
import { Configuration } from "./shared/logic/Configuration.js";

var _configuration = new Configuration();
var _dateHelper = new DateHelper();
var _server = new FuehrrStatsServer(_dateHelper);
var _viewHelper = new ViewHelper(_configuration);
var _pages = new Pages(_configuration, _dateHelper, _viewHelper);
var _loadPage = new LoadPage(_server, _pages);
var _actionWithId: string[];

const id = new URLSearchParams(window.location.search).get('id') ?? "";

document.addEventListener("DOMContentLoaded", async function () {
    console.time('_loadPage.getHtml');
    _configuration.setWidth(document.documentElement.clientWidth);
    document.body.innerHTML = await _loadPage.getHtml(Page.Test, 0, "");
    console.timeEnd('_loadPage.getHtml');
});

//document.addEventListener("click", async function (event: Event) {
//    if (event == null || event.target == null) { return; }
//    let element = event.target as Element;
//    if (element == null) { return; }
//    _actionWithId = element.id.split("|");
//    var loadingIndicator = document.getElementById("wait");
//    if (loadingIndicator != null) {
//        loadingIndicator.style.display = "block";
//    }
//    document.body.innerHTML = await _loadPage.getHtml(Number(_actionWithId[0]), _width, _actionWithId[1]);
//});

var resizeTimeout: number | undefined;

window.addEventListener('resize', async function () {
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }

    resizeTimeout = window.setTimeout(async function () {
        console.time('_loadPage.getHtml');
        _configuration.setWidth(document.documentElement.clientWidth);
        document.body.innerHTML = await _loadPage.getHtml(Page.Test, 0, "");
        console.timeEnd('_loadPage.getHtml');
//        document.body.innerHTML = _configuration.valuesToString();
    }, 10);
});
