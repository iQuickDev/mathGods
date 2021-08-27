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
var questionstring = "";

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

    switch (sessionStorage.getItem("difficulty")) {
        case "easy":
            {
                FillQuestion(1, 9);
                break;
            }

        case "medium":
            {
                FillQuestion(10, 99);
                break;
            }

        case "hard":
            {
                FillQuestion(100, 999);
                break;
            }
    }
    document.querySelector("#question").innerHTML = questionstring;
}

function FillQuestion(opMin, opMax)
{
    questionstring = "";
    let isEqualsPresent = false;
    let operands = [];
    let question = [];
    let indexHolder = 0;

    firstoperand = Randomizer(opMin, opMax).toString(); 
    secondoperand = Randomizer(opMin, opMax).toString(); 
    variableoperand = Randomizer(opMin, opMax) + "x"; 

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

    for (let i = 0; i < question.length; i++) {
        questionstring += question[i];
    }
}

function CheckResult()
{  
    var leftSideXTotal = 0;
    var rightSideXTotal = 0; 
    var leftSideIntTotal = 0;
    var rightSideIntTotal = 0;
    var question = questionstring;
    question = question.replace(/\s/g, ''); 
    question = question.replace(/-/gi, "+-"); 
    var questionArray = question.split("=");
    var questionLeftSide = questionArray[0];
    var questionRightSide = questionArray[1];
    var questionLeftSideValues = questionLeftSide.split("+");
    var questionRightSideValues = questionRightSide.split("+");

    for (var i = 0; i < questionLeftSideValues.length; i++)
    {
        var currentValue = questionLeftSideValues[i];
        var currentValueLength = currentValue.length;

        if (currentValue.charAt(currentValueLength - 1) == "x")
        { 
            currentValue = currentValue.split("x");
            leftSideXTotal = Number(leftSideXTotal) + Number(currentValue[0]);
        }
        else
            leftSideIntTotal = Number(leftSideIntTotal) + Number(questionLeftSideValues[i]);
    }

    for (var i = 0; i < questionRightSideValues.length; i++)
    {
        var currentValue = questionRightSideValues[i];
        var currentValueLength = currentValue.length;

        if (currentValue.charAt(currentValueLength - 1) == "x")
        {
            currentValue = currentValue.split("x");
            rightSideXTotal = Number(rightSideXTotal) + Number(currentValue[0]);
        }
        else
            rightSideIntTotal = Number(rightSideIntTotal) + Number(questionRightSideValues[i]);
    }

    var totalXs = (leftSideXTotal - rightSideXTotal)
    var totalIntegers = (rightSideIntTotal - leftSideIntTotal)
    result = (totalIntegers / totalXs)

    if (document.querySelector("#answer").value.includes("/"))
    {
        let rawAnswer = document.querySelector("#answer").value;
        let resolvedAnswer = rawAnswer.split("/");
        resolvedAnswer = (resolvedAnswer[0] / resolvedAnswer[1]);
        document.querySelector("#answer").value = resolvedAnswer;
    }
    if (document.querySelector("#answer").value == result)
    {
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