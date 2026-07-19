import {fetchSeriesView, fetchRivals} from "./apiRequest.js";

const tableBody = document.getElementById("table-body");

var rivalList;
var serieList;
var viewList;
var date = new Date();

const getRegistries =(serie_id)=>{
    //const getRegistry = await fetchRegistry()
    sessionStorage.setItem('serie_id',serie_id);
    window.location.replace("home/report");
};

document.addEventListener('DOMContentLoaded', () => {
    //console.log(date);    
    console.log("DOM fully loaded and parsed");
    fetchSeriesView().then((res) => {
        console.log("Series: \n", res);
        
        res.forEach(serie => {
            //console.log(serie);
            
            let row = document.createElement('tr');

            //Serie Id
            let tdSerieId = document.createElement('td');
            let tdSerieIdP = document.createElement('p');
            let id_tdSerieId= "td-serie-"+serie.series_id;
            tdSerieId.setAttribute("id", id_tdSerieId);
            tdSerieIdP.innerText = serie.series_id;

            tdSerieId.addEventListener("click",function (){ getRegistries (serie.series_id)})
            tdSerieId.appendChild(tdSerieIdP);

            //Rival

            let tdRival = document.createElement('td');
            let tdRivalP = document.createElement('p');
            tdRivalP.innerText = serie.rival;

            tdRival.appendChild(tdRivalP);

            //Start Date
            let tdStartDate = document.createElement('td');
            let tdStartDateP = document.createElement('p');
            tdStartDate.innerText = serie.start_date;

            tdStartDate.appendChild(tdStartDateP);
            //End Date
            let tdEndDate = document.createElement('td');
            let tdEndDateP = document.createElement('p');
            tdEndDate.innerText = serie.end_date;

            tdEndDate.appendChild(tdEndDateP);
            // Append data

            row.appendChild(tdSerieId);
            row.appendChild(tdRival);
            row.appendChild(tdStartDate);
            row.appendChild(tdEndDate);

            tableBody.appendChild(row);
        });
    })
})

/*

res.forEach(serie => {
            let row = document.createElement('tr');

            let tdSerie = document.createElement('td');
            let tdSerieP = document.createElement('p');
            tdSerieP.innerText = serie.rival_id;

            tdSerie.appendChild(tdSerieP);

            let tdDate = document.createElement('td');
            let tdDateP = document.createElement('p');
            tdDateP.innerText = serie.date;

            tdDate.appendChild(tdDateP);

            row.appendChild(tdSerie);
            row.appendChild(tdDate);

            tableBody.appendChild(row);
        });
*/