import { fetchRivals, fetchViews, fetchProducts} from "./apiRequest.js";

const tableBody = document.getElementById("table-body");

var rivalList;
var productList;
var viewList;
var date = new Date();

document.addEventListener('DOMContentLoaded', () => {
    console.log(date);    
    console.log("DOM fully loaded and parsed");
    fetchProducts().then((res) => {
        console.log(":v", res);
        
        res.forEach(product => {
            let row = document.createElement('tr');

            let tdRival = document.createElement('td');
            let tdRivalP = document.createElement('p');
            tdRivalP.innerText = product.name;

            tdRival.appendChild(tdRivalP);

            let tdDate = document.createElement('td');
            let tdDateP = document.createElement('p');
            tdDateP.innerText = product.price;

            tdDate.appendChild(tdDateP);

            row.appendChild(tdRival);
            row.appendChild(tdDate);

            tableBody.appendChild(row);
        });
    })
})

/*

res.forEach(product => {
            let row = document.createElement('tr');

            let tdRival = document.createElement('td');
            let tdRivalP = document.createElement('p');
            tdRivalP.innerText = product.rival_id;

            tdRival.appendChild(tdRivalP);

            let tdDate = document.createElement('td');
            let tdDateP = document.createElement('p');
            tdDateP.innerText = product.date;

            tdDate.appendChild(tdDateP);

            row.appendChild(tdRival);
            row.appendChild(tdDate);

            tableBody.appendChild(row);
        });
*/