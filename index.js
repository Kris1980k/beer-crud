require('dotenv').config()


const {getView, getProducts, getRivals, getGames, getRegistries} = require("./api/client.js");
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
    var getProductList = getProducts().then((productList) => {
        console.log(productList);
        
        res.render('index', {productList:productList});
    });    
})


app.get('/products', (req,res) => {
    var getProductList = getProducts().then((productList) => {
        console.log(productList);
        
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

app.post('/api/registries', (req,res) => {
    console.log(req.body," holaa");
    var game = req.body.game;
    var zone = req.body.zone;
    const getRegistryList = getRegistries(game,zone).then((registryList) => {
        console.log(registryList);        
        res.send(registryList);
    })
})

app.get('/api/rivals', (req,res) => {
    const getRivalList = getRivals().then((rivalList) => {
        res.send(rivalList)
    })
})

app.get('/api/products', (req,res) => {
    const getProductList = getProducts().then((productList) => {
        res.send(productList)
    })
})

app.get('/api/games', (req,res) => {
    const getGameList = getGames().then((gameList) => {
        res.send(gameList)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})