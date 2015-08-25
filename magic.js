/**
 * Takes 5 cards and outputs 4 of them in a manner that communicates
 * to the magician the identity of the 5th card. To learn the underlying
 * mechanism of this trick, visit: http://www.jstor.org/stable/25678404
 * or attempt to derive the method from this code. This JavaScript document is 
 * intentionally left uncommented as an exercise to the reader.
 */

var VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var SUITS = ['D', 'C', 'H', 'S'];
var PI = '31415926535897932384626433';
var i = 0;
var submit = true;

$('#input').keyup(function(event) {
    if (submit && event.keyCode === 13) {
        $('#go').click();
    }
});

$('#go').on('click', function() {
	submit = false;

	var one = $('#one').val();
	var two = $('#two').val();
	var three = $('#three').val();
	var four = $('#four').val();
	var five = $('#five').val();

	if (isAllValid(one, two, three, four, five)) {
		$('#input').hide();
		performMagic(one, two, three, four, five)
		$('#conclusion').show();
	}
});

$('#again').on('click', function() {
	submit = true;

	$('#input').show();
	$('#conclusion').hide();

	document.getElementById('output').innerHTML = '';
	document.getElementById('addendum').innerHTML = i;
});

function isAllValid(one, two, three, four, five) {
	return isValid(one) &&
		   isValid(two) &&
		   isValid(three) &&
		   isValid(four) &&
		   isValid(five);
}

function isValid(card) {
	if (getStrength(card) === null) {
		alert(card + " is not a valid card.");
		return false;
	}
	return true;
}

function performMagic(one, two, three, four, five) {
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

function jumble(arr, num) {
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

function getKeyIndex() {
	var index = PI.substring(i, i + 1);
	i += 1;
	return parseInt(index) % 4;
}

function getValue(card) {
	var VALUE_MAPPER = {
		'1': 'A', 'a': 'A',
		'11': 'J', 'j': 'J',
		'12': 'Q', 'q': 'Q',
		'13': 'K', 'k': 'K'
	};
	var rawValue = card.substring(0, card.length - 1);

	if (rawValue in VALUE_MAPPER) {
		return VALUE_MAPPER[rawValue];
	}
	return rawValue;
}

function getSuit(card) {
	return card.substring(card.length - 1).toUpperCase();
}

function getStrength(card) {
	if (SUITS.indexOf(getSuit(card)) === -1 || VALUES.indexOf(getValue(card)) === -1) {
		return null;
	}
	return ((SUITS.indexOf(getSuit(card)) + 1) * (VALUES.length + 1)) + (VALUES.indexOf(getValue(card)) + 1);
}
