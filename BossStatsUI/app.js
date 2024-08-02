"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getOneToOnes() {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    const request = new Request('https://www.fuehrr.com/api/companies/6884F73E-E237-4D80-A8B8-FB5FF9304F09/1to1s', {
        method: 'GET',
        headers: headers
    });
    return fetch(request)
        .then(res => res.json())
        .then(res => { return res; });
}
function loadPage() {
    return __awaiter(this, void 0, void 0, function* () {
        var oneToOnes = yield getOneToOnes();
        document.getElementById("body").innerHTML = "<p>" + oneToOnes[0].id + "</p><p>" + oneToOnes[1].id + "</p>";
    });
}
//# sourceMappingURL=app.js.map