require('dotenv').config()


const {getView, getProducts, getRivals, getGames} = require("./api/client.js");
const express = require('express');
const path = require('node:path');
const app = express();
const port = 3000;;


app.engine('.html', require('ejs').__express);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/home', (req,res) => {
    const getProductList = getProducts().then((productList) => {
        console.log(productList);
        
        res.render('index', {productList:productList});
    });    
})

app.get('/api/views', (req,res) => {
    console.log(req.body);
    var game = req.body.game;
    var zone = req.body.zone;
    const getViewList = getView(game,zone).then((viewList) => {
        res.send(viewList);
    })
})

app.get('/api/rivals', (req,res) => {
    const getRivalList = getRivals().then((rivalList) => {
        res.send(rivalList)
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