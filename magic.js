VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
SUITS = ["C", "H", "S", "D"]

$(".go").on("click", function() {
	var one = $("#one").val();
	var two = $("#two").val();
	var three = $("#three").val();
	var four = $("#four").val();
	var five = $("#five").val();

	performMagic(one, two, three, four, five)
});

function performMagic(one, two, three, four, five) {
	var cards = [one, two, three, four, five]
	var mystery = []

	cards.sort(function(a, b) {
		return getStrength(a) - getStrength(b);
	})

	alert(cards);

	for(var i = 0; i < cards.length - 1; i++) {
		if(getSuit(cards[i]) === getSuit(cards[i + 1])) {
			mystery.push(cards[i]);
			mystery.push(cards[i + 1]);
			break;
		}
	}

	alert(mystery);
	var key = mystery[0];

	if(VALUES.indexOf(getValue(mystery[1])) - VALUES.indexOf(getValue(mystery[0])) > 6) {
		key = mystery[1];
	}

	alert(key);
}

function getValue(card) {
	return card.substring(0, card.length - 1);
}

function getSuit(card) {
	return card.substring(card.length - 1);
}

function getStrength(card) {
	return ((SUITS.indexOf(getSuit(card)) + 1) * 14) + (VALUES.indexOf(getValue(card)) + 1);
}