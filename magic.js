VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
SUITS = ["D", "C", "H", "S"];
PI = "31415926535897932384626433";
i = 0;

$(".go").on("click", function() {
	var one = $("#one").val();
	var two = $("#two").val();
	var three = $("#three").val();
	var four = $("#four").val();
	var five = $("#five").val();
	$("#input").hide();
	performMagic(one, two, three, four, five)
});

function performMagic(one, two, three, four, five) {
	var cards = [one, two, three, four, five];
	var mystery = [];

	cards.sort(function(a, b) {
		return getStrength(a) - getStrength(b);
	});

	console.log(cards);

	for(var i = 0; i < cards.length - 1; i++) {
		if(getSuit(cards[i]) === getSuit(cards[i + 1])) {
			mystery.push(cards[i]);
			mystery.push(cards[i + 1]);
			break;
		}
	}

	console.log("mystery: " + mystery);

	var public = mystery[0];
	var private = mystery[1];
	var diff = 0;

	if(VALUES.indexOf(getValue(mystery[1])) - VALUES.indexOf(getValue(mystery[0])) > 6) {
		public = mystery[1];
		private = mystery[0];
		diff = 13 - (VALUES.indexOf(getValue(mystery[1])) - VALUES.indexOf(getValue(mystery[0])));
	}
	else {
		diff = VALUES.indexOf(getValue(mystery[1])) - VALUES.indexOf(getValue(mystery[0]));
	}

	console.log("public: " + public);
	console.log("private: " + private);
	console.log("diff:" + diff);

	cards.splice(cards.indexOf(private), 1);
	cards.splice(cards.indexOf(public), 1);

	cards = jumble(cards, diff);

	console.log("cards before adding suit card in place: " + cards);

	cards.splice(getKeyIndex(), 0, public);

	document.getElementById("output").innerHTML = cards;
}

function jumble(arr, num) {
	jumbledArr = [];
	arr.sort(function(a, b) {
		return getStrength(a) - getStrength(b);
	});
	console.log("prejumble: " + arr);

	if(num == 1) {
		jumbledArr.push(arr[0]);
		jumbledArr.push(arr[1]);
		jumbledArr.push(arr[2]);
	}
	else if(num == 2) {
		jumbledArr.push(arr[0]);
		jumbledArr.push(arr[2]);
		jumbledArr.push(arr[1]);
	}
	else if(num == 3) {
		jumbledArr.push(arr[1]);
		jumbledArr.push(arr[0]);
		jumbledArr.push(arr[2]);
	}
	else if(num == 4) {
		jumbledArr.push(arr[1]);
		jumbledArr.push(arr[2]);
		jumbledArr.push(arr[0]);
		
	}
	else if(num == 5) {
		jumbledArr.push(arr[2]);
		jumbledArr.push(arr[0]);
		jumbledArr.push(arr[1]);
	}
	else if(num == 6) {
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
	return card.substring(0, card.length - 1);
}

function getSuit(card) {
	return card.substring(card.length - 1);
}

function getStrength(card) {
	return ((SUITS.indexOf(getSuit(card)) + 1) * 14) + (VALUES.indexOf(getValue(card)) + 1);
}