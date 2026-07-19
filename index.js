require('dotenv').config()


const {getView, getProducts,getZones,getSeries,getSeriesView, getRivals, getGames, getRegistries, getSales} = require("./api/client.js");
const express = require('express');
const path = require('node:path');
const app = express();
const port = 8888;


app.engine('.html', require('ejs').__express);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine', 'html');


app.get('/', (req, res) => {
    res.redirect('home');
})

app.get('/home/report', (req,res) => {
    let data = req.query;
    /*
    /api/registries?nombre=kris&apellido=diaz
    */    
    let id ={
        game: data.game,
        zone: data.zone
    }
    //console.log(id);
    res.render('report', {id:id})
})

app.get('/home', (req,res) => {
    res.render('index', {});
})


app.get('/products', (req,res) => {
    var getProductList = getProducts().then((productList) => {
        //console.log(productList);
        
        res.render('products', {productList:productList});
    });    
})

app.get('/teams', (req,res) => {
    var getRivalList = getRivals().then((rivalList) => {
        console.log(rivalList);
        
        res.render('teams', {rivalList:rivalList});
    });    
})

app.get('/reports', (req,res) => {
    var getReportList = getReports().then((reportList) => {
        console.log(reportList);        
        res.render('reports', {productList:productList});
    });    
})

/*app.post('/api/registries', (req,res) => {
    console.log(req.body);
    let game = req.body.game;
    var getSalesList = getSales(game).then((saleList) => {
        console.log(saleList);        
    })
})*/

app.post('/api/sales', (req,res) => {
    console.log(req.body," holaa");
    var game = req.body.game;
    var zone = req.body.zone;
    const getSalesList = getSales(game,zone).then((saleList) => {
        console.log(saleList);
        res.send(saleList);
    })
})

app.get('/api/rivals', (req,res) => {
    const getRivalList = getRivals().then((rivalList) => {
        res.send(rivalList)
    })
})

app.get('/api/series', (req,res) => {
    const getSerieList = getSeries().then((serieList) => {
        res.send(serieList)
    })
})

app.get('/api/seriesView', (req,res) => {
    const getSerieViewList = getSeriesView().then((serieViewList) => {
        res.send(serieViewList)
    })
})

app.get('/api/products', (req,res) => {
    const getProductList = getProducts().then((productList) => {
        res.send(productList)
    })
})

app.post('/api/games', (req,res) => {
    let serie_id = req.body.serie_id;
    const getGameList = getGames(serie_id).then((gameList) => {
        res.send(gameList)
    })
})

app.get('/api/zones', (req,res) => {
    const getZoneList = getZones().then((zoneList) => {
        res.send(zoneList);
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})