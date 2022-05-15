let timer = 30; //seconds
let timeLeft = document.querySelector(".time")
let start_button =document.querySelector("#start_button")
let centDiv = document.getElementById('center') 
let qArray = [];
let ansKey = [];
let isPlaying = false;
var header = document.getElementById('header');
let banner = document.getElementById('banner');
let correct = document.getElementById('correct');
let correctDiv = document.getElementById('correctDiv');
let howTo = document.getElementById('how-to');
let scoreboard = document.getElementById('scoreboard')
let qCard = document.getElementById('question-card')
let answer = "";
let pickedAnswer = "";
let numRight = 0;
let archiveQs = [
    ["Which is red?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is orange?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is blue?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is green?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is red?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is orange?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is blue?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is green?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is red?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is orange?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is blue?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is green?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is red?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is orange?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is blue?", "Apple", "Carrot", "Celery", "Blueberry"],
    ["Which is green?", "Apple", "Carrot", "Celery", "Blueberry"]
];
let archiveK = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
let leaderboard = [];
let numQs = 0;
let qLeft = archiveQs.length;
let madeLeaderboard = false;



// get/create leaderboard in local storage
function makeLeader() {
    let hasBeenQuizzed = localStorage.getItem("hasQuizzed");
    if (hasBeenQuizzed == true) {
        leaderboard = localStorage.getItem("leaderboard")
    } else {
        localStorage.setItem("hasQuizzed", true);
        leaderboard = [
            ["ABC",5],
            ["DEF",4],
            ["GHI",3],
            ["JKL",2],
            ["MNO",1],
        ];
        localStorage.setItem("leaderboard", leaderboard);    
    }    
    makeLeaderboard();
}

makeLeader();

//make scoreboard in html
function makeLeaderboard() {
        for (let i = 0; i < 5; i++) {
            placeholdernum = i+1;
            let idName = placeholdernum+"-place";
            document.getElementById(idName).innerHTML = placeholdernum;
            let initials = leaderboard[i][0]
            let idName1 = idName+"-initials";
            document.getElementById(idName1).innerHTML = initials;
            let idName2 = idName+"-score";
            let score = leaderboard[i][1]
            document.getElementById(idName2).textContent = score;
        }
        localStorage.setItem("leaderboard", leaderboard);
}

// Timer method
    // hanldes timer - while true game is playing
    function countdown () {
        let timerInterval = setInterval(function() {
            timer--;
            timeLeft.innerHTML = `${timer} seconds left to play. <br/> ${qLeft} questions remaining`;
    
            if(timer === 0 || isPlaying == false) {
                clearInterval(timerInterval);
                timer = 30;
                if (isPlaying == false) {
                    window.alert(`You finished!\nYou got ${numRight} questions correct!`)

                } else {
                    window.alert("Out of time!")
                }

                isTop();
                show();
                correctDiv.style.display = "none";                
            }
            
        }, 1000);
    }
    // start game
    start_button.addEventListener("click", function() {
        startGame();
        hide();
    })

function hide() {
    timeLeft.innerHTML = `${timer} seconds left to play. <br/> ${qLeft} questions remaining`;
    centDiv.style.display = "none";
    qCard.style.display = "block";
    qCard.style.textAlign= "center";
    qCard.style.alignItems= "center";
    qCard.style.justifyContent= "center";
    scoreboard.style.display = "none";
    howTo.style.display = "none";
    banner.style.display = "none";
    correctDiv.style.display = "block";
    formatClear();
}

function show() {
    timeLeft.innerHTML = "Good Job!<br/>Would you like to play again?";
    qCard.style.display = "none";
    scoreboard.style.display = "block";
    banner.textContent = "";
    banner.style.display = "block";
    start_button.textContent = "Play Again!";
    centDiv.style.display = "block";
    correctDiv.style.display = "none";
}


    
// start button triggers quiz
    function startGame() {
        isPlaying = true;
        numQs = 0;
        qLeft = archiveQs.length;
        numRight = 0;
        qArray = archiveQs;
        ansKey =archiveK;
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
    qLeft = qArray.length-1;
    // display question and answers
    document.getElementById("question").innerHTML = `Question ${numQs}: ${getQuest[0]}`;
    document.getElementById("1").innerHTML = getQuest[1]; 
    document.getElementById("2").innerHTML = getQuest[2];
    document.getElementById("3").innerHTML = getQuest[3];
    document.getElementById("4").innerHTML = getQuest[4];
    //remove question from array - prevent repeats
    qArray.splice(rand,1);
    ansKey.splice(rand,1);
    timeLeft.innerHTML = `${timer} seconds left to play. <br/> ${qLeft} questions remaining`;
}

// checks answer and tabulates # of correct
    function answeredQ(newID)
    {   pickedAnswer = newID;
        if (pickedAnswer == answer) {
            numRight++;
            formatCorrect()
        } else {
            formatWrong()
            timer = timer - 3;
        }
        
        makeQuestion()
    }

    function isTop(){
        let newTop = false;
        for (let i = 0; i < 5; i++) {
            let oldScore = leaderboard[i][1]
            if (numRight>=oldScore) {
                let int = i+1;
                let newInitials = window.prompt(`Congratulations! You are the new ${int} place!\nPlease enter your initials!`)
                leaderboard.splice(i,0,[newInitials,numRight])
                newTop = true;
                break
            }
        }
        if (newTop == true) {
            leaderboard.pop();
            newTop = false;
            makeLeaderboard();
            return;
        } else {
            window.alert(`Unfortunately, you did not make the top five with ${numRight} questions answered correctly.`)
        }
    }

function formatCorrect() {
    correct.textContent = "Correct!"
    correct.style.backgroundColor = "lightgreen";
    correct.style.border = "black solid 1px";
    correct.style.borderRadius = "10px";
    correct.style.color = "black";
    correct.style.padding = "2%";
}

function formatWrong() {
    correct.innerHTML = "Wrong 😓<br/>-3 seconds"
    correct.style.backgroundColor = "lightcoral";
    correct.style.border = "black solid 1px";
    correct.style.borderRadius = "10px";
    correct.style.color = "black";
    correct.style.padding = "0.58%";
}

function formatClear() {
    correct.textContent = "See if you got the question right here!"
    correct.style.backgroundColor = "beige";
    correct.style.border = "black solid 1px";
    correct.style.borderRadius = "10px";
    correct.style.color = "black";
    correct.style.padding = "2%";
}