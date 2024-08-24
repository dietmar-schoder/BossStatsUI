//concurrently "http-server -a localhost -p 8080"

import { Configuration } from "./shared/helpers/Configuration.js";
import { DateHelper } from "./shared/helpers/DateHelper.js";
import { FuehrrStatsServer } from "./shared/logic/FuehrrStatsServer.js";
import { Manager } from "./shared/logic/Manager.js";
import { Page, Pages } from "./shared/view/Page.js";
import { ViewHelper } from "./shared/view/UICalculator.js";

const _configuration = new Configuration(document);
const _dateHelper = new DateHelper();
const _server = new FuehrrStatsServer(document, _dateHelper);
const _viewHelper = new ViewHelper(_configuration);
const _pages = new Page(_configuration, _dateHelper, _viewHelper);
const _manager = new Manager(_server, _pages);
const _companyId = new URLSearchParams(window.location.search).get('id') ?? "";
var _pageWithParams: string = `${Pages.LeaderSnapshotOneToOnes}|${_companyId};0`; // page number | company id ; selected snapshot index
var _resizeTimeout: number | undefined;

document.addEventListener("DOMContentLoaded", async function () {
    await setWidthAndGetHtml();
});

document.addEventListener("click", async function (event: Event) {
    if (event == null || event.target == null) { return; }
    let element = event.target as Element;
    if (element == null) { return; }

    _pageWithParams = element.id;
    await getHtml();
});


window.addEventListener('resize', async function () {
    if (_resizeTimeout) { clearTimeout(_resizeTimeout); }
    _resizeTimeout = window.setTimeout(async function () { await setWidthAndGetHtml(); }, 10);
});

async function setWidthAndGetHtml() {
    _configuration.setWidth();
    console.log(_configuration.valuesToString());
    await getHtml();
}

async function getHtml() {
    console.time('_loadPage.getHtml');
    document.body.innerHTML = await _manager.getHtml(_pageWithParams.split("|"));
    console.timeEnd('_loadPage.getHtml');
}
