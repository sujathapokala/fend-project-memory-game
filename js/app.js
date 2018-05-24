const deckContainer = document.querySelector('.deck');
const cards = document.getElementsByClassName('card');
const modal = document.getElementById('modalPopup');
const span = document.getElementsByClassName("close")[0];

let Deck = {
moveCount: 0,
openCards:[],
openCard: null,
seconds: 0,
timer:'',
winCount:0,
initialize: function(){	
	Deck.seconds = 0;
	Deck.moveCount = 0;
	Deck.winCount = 0;
	Deck.openCards = [];
	let deckCards = [];
	[].push.apply(deckCards, cards);
	Deck.shuffle(deckCards);
	for(card of deckCards){
		card.classList.remove('open','show','match');
		deckContainer.appendChild(card);
	}
	$('.moves').hide();		
	$('.fa-star').show();
},
shuffle: function(array){
	var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
},
displayCardSymbol: function(){
	if(!Deck.openCard.classList.contains('match')){
		Deck.openCard.classList.add('open','show');		
	}	
},
addOpenCards: function(){
	if(!Deck.openCard.classList.contains('match')){
		Deck.openCards.push(Deck.openCard);
	}
},
matchCards: function(){
	if(Deck.openCards.length > 1){
		if(Deck.openCards[0].querySelector('i').classList.value === Deck.openCard.querySelector('i').classList.value) {
			Deck.showCards();
		}
		else{			
			setTimeout(Deck.flipCards,700);					
		}
	}
},
showCards: function(){
if(Deck.openCards.length > 0){
	Deck.openCards[0].classList.add('match');
	Deck.openCard.classList.add('match');
	Deck.openCards = [];
	Deck.winCount++;
	Deck.showWinMessage();
}
},
flipCards: function(){
if(Deck.openCards.length > 0){
	Deck.openCards[0].classList.remove('open','show');
	Deck.openCard.classList.remove('open','show');
	Deck.openCards = [];	
}
},
addMoves: function(){
	Deck.moveCount = Deck.moveCount + 1;
	$('.moves').text(Deck.moveCount);
	$('.moves').show();
},
startTimer: function() {
    Deck.timer = setInterval(function(){
		Deck.seconds ++;
		document.getElementById("seconds").innerText = Deck.seconds % 60;
		document.getElementById("minutes").innerText = parseInt(Deck.seconds/60);
	},1000);
},
stopTimer: function() {
	clearInterval(Deck.timer);
 },
 showWinMessage: function(){
 	if(Deck.winCount >= 8){
 		 Deck.stopTimer();
 		 modal.style.display = "block"; 
 		 $('.winMessage').text('Congratulations !!! ');
 		 $('.playTime').text(' You took '+ document.getElementById("minutes").innerText + ' minute(s)  '+ document.getElementById("seconds").innerText + ' seconds');
 		 Deck.showStarCount();		
 	}
 },
 showStarCount: function(){
 	if(Deck.moveCount <= 15){
 		$('.fa-star').show();	
 	}
 	else if(Deck.moveCount >= 15 && Deck.moveCount <= 30){
 		$('.starOne').show();		
 		$('.starTwo').show();		
 		$('.starThree').hide();		
 	} 	
 	else{
 		$('.starOne').show();		
 		$('.starTwo').hide();		
 		$('.starThree').hide();
 	}
 },
 restart:function(){
 	Deck.initialize();
	Deck.stopTimer();
	Deck.startTimer();		
 }
};

$(function (){
	Deck.initialize();		
	Deck.startTimer();
});

$('.card').click(function(event){
	Deck.openCard = event.target;
	if(event.target.tagName === 'LI' && !event.target.classList.contains('match') && !event.target.classList.contains('open') && !event.target.classList.contains('show')){
	Deck.displayCardSymbol();
	Deck.addOpenCards();
	Deck.matchCards();
	Deck.addMoves();
	Deck.showStarCount();
}		
});

$('.restart').click(function(){
	Deck.restart();
});

$('.close').click(function(){
	 modal.style.display = "none";
    if(Deck.winCount >= 8){
    	Deck.startTimer();
    }
});

$('.replay').click(function(){
	modal.style.display = "none";
	Deck.restart();
});

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

