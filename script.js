
const scoreDisplay = document.querySelector('.current-score');
const resetGame = document.querySelector('.reset-game');
let clickedCard = null;
let tries = 0;
let preventClick = false;


function updateScoreDisplay() {
    scoreDisplay.innerText = tries;
}

function flip(el) {
    el.classList.toggle('hidden');
    el.parentNode.classList.toggle('clicked');    
}

function createBoard() {

    const gameContainer = document.querySelector('.game-container');
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

        cardDiv.innerHTML = `<img class="back" src="/img/card-backside.jpg" alt=""><img class="front hidden" src="/img/${number}_kontra_Tove_Brandt.jpg" value="${number}" alt="">`;
        /* cardDiv.innerHTML = card; */
        gameContainer.appendChild(cardDiv);
    }
}

function init() {
    updateScoreDisplay();
    createBoard();
    const img = document.querySelectorAll('img');
    for (let image of img) {
        if(image.classList.contains('front') && !image.classList.contains('hidden')) flip(image);
        image.addEventListener('click', e => clickImage(e.target));
    }   
}

function clickImage(image) {

    if(!preventClick && image.classList.contains('hidden')) {

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
        } /* else {
            console.log('samma');
        } */
        clickedCard = null;
        tries++;
        
        updateScoreDisplay();
    }
}
}

resetGame.addEventListener('click', () => {
    console.log('clikc');
    init();
});


init();



