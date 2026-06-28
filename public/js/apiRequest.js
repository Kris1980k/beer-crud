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
    fetch('/api/games', {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);        
    })
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