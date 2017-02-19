var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var pug = require('pug');

var router = express.Router();

var app = express();
try {
    var configJSON = fs.readFileSync(__dirname + "/config.json");
    var productsJSON = fs.readFileSync(__dirname + "/products.json");
    var config = JSON.parse(configJSON.toString());
    var products = JSON.parse(productsJSON.toString());
} catch (e) {
    console.error("File config.json non trovato o invalido: " + e.message);
    process.exit(1);
}

console.log("Assicurarsi che le righe successive mostrino le variabili di sistema");
console.log("PayPal ID: " + process.env.PAYPAL_ID);
console.log("PayPal Secret: " + process.env.PAYPAL_SECRET);
console.log("Indirizzo Gmail: " + process.env.GMAIL_ACCOUNT);
console.log("Password Gmail: " + process.env.GMAIL_PWD);

config.api.client_id = process.env.PAYPAL_ID;
config.api.client_secret = process.env.PAYPAL_SECRET;

routes.init(config, products);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(cookieParser());
app.use(session({
    secret: 'fz-test',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/create', routes.createPayment);
app.get('/execute', routes.executePayment);
app.get('/cancel', routes.cancelPayment);
app.get('/addToBasket/:sku', routes.addToBasket);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Server in ascolto su porta ' + app.get('port'));
});