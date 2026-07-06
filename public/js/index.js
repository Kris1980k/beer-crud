import { fetchGames, fetchRivals} from "./apiRequest.js";

const tableBody = document.getElementById("table-body");

var rivalList;
var gameList;
var viewList;
var date = new Date();

const getRegistries =(id)=>{
    //const getRegistry = await fetchRegistry()
    window.location.replace("home/report");
};

document.addEventListener('DOMContentLoaded', () => {
    //console.log(date);    
    console.log("DOM fully loaded and parsed");
    fetchGames().then((res) => {
        //console.log(":sv", res);
        
        res.forEach(game => {
            //console.log(game);
            
            let row = document.createElement('tr');            
            let tdRival = document.createElement('td');
            let tdRivalP = document.createElement('p');
            let id_td= "td-game-"+game.id;
            tdRival.setAttribute("id", id_td);
            tdRivalP.innerText = game.name;

            tdRival.addEventListener("click",function (){ getRegistries (game.id)})
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