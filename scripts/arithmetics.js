var score = 0;
var operands = ["+","-","×","÷"];
var specialoperands = ["ⁿ","√"];
var firstoperand = "";
var secondoperand = ""
var operator = "";
var result = "";
var timeleft = 60;
var answerscount = 0;
var previousmatch = ["","","",""];
var elapsedtime = 0;
var isPlaying = false;

window.addEventListener("load",PageLoad);

function PageLoad()
{
    switch (sessionStorage.getItem("difficulty"))
    {
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


function StartGame()
{
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

function NextQuestion()
{
   if (answerscount == sessionStorage.getItem("questionscount"))
   {
       isPlaying = false;
       EndGame();
   }
   else
   {
       answerscount++;
       document.querySelector("#answerscount").innerHTML = answerscount;
       timeleft = 60;
       UpdateTimer();
       GenerateQuestion();
   }
}

function ElapsedTime()
{
    if (isPlaying)
    elapsedtime++;
    else
    clearInterval(ElapsedTime);
}

function Randomizer(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GenerateQuestion()
{
    switch (sessionStorage.getItem("difficulty"))
    {
        case "easy":
        {
            firstoperand = Randomizer(1, 9);
            secondoperand = Randomizer(1, 9);
            operator = operands[Randomizer(0, 3)];
            break;
        }

        case "medium":
        {
            firstoperand = Randomizer(10, 99);
            secondoperand = Randomizer(10, 99);
            operator = operands[Randomizer(0, 3)];
            break;
        }

        case "hard":
        {           
            firstoperand = Randomizer(100, 999);
            secondoperand = Randomizer(100, 999);
            operator = operands[Randomizer(0, 3)];
            break;
        }
    }
    document.querySelector("#question").innerHTML = (firstoperand  + " " + operator + " " + secondoperand).toString();
}

function CheckResult()
{   
    // calculate the result

    switch (operator)
    {
        case "+":
        {
            result = (firstoperand + secondoperand);
            break;
        }

        case "-":
        {
            result = (firstoperand - secondoperand);
            break;
        }

        case "×":
        {
            result = (firstoperand * secondoperand);
            break;
        }

        case "÷":
        {
            result = (firstoperand / secondoperand);
            break;
        }
            
    }

    // confront the result

    if (document.querySelector("#answer").value == result)
    {
        score++;
        document.querySelector("#score").innerHTML = score;
    }

    document.querySelector("#answer").value = "";
    NextQuestion();
}

function EndGame()
{
    localStorage.setItem("name", sessionStorage.getItem("username"));
    localStorage.setItem("aritscore", score);
    localStorage.setItem("arittime", elapsedtime);
    localStorage.setItem("aritgamedate", GetMatchDate());
    UpdatePreviousMatch();
    timeleft = 0;
    clearInterval(UpdateTimer);
}

function UpdatePreviousMatch()
{
    document.querySelector("#username").innerHTML = localStorage.getItem("name");
    document.querySelector("#pscore").innerHTML = localStorage.getItem("aritscore");
    document.querySelector("#ptime").innerHTML = localStorage.getItem("arittime") + "s";
    document.querySelector("#pdate").innerHTML = localStorage.getItem("aritgamedate");
}

function GetMatchDate()
{
    let dateNow = new Date();
    day = dateNow.getUTCDate();
    month = dateNow.getMonth() + 1;
    year = dateNow.getFullYear();
    return day + "/" + month + "/" + year;
}

function UpdateTimer()
{
    if (timeleft >= 0)
    {
        document.querySelector("#timeleft").innerHTML = timeleft.toString() + "s";
        timeleft--;
        if (timeleft.toString().length < 2)
        timeleft = "0" + timeleft;
    }
    else
    {
        NextQuestion();
    }
}