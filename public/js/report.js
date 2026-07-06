import { fetchSales} from "./apiRequest.js";

const id = window.__ID__;
const tableBody = document.getElementById("table-body");

document.addEventListener("DOMContentLoaded", () =>{
    fetchSales(id).then((res) =>{
        console.log("???",res);


        res.forEach((product,i) => {
            let tr = document.createElement('tr');
            for (let key in product){
                
                let td = document.createElement('td');
                let p = document.createElement('p');
                p.innerText = product[key];
                td.appendChild(p);
                tr.appendChild(td);
            }
            let id_td= "td-product"+product.product;
            //td.setAttribute("id", id_td);
            

            //td.addEventListener("click",function (){ getRegistries (game.id)})            
            //tr.appendChild(tdDate);

            tableBody.appendChild(tr);
        });
    })
    })

