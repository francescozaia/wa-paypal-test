'use strict';

$(function () {

	var $modalLayer = $('.js-modal');
	var $productLinks = $('[data-sku]');
	var $productsRecap = $('#products');

	var $createPayment = $('.js-create');

	$modalLayer.modal();

	var basket = [];
	$productLinks.on('click', function () {
		var sku = $(this).attr('data-sku');
		$.ajax({
			url: "/addToBasket/" + sku
		}).done(function(res) {
			basket = res;
			$productsRecap[0].innerHTML = '';
			var grandTotal = 0;
			for (var i = 0; i < basket.length; i++) {
				if (!basket[i].qty) basket[i].qty = 0;
				basket[i].total = basket[i].qty * Number(basket[i].price).toFixed(2);
				$productsRecap.append(basket[i].name + "(" + basket[i].qty + "): " + basket[i].total + "<br/>");
				grandTotal += basket[i].total;
			}
			$productsRecap.append("<br/>" + Number(grandTotal).toFixed(2));
			$modalLayer.modal('open');
		});
	});

});
