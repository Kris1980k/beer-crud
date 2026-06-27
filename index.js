require('dotenv').config()

const {getView, getProducts} = require('./client.js');
const express = require('express');
const path = require('node:path')
const app = express();
const port = 3000;;


app.engine('.html', require('ejs').__express);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');

app.get('/home', (req,res) => {
    const getProductList = getProducts().then((productList) => {
        console.log(productList);
        
        res.render('index', {productList:productList});
    });    
})

app.get('/view', (req,res) => {
    const getViewList = getView();
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})