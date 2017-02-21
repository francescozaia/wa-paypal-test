'use strict';

var paypal = require('paypal-rest-sdk');
var nodemailer = require('nodemailer');
var _ = require('lodash');

var productsJSON;
var basketJSON;

var createEmailHTML = function (paymentObject) {
	var items = payment.transactions[0].item_list.items;
	var emailHTML = '<p>Hai acquistato:';
	emailHTML += '<ul>';
	for (var i=0; i<items.length; i++) {
		emailHTML += '<li>' + items[i].name + ' (quantità: ' + + items[i].quantity + ')' + '</li>';
	}
	emailHTML += '</ul>';
	emailHTML += '</p>'
	emailHTML += '<p>Per un prezzo totale di ' + payment.transactions[0].amount.currency + ' ' + payment.transactions[0].amount.total + '</p>';
}

var sendEmail = function(paymentObject) {
	var emailHTML = createEmailHTML(paymentObject);
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.GMAIL_ACCOUNT,
			pass: process.env.GMAIL_PWD
		}
	});
	var mailOptions = {
		from: paymentObject.transactions[0].payee.email,
		to: paymentObject.payer.payer_info.email,
		subject: 'Complimenti per il tuo acquisto!',
		html: emailHTML
	};
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Message sent: ' + info.response);
		};
	});
}

exports.index = function (req, res) {
	res.render('index', { 'productsJSON': productsJSON });
};

exports.addToBasket = function (req, res) {
	var sku = req.params.sku;
	var index = _.indexOf(basketJSON, _.find(basketJSON, function(o) { 
		return o.sku == sku; 
	}));
	if (index > -1) {
		basketJSON[index].qty = (!basketJSON[index].qty) ? 1 : basketJSON[index].qty + 1;
		res.send(basketJSON);
	} else {
		// error
	}
}

exports.createPayment = function (req, res) {
	var method = req.params.method;

	var host = process.env.NODE_ENV ? 'wa-paypal-test.herokuapp.com' : 'localhost';
	var port = process.env.PORT || 3000;

	var currency = 'GBP';

	var grandTotal = 0;
	var b = _.filter(basketJSON, function(o) { 
		return (o.qty && o.qty !== 0)
	});

	for (var i = 0; i < b.length; i++) {
		b[i].total = b[i].qty * b[i].price;
		b[i].quantity = b[i].qty.toString();
		b[i].qty = b[i].qty.toString();
		b[i].currency = currency;
		grandTotal += b[i].total;
		delete b[i].qty;
		delete b[i].total;
	}
	grandTotal = grandTotal.toString();

	console.log('http://' + host + ':' + port + '/');

	var payment = {
		'intent': 'sale',
		'payer': {
			'payment_method': 'paypal'
		},
		'transactions': [{
			'item_list': {
                    'items': b
                },
			'amount': {
				'currency': currency,
				'total': grandTotal
			},
			'description': 'userID'
		}],
		'redirect_urls': {
			'return_url': 'http://' + host + ':' + port + '/execute',
			'cancel_url': 'http://' + host + ':' + port + '/cancel'
		}
	};

	paypal.payment.create(payment, function (error, payment) {
		if (error) {
			console.log(error);
			res.render('error', { 'error': error });
		} else {
			req.session.paymentId = payment.id;
			res.render('create', { 'payment': payment });
		}
	});
};

exports.executePayment = function (req, res) {
	var paymentId = req.session.paymentId;
	var payerId = req.param('PayerID');

	var details = { 'payer_id': payerId };
	var payment = paypal.payment.execute(paymentId, details, function (error, payment) {
		if (error) {
			console.log(error);
			res.render('error', { 'error': error });
		} else {
			res.render('execute', { 'payment': payment });
			sendEmail(payment);
		}
	});
};

exports.cancelPayment = function (req, res) {
  res.render('cancel');
};

exports.init = function (config, products) {
	productsJSON = products;
	basketJSON = products;
	paypal.configure(config.api);
};