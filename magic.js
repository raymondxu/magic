var VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var SUITS = ['D', 'C', 'H', 'S'];
var PI = '31415926535897932384626433';
var i = 0;
var submit = true;

$("#input").keyup(function(event) {
    if (submit && event.keyCode == 13) {
        $("#go").click();
    }
});

$('#go').on('click', function() {
	submit = false;

	var one = $('#one').val();
	var two = $('#two').val();
	var three = $('#three').val();
	var four = $('#four').val();
	var five = $('#five').val();

	$('#input').hide();
	performMagic(one, two, three, four, five)
	$('#conclusion').show();
});

$('#again').on('click', function() {
	submit = true;

	$('#input').show();
	$('#conclusion').hide();
	document.getElementById('output').innerHTML = '';
	document.getElementById('addendum').innerHTML = i;
});

/**
 * Takes 5 cards and outputs 4 of them in a manner that communicates
 * to the magician the identity of the 5th card. To learn the underlying
 * mechanism of this trick, visit: http://www.jstor.org/stable/25678404
 * or attempt to derive the method from this code. This JavaScript document is 
 * intentionally left uncommented.
 */
var performMagic = function (one, two, three, four, five) {
	var cards = [one, two, three, four, five];
	var mystery = [];

	cards.sort(function(a, b) {
		return getStrength(a) - getStrength(b);
	});

	for (var i = 0; i < cards.length - 1; i++) {
		if (getSuit(cards[i]) === getSuit(cards[i + 1])) {
			mystery.push(cards[i]);
			mystery.push(cards[i + 1]);
			break;
		}
	}

	var public = mystery[0];
	var private = mystery[1];
	var diff = 0;

	if (VALUES.indexOf(getValue(mystery[1])) - VALUES.indexOf(getValue(mystery[0])) > 6) {
		public = mystery[1];
		private = mystery[0];
		diff = 13 - (VALUES.indexOf(getValue(mystery[1])) - VALUES.indexOf(getValue(mystery[0])));
	}
	else {
		diff = VALUES.indexOf(getValue(mystery[1])) - VALUES.indexOf(getValue(mystery[0]));
	}

	alert('Your card is ' + private + '. After memorizing your card, close this box.');
	cards.splice(cards.indexOf(private), 1);
	cards.splice(cards.indexOf(public), 1);
	cards = jumble(cards, diff);
	cards.splice(getKeyIndex(), 0, public);

	document.getElementById('output').innerHTML = cards;
}

var jumble = function(arr, num) {
	jumbledArr = [];
	arr.sort(function(a, b) {
		return getStrength(a) - getStrength(b);
	});

	if (num === 1) {
		jumbledArr.push(arr[0]);
		jumbledArr.push(arr[1]);
		jumbledArr.push(arr[2]);
	}
	else if (num === 2) {
		jumbledArr.push(arr[0]);
		jumbledArr.push(arr[2]);
		jumbledArr.push(arr[1]);
	}
	else if (num === 3) {
		jumbledArr.push(arr[1]);
		jumbledArr.push(arr[0]);
		jumbledArr.push(arr[2]);
	}
	else if (num === 4) {
		jumbledArr.push(arr[1]);
		jumbledArr.push(arr[2]);
		jumbledArr.push(arr[0]);
		
	}
	else if (num === 5) {
		jumbledArr.push(arr[2]);
		jumbledArr.push(arr[0]);
		jumbledArr.push(arr[1]);
	}
	else if (num === 6) {
		jumbledArr.push(arr[2]);
		jumbledArr.push(arr[1]);
		jumbledArr.push(arr[0]);
	}

	return jumbledArr;
}

var getKeyIndex = function() {
	var index = PI.substring(i, i + 1);
	i += 1;
	return parseInt(index) % 4;
}

var getValue = function(card) {
	return card.substring(0, card.length - 1);
}

var getSuit = function(card) {
	return card.substring(card.length - 1).toUpperCase();
}

var getStrength = function(card) {
	return ((SUITS.indexOf(getSuit(card)) + 1) * 14) + (VALUES.indexOf(getValue(card)) + 1);
}