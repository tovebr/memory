
const scoreDisplay = document.querySelector('.current-score');
const highScoreDisplay = document.querySelector('.high-score');
const resetGame = document.querySelector('.reset-game');
const gameContainer = document.querySelector('.game-container');
const statusDisplay = document.querySelector('.status-display');
const statusText = document.querySelector('.status-display-message');
let gameWon = false;
let clickedCard = null;
let preventClick = false;
let highScore = 0;
let score, playing;


function updateScoreDisplay() {
    scoreDisplay.innerText = score;
    highScoreDisplay.innerText = highScore;
}

function flip(el) {
    el.classList.toggle('hidden');
    el.parentNode.classList.toggle('clicked');    
}

function createBoard() {
    console.log('create');
    const order = [1,1,2,2,3,3,4,4,5,5,6,6];
    const randomOrder = [];

    for (let i = order.length; i > 0; i--) {
        let randomNr = Math.floor(Math.random() * order.length);    
        randomOrder.push(order[randomNr]);
        order.splice(randomNr, 1);
    }

    for(let number of randomOrder) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card-holder');

        cardDiv.innerHTML = `<img class="back" src="img/card-backside.jpg" alt=""><img class="front hidden" src="/img/${number}_kontra_Tove_Brandt.jpg" value="${number}" alt="">`;
        /* cardDiv.innerHTML = card; */
        gameContainer.appendChild(cardDiv);
    }
}

function isGameWon() {
    const cardHolders = (document.querySelectorAll('.card-holder'));

    let correct = [];
    cardHolders.forEach(el => correct.push(el.classList.contains('clicked')));
    won = correct.reduce((a,b) => {
       return a && b ? true : false;
    })
    
    if(won) {
        console.log('vinnare');
        statusText.innerText = 'You won!';
        statusDisplay.classList.remove('hide-status-display');

        if(score > 0 && score > highScore) highScore = score;
    }
} 

function init() {
    score = 20;
    playing = true;
    if(!statusDisplay.classList.contains('hide-status-display')) statusDisplay.classList.add('hide-status-display'); 
    updateScoreDisplay();
    createBoard();
    const img = document.querySelectorAll('img');
    for (let image of img) {
        if(image.classList.contains('front') && !image.classList.contains('hidden')) flip(image);
        image.addEventListener('click', e => clickImage(e.target));
    }   
}

function clickImage(image) {

    if(!preventClick && image.classList.contains('hidden') && playing) {

        flip(image);

        if(!clickedCard) {
            clickedCard = image;
        } else {
            
            let prevCard = clickedCard;
            if(image.getAttribute('value') !== clickedCard.getAttribute('value')) {

                preventClick = true;
                setTimeout(function() {
                    flip(image);
                    flip(prevCard);
                    preventClick = false;
                                  
                }, 800);
            } 
            
            clickedCard = null;


            score--;
            
            if(score === 0) {
                playing = false;
                statusText.innerText = 'You loose....';
                statusDisplay.classList.remove('hide-status-display');
            }
            
            isGameWon();  
            updateScoreDisplay();
        }
    }
}

resetGame.addEventListener('click', () => {
    const allCards = document.querySelectorAll('.card-holder');
    allCards.forEach(el => el.parentNode.removeChild(el));
    init();
});


init();



