import { fetchGames, fetchRivals, fetchViews} from "./apiRequest.js";

const tableBody = document.getElementById("table-body");

var rivalList;
var gameList;
var viewList;


document.addEventListener('DOMContentLoaded', () => {
    
    console.log("DOM fully loaded and parsed");
    gameList = fetchGames().then(() => {
        gameList.forEach(game => {
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
    })
})