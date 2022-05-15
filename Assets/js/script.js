let timer = 20; //seconds
let timeLeft = document.querySelector(".time")
let start_button =document.querySelector("#start_button") 
let qArray = [];
let ansKey = [1,2,4,3];
let isPlaying = false;
var header = document.getElementById('header')
let banner = document.getElementById('banner')
let scoreboard = document.getElementById('scoreboard')
let qCard = document.getElementById('question-card')
let answer = "";
let pickedAnswer = "";
let numRight = 0;
let archiveQs = [
    ["Which is red?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is orange?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is blue?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is green?", "Apple", "Carrot", "Celery", "Blueberry"]
];
let leaderboard = [];
let numQs = archiveQs.length;

// get/create leaderboard in local storage
function makeLeader() {
    let hasBeenQuizzed = localStorage.getItem("hasQuizzed");
    if (hasBeenQuizzed == true) {
        leaderboard = localStorage.getItem("leaderboard")
    } else {
        localStorage.setItem("hasQuizzed", true);
        leaderboard = [
            ["OOO",0],
            ["OOO",0],
            ["OOO",0],
            ["OOO",0],
            ["OOO",0],
        ];    
    }    
    makeScoreboard();
}

makeLeader();

//make scoreboard in html
function makeScoreboard() {
    for (let i = 0; i < 5; i++) {
        placeholdernum = i+1;
        let idName = placeholdernum+"-place";
        let element = document.getElementById(idName)
        let initials = leaderboard[i][0]
        let score = leaderboard[i][1]
        element.innerHTML = `${initials} = ${score} correct out of ${numQs}`
        console.log(`idName: ${idName}\nElement: ${element}\n Initials: ${initials} \n Score:${score}`)
    }

}

// Timer method
    // hanldes timer - while true game is playing
    function countdown () {
        let timerInterval = setInterval(function() {
            timer--;
            timeLeft.textContent = timer + " seconds left to play.";
    
            if(timer === 0 || isPlaying == false) {
                clearInterval(timerInterval);
                timer = 20;
                if (isPlaying == false) {
                    window.alert(`You finished!\nYou got ${numRight} questions correct!`)

                } else {
                    window.alert("Out of time!")
                }

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




    
// start button triggers quiz
    // hides scoreboard
    // set timer
    // displays question format
    // generates first question
    // when game ends calls scoreboard

    function startGame() {
        isPlaying = true;
        qArray = archiveQs;
        countdown();
        makeQuestion();
    }



// quiz question generation
function makeQuestion() {
    // check to see if there are any more questions
    if (qArray.length<1) {
        isPlaying= false;
        return;
    }
    // random question from array
    let rand = Math.floor(Math.random()*qArray.length);
    let getQuest = qArray[rand];
    // store answer key
    answer = ansKey[rand];
    // increment number of question asked
    numQs++;
    // display question and answers
    document.getElementById("question").innerHTML = getQuest[0];
    document.getElementById("1").innerHTML = getQuest[1]; 
    document.getElementById("2").innerHTML = getQuest[2];
    document.getElementById("3").innerHTML = getQuest[3];
    document.getElementById("4").innerHTML = getQuest[4];
    //remove question from array - prevent repeats
    qArray.splice(rand,1);
}

// checks answer and tabulates # of correct
    function answeredQ(newID)
    {   pickedAnswer = newID;
        if (pickedAnswer == answer) {
            numRight++;
        } 
        makeQuestion()
    }

    function isTop(){
        
    }

// scoreboard display
    // starts when game ends
    // checks to see if in top 5
        // if in tope 5 
        // prompt for initials
        // insert into top 5 at appropriate location
    // hide question section
    // display scoreboard
    // prompt to try again
