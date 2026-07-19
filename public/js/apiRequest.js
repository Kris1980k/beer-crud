export async function fetchRivals(){
    let response= await fetch('/api/rivals', {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
        return data;
    })

    return response;
}

export async function fetchSeries(){
    let response= await fetch('/api/series', {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
        return data;
    })
    return response;
}

export async function fetchSeriesView(){
    let response= await fetch('/api/seriesView', {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
        return data;
    })
    return response;
}

export async function fetchGames(){
    let response= await fetch('/api/games', {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
        return data;
    })

    return response;
}

export async function fetchSales(id){
    let response= await fetch('/api/sales', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id)
    })
    .then(res => res.json())
    .then(data => {
        return data;
    })

    return response;
}

export async function fetchProducts(){
    let response= await fetch('/api/products', {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
        return data;
    })

    return response;
}
