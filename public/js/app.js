'use strict';

document.addEventListener('DOMContentLoaded', function() {

	(function(){

		var jQueryAvailable = window.jQuery;

		var $modalLayer = document.querySelector('.js-modal');
		var $productLinks = document.querySelectorAll('[data-sku]');
		var $productsRecap = document.querySelector('.js-products');
		var $createPayment = document.querySelector('.js-create');

		var updateBasketView = function(basketObject, sku) {
			var el;
			$productsRecap.innerHTML = '';
			var grandTotal = 0;
			for (var i = 0; i < basketObject.length; i++) {
				var basketItem = basketObject[i];
				if (!basketItem.qty) basketItem.qty = 0;
				basketItem.total = basketItem.qty * Number(basketItem.price).toFixed(2);
				el = createDOMElementFromString(basketItem.name + '(' + basketItem.qty + '): ' + basketItem.total);
				$productsRecap.appendChild(el);
				grandTotal += basketItem.total;
			}
			$productsRecap.appendChild(document.createElement('hr'))
			el = createDOMElementFromString('Totale: ' + Number(grandTotal).toFixed(2));
			$productsRecap.appendChild(el);
			openModal();
			
		}

		var createDOMElementFromString = function(s) {
			var el = document.createElement('p');
			el.innerHTML = s
			return el;
		}

		var requestErrorHandler = function() {

		}

		var connectionErrorHandler = function() {
			
		}

		var initModal = function() {
			if (jQueryAvailable) $($modalLayer).modal();
		}

		var openModal = function() {
			if(jQueryAvailable) $($modalLayer).modal('open');
		}

		initModal();

		for (var i = 0; i < $productLinks.length; i++) {
			$productLinks[i].addEventListener('click', function(event) {
				var sku = this.getAttribute('data-sku');
				var request = new XMLHttpRequest();
				request.open('GET', '/addToBasket/' + sku, true);
				request.onload = function onBasketLoad() {
					if (request.status >= 200 && request.status < 400) {
						var basketObject = JSON.parse(request.responseText);
						if (basketObject) {
							updateBasketView(basketObject, sku);
						}
					} else {
						requestErrorHandler();
					}
				}
				request.onerror = function() {
					connectionErrorHandler();
				}
				request.send();
			});
		}
	})();
});
