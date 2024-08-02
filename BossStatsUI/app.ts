interface OneToOne {
    id: string
    daysSince2000: number
    personId: string
}

function getOneToOnes(): Promise<OneToOne[]> {
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
    const request: RequestInfo = new Request('https://www.fuehrr.com/api/companies/6884F73E-E237-4D80-A8B8-FB5FF9304F09/1to1s', {
        method: 'GET',
        headers: headers
    })

    return fetch(request)
        .then(res => res.json())
        .then(res => { return res as OneToOne[]; })
}

async function loadPage() {
    var oneToOnes: OneToOne[] = await getOneToOnes();
    document.getElementById("body")!.innerHTML = "<p>" + oneToOnes[0].id + "</p><p>" + oneToOnes[1].id + "</p>";
}
