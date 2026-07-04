export async function fetchRivals(){
    fetch('/api/rivals', {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);        
    })
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

export async function fetchViews(){
    fetch('/api/views', {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);        
    })
}