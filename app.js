//game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//ui elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');


//assign UI
minNum.textContent = min;
maxNum.textContent = max;

//play again listener
game.addEventListener('mousedown', function(e){
    if(e.target.value === 'Play again') {
        window.location.reload();
    }
    
})

//add event listeners
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    //validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //check if won
    if (guess === winningNum) {
        //gameover - won
        gameOver(true, 'You guessed the right number.');
    } else {
        //wrong number
        guessesLeft -= 1; //shorthand


        if (guessesLeft === 0) {
            //game over
            gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
        } else {
            
            //change border color
            guessInput.style.borderColor = 'red';

            //clear input
            guessInput.value = '';

            //game continues - answer wrong
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
        }
    }
});

//gameover
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red'; 
    //Disable input
    guessInput.disabled = true;
    //change border color
    guessInput.style.borderColor = color;
    //set text color
    message.style.color = color;
    //set message
    setMessage(msg);

    //play again?
    guessBtn.value = 'Play again';
    guessBtn.className += 'play-again';
}

//Get winning num
function getRandomNum(min, max) {
    
    return Math.floor(Math.random()*(max-min+1)+min);
}

//set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}