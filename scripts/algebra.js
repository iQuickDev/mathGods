var score = 0;
var operators = ["+", "-", "="];
var specialoperands = ["ⁿ", "√"];
var firstoperand = "";
var secondoperand = "";
var variableoperand = "";
var operator = "";
var result = "";
var timeleft = 60;
var answerscount = 0;
var previousmatch = ["", "", "", ""];
var elapsedtime = 0;
var isPlaying = false;

window.addEventListener("load", PageLoad);

function PageLoad() {
    switch (sessionStorage.getItem("difficulty")) {
        case "easy":
            {
                document.querySelector("#difficulty").style.color = "#00FF00";
                break;
            }

        case "medium":
            {
                document.querySelector("#difficulty").style.color = "#FFFF00";
                break;
            }

        case "hard":
            {
                document.querySelector("#difficulty").style.color = "#FF0000";
                break;
            }
    }
    document.querySelector("#difficulty").innerHTML = sessionStorage.getItem("difficulty").toUpperCase();
}


function StartGame() {
    document.querySelector("#desc").style.animation = "descriptionfall 1.5s linear forwards";
    document.querySelector("#startgame").style.animation = "buttonmoveaway 1s linear forwards";
    document.querySelector("#opbox").style.animation = "moveoperatorslist 2s linear forwards";
    document.querySelector("#playground").style.display = "inline-block";
    document.querySelector("#playground").style.animation = "playgroundmoveup 1s linear forwards";
    document.querySelector("#pmatches").style.display = "inline-block";
    document.querySelector("#pmatches").style.animation = "previousmatchesmoveup 2s linear forwards";
    document.querySelector("#questionscount").innerHTML = sessionStorage.getItem("questionscount");
    document.querySelector("#answerscount").innerHTML = answerscount.toString();
    document.querySelector("#score").innerHTML = score;
    setInterval(UpdateTimer, 1000);
    setInterval(ElapsedTime, 1000);
    UpdatePreviousMatch();
    UpdateTimer();
    GenerateQuestion();
    isPlaying = true;
}

function NextQuestion() {
    if (answerscount == sessionStorage.getItem("questionscount")) {
        isPlaying = false;
        EndGame();
    }
    else {
        answerscount++;
        document.querySelector("#answerscount").innerHTML = answerscount;
        timeleft = 60;
        UpdateTimer();
        GenerateQuestion();
    }
}

function ElapsedTime() {
    if (isPlaying)
        elapsedtime++;
    else
        clearInterval(ElapsedTime);
}

function Randomizer(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function delShiftLeft(arr, index) {

    return arr.slice(0, index).concat(arr.slice(index + 1));

}

function GenerateQuestion() {

    let isEqualsPresent = false;
    let operands = [];
    let question = [];
    let indexHolder = 0;

    switch (sessionStorage.getItem("difficulty")) {
        case "easy":
            {
                firstoperand = Randomizer(1, 9).toString(); 
                secondoperand = Randomizer(1, 9).toString(); 
                variableoperand = Randomizer(1, 9).toString() + "x"; 
                operands[0] = firstoperand; 
                operands[1] = secondoperand; 
                operands[2] = variableoperand; 

                indexHolder = Randomizer(0, 2); 
                question[0] = operands[indexHolder].toString(); 
                operands = delShiftLeft(operands, indexHolder);

                indexHolder = Randomizer(0, 2); 
                question[1] = operators[indexHolder];

                if (indexHolder == 2)
                    isEqualsPresent = true;

                indexHolder = Randomizer(0, 1);
                question[2] = operands[indexHolder].toString();
                operands = delShiftLeft(operands, indexHolder);

                if (isEqualsPresent) {
                    indexHolder = Randomizer(0, 1);
                    question[3] = operators[indexHolder].toString();
                }
                else {
                    question[3] = "=";
                    isEqualsPresent = true;
                }

                question[4] = operands[0].toString();

                var questionstring = "";
                for (let i = 0; i < question.length; i++) {
                    questionstring += question[i];
                }
                break;
            }

        case "medium":
            {
                firstoperand = Randomizer(10, 99).toString(); 
                secondoperand = Randomizer(10, 99).toString(); 
                variableoperand = Randomizer(10, 99).toString() + "x"; 
                operands[0] = firstoperand; 
                operands[1] = secondoperand; 
                operands[2] = variableoperand; 

                indexHolder = Randomizer(0, 2); 
                question[0] = operands[indexHolder].toString(); 
                operands = delShiftLeft(operands, indexHolder);

                indexHolder = Randomizer(0, 2); 
                question[1] = operators[indexHolder];

                if (indexHolder == 2)
                    isEqualsPresent = true;

                indexHolder = Randomizer(0, 1);
                question[2] = operands[indexHolder].toString();
                operands = delShiftLeft(operands, indexHolder);

                if (isEqualsPresent) {
                    indexHolder = Randomizer(0, 1);
                    question[3] = operators[indexHolder].toString();
                }
                else {
                    question[3] = "=";
                    isEqualsPresent = true;
                }

                question[4] = operands[0].toString();

                var questionstring = "";
                for (let i = 0; i < question.length; i++) {
                    questionstring += question[i];
                }
                break;
            }

        case "hard":
            {
                firstoperand = Randomizer(100, 999).toString(); 
                secondoperand = Randomizer(100, 999).toString(); 
                variableoperand = Randomizer(100, 999).toString() + "x"; 
                operands[0] = firstoperand; 
                operands[1] = secondoperand; 
                operands[2] = variableoperand; 

                indexHolder = Randomizer(0, 2); 
                question[0] = operands[indexHolder].toString(); 
                operands = delShiftLeft(operands, indexHolder);

                indexHolder = Randomizer(0, 2); 
                question[1] = operators[indexHolder];

                if (indexHolder == 2)
                    isEqualsPresent = true;

                indexHolder = Randomizer(0, 1);
                question[2] = operands[indexHolder].toString();
                operands = delShiftLeft(operands, indexHolder);

                if (isEqualsPresent) {
                    indexHolder = Randomizer(0, 1);
                    question[3] = operators[indexHolder].toString();
                }
                else {
                    question[3] = "=";
                    isEqualsPresent = true;
                }

                question[4] = operands[0].toString();

                var questionstring = "";
                for (let i = 0; i < question.length; i++) {
                    questionstring += question[i];
                }
                break;
            }
    }
    document.querySelector("#question").innerHTML = questionstring;
}

function CheckResult() {
    // calculate the result
    import { simplify } from "math.js";
    result = simplify(questionstring);
    console.log(result);

    // confront the result

    if (document.querySelector("#answer").value == result) {
        score++;
        document.querySelector("#score").innerHTML = score;
    }

    document.querySelector("#answer").value = "";
    NextQuestion();
}

function EndGame() {
    localStorage.setItem("name", sessionStorage.getItem("username"));
    localStorage.setItem("algscore", score);
    localStorage.setItem("algtime", elapsedtime);
    localStorage.setItem("alggamedate", GetMatchDate());
    UpdatePreviousMatch();
    timeleft = 0;
    clearInterval(UpdateTimer);
}

function UpdatePreviousMatch() {
    document.querySelector("#username").innerHTML = localStorage.getItem("name");
    document.querySelector("#pscore").innerHTML = localStorage.getItem("algscore");
    document.querySelector("#ptime").innerHTML = localStorage.getItem("algtime") + "s";
    document.querySelector("#pdate").innerHTML = localStorage.getItem("alggamedate");
}

function GetMatchDate() {
    let dateNow = new Date();
    day = dateNow.getUTCDate();
    month = dateNow.getMonth() + 1;
    year = dateNow.getFullYear();
    return day + "/" + month + "/" + year;
}

function UpdateTimer() {
    if (timeleft >= 0) {
        document.querySelector("#timeleft").innerHTML = timeleft.toString() + "s";
        timeleft--;
        if (timeleft.toString().length < 2)
            timeleft = "0" + timeleft;
    }
    else {
        NextQuestion();
    }
}