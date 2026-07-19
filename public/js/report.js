import { fetchSales,fetchGames} from "./apiRequest.js";

const tableBody = document.getElementById("table-body");

document.addEventListener("DOMContentLoaded", () =>{
    const serie_id = parseInt(sessionStorage.getItem('serie_id'));
    const games_btn_list = document.getElementById("games-div");
    console.log(serie_id);
    
    fetchGames(serie_id).then((res) =>{
        res.forEach(game => {
            //Set btn
            let btn = document.createElement('button');
            btn.classList.add('list-group-item');
            btn.classList.add('list-group-item-action');

            let btnP = document.createElement('p');
            btnP.innerText = game.date;

            btn.appendChild(btnP);
            games_btn_list.appendChild(btn);

        });
        /*
        <div class="list-group">
  <button type="button" class="list-group-item list-group-item-action active" aria-current="true">
    The current button
  </button>
  <button type="button" class="list-group-item list-group-item-action">A second button item</button>
  <button type="button" class="list-group-item list-group-item-action">A third button item</button>
  <button type="button" class="list-group-item list-group-item-action">A fourth button item</button>
  <button type="button" class="list-group-item list-group-item-action" disabled>A disabled button item</button>
</div>
        */
    })
    /*
    fetchSales(serie_id,1).then((res) =>{
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
    })*/
    
    })

