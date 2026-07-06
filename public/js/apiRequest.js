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

export async function fetchRegistry(id){
    let response= await fetch('/api/registries', {
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
