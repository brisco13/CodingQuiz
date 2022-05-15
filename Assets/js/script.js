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
   ["What is the HTML DOM?", "Dragging Objects Morosely", "Ding On Miatas", "Don't know", "Document Object Model"],
   ["If you want to get a HTMl by ID you woulld use which of the following:", "document.getElementById('id')", "document.getElementId('id')", "document.getElement('id')", "document.getById('id')"],
   ["If you want to query in JavaScript for all elements of a certain type you would use:", "get.all(selectors)", "document.querySelectorAll(selectors)", "document.grab(selectors)", "*.all(selectors)"],
   ["Which of the following DOES NOT declare a variable in JavaScript?", "let", "const", "this", "var"],
   ["Which of the following is not a valid JavaScript variable name?", "2names", "_first_and_last_names", "FirstAndLast", "None of the above"],
   ["______ tag is an extension to HTML that can enclose any number of JavaScript statements.", "\<SCRIPT\>", "\<BODY\>", "\<HEAD\>", "\<TITLE\>"],
    ["How does JavaScript store dates in a date object?", "The number of seconds since Netscape's public stock offering.", "The number of days since January 1st, 1900", "The number of milliseconds since January 1st, 1970", "None of the above"],
    ["What is the correct JavaScript syntax to write \"Hello World\"?", "System.out.println(\"Hello World\")", "println (\"Hello World\")", "document.write(\"Hello World\")", "response.write(\"Hello World\")"],
    [" Inside which HTML element do we put the JavaScript?", "\<js\>", "\<script\>", "\<scripting\>", "\<javascript\>"],    
    ["In JavaScript, what does the Window.prompt() method return?", "True", "False", "Current Time Stamp", "None of the above"]
];
//some of the questions above were taken from: http://mcqspdfs.blogspot.com/2013/08/60-top-javascript-multiple-choice.html
let archiveK = [4,1,2,3,1,1,3,3,2,4];
let leaderboard = [];
let numQs = 0;
let qLeft = archiveQs.length;
let madeLeaderboard = false;

localStorage.setItem("ArchiveQs", JSON.stringify(archiveQs));

// get/create leaderboard in local storage
function makeLeader() {
    let hasBeenQuizzed = localStorage.getItem("hasQuizzed");
    if (hasBeenQuizzed == true) {
        leaderboard = localStorage.getItem("leaderboard")
    } else {
        localStorage.setItem("hasQuizzed", true);
        leaderboard = [
            ["ABC",0],
            ["DEF",0],
            ["GHI",0],
            ["JKL",0],
            ["MNO",0],
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
        resetQs();
        countdown();
        makeQuestion();
    }

// quiz question generation
function makeQuestion() {
    // check to see if there are any more questions
    if (qArray.length<1) {
        isPlaying = false;
        return;
    }
    // random question from array
    let rand = Math.floor(Math.random()*qArray.length);
    let getQuest = qArray[rand];
    // store answer key
    answer = ansKey[rand];
    // increment number of question asked
    numQs++;
    qLeft = qLeft-1;
    // display question and answers
    document.getElementById("question").innerHTML = `Question ${numQs}: ${getQuest[0]}`;
    document.getElementById("1").textContent = getQuest[1]; 
    document.getElementById("2").textContent = getQuest[2];
    document.getElementById("3").textContent = getQuest[3];
    document.getElementById("4").textContent = getQuest[4];
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
            if (timer<0) {
                timer = 0;
            isPlaying = false;}
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

function resetQs () {
    let newQs = [];
    newQs = JSON.parse(localStorage.getItem("ArchiveQs"))
    qArray = newQs;
    numQs = 0;
    numRight = 0;
    qLeft = qArray.length+1;
    ansKey = archiveK;
    console.log(qArray)
}