let timer = 20; //seconds
let timeLeft = document.querySelector(".time")
let start_button =document.querySelector("#start_button") 
let word = "chrome"
let wordArray = [];
let isPlaying = false;
var header = document.getElementById('header')
let banner = document.getElementById('banner')
let scoreboard = document.getElementById('scoreboard')
let qCard = document.getElementById('question-card')


// Timer method
    // hanldes timer - while true game is playing
    function countdown () {
        let timerInterval = setInterval(function() {
            timer--;
            timeLeft.textContent = timer + " seconds left to play.";
    
            if(timer === 0 || isPlaying == false) {
                clearInterval(timerInterval);
                timer = 2;
                if (isPlaying == true) {
                    window.alert("You finished!")
                } else {window.alert("Out of time!")}

                // runcheck to see if in top


                
                timeLeft.textContent = "Would you like to play again?";
                start_button.style.display = "block";
                qCard.style.display = "none";
                scoreboard.style.display = "block";
                banner.textContent = "Good Job!";
                banner.style.display = "block";
                start_button.textContent = "Play Again!";
                
            }
    
        }, 1000);
    }
    // start game
    start_button.addEventListener("click", function() {
        startGame();
        timeLeft.textContent = timer + " seconds left to play.";
        start_button.style.display = "none";
        qCard.style.display = "block";
        scoreboard.style.display = "none";
        banner.style.display = "none";
    })

    // question answered
    qCard.addEventListener("click", function(event) {
        var answer = event.target()
            if (answer = ".answer") {
                console.log("success!")
            } else {console.log("fail!")}
    })

    // get selected answer


    // make question
    var makeQuestion = function() {
        let answers = document.querySelectorAll('.answer');
        console.log("Answers: " + answers)
    }

    
// start button triggers quiz
    // hides scoreboard
    // set timer
    // displays question format
    // generates first question
    // when game ends calls scoreboard

    function startGame() {
        isPlaying = true;
        wordArray = word.split("");
        countdown();
        document.addEventListener("keydown", keyboardListen) 
    }



// quiz question generation
    // random question from array
    // display question 
    // display answers

// checks answer and tabulates # of correct
    // looks at question and sees if correct answer was selected
    // increments # of questions
    // increments # of correct
    // calls another question to be asked if game is still going

// remove current question from this round of quiz (prevent repeat questions)
    // checks which question was asked then removes

// scoreboard display
    // starts when game ends
    // checks to see if in top 5
        // if in tope 5 
        // prompt for initials
        // insert into top 5 at appropriate location
    // hide question section
    // display scoreboard
    // prompt to try again
