import { fetchGames, fetchRivals, fetchViews} from "./apiRequest.js";

const tableBody = document.getElementById("table-body");

var rivalList;
var gameList;
var viewList;
var date = new Date();

document.addEventListener('DOMContentLoaded', () => {
    console.log(date);    
    console.log("DOM fully loaded and parsed");
    gameList = fetchGames().then((res) => {        
    })
})

/*

res.forEach(game => {
            let row = document.createElement('tr');

            let tdRival = document.createElement('td');
            let tdRivalP = document.createElement('p');
            tdRivalP.innerText = game.rival_id;

            tdRival.appendChild(tdRivalP);

            let tdDate = document.createElement('td');
            let tdDateP = document.createElement('p');
            tdDateP.innerText = game.date;

            tdDate.appendChild(tdDateP);

            row.appendChild(tdRival);
            row.appendChild(tdDate);

            tableBody.appendChild(row);
        });
*/