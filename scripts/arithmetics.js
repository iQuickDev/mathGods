var score = 0;
var operands = ["+","-","×","÷"];
var specialoperands = ["ⁿ","√"];
var firstoperand = "";
var secondoperand = ""
var operator = "";
var result = "";
var timeleft = 60;
var answerscount = 0;
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
    // display animations
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
            FillQuestion(1, 9, 2);
            break;
        }

        case "medium":
        {
            FillQuestion(10, 99, 3);
            break;
        }

        case "hard":
        {           
            FillQuestion(100, 999, 3);
            break;
        }
    }
    document.querySelector("#question").innerHTML = (firstoperand  + " " + operator + " " + secondoperand);
}

function FillQuestion(opMin, opMax, allowedOperations)
{
    firstoperand = Randomizer(opMin, opMax);
    secondoperand = Randomizer(opMin, opMax);
    operator = operands[Randomizer(0, allowedOperations)];
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

    // compare the result

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
    localStorage.setItem("aritname", sessionStorage.getItem("username"));
    localStorage.setItem("aritscore", score);
    localStorage.setItem("arittime", elapsedtime);
    localStorage.setItem("aritgamedate", GetMatchDate());
    UpdatePreviousMatch();
    timeleft = 0;
    clearInterval(UpdateTimer);
}

function UpdatePreviousMatch()
{
    if (localStorage.getItem("aritname") == null || localStorage.getItem("aritscore") == null || localStorage.getItem("arittime") == null || localStorage.getItem("aritgamedate") == null)
    {
        document.querySelector("#username").innerHTML = "&nbsp;";
        document.querySelector("#pscore").innerHTML = "&nbsp;";
        document.querySelector("#ptime").innerHTML = "&nbsp;";
        document.querySelector("#pdate").innerHTML = "&nbsp;";
    }
    else
    {
        document.querySelector("#username").innerHTML = localStorage.getItem("aritname");
        document.querySelector("#pscore").innerHTML = localStorage.getItem("aritscore");
        document.querySelector("#ptime").innerHTML = localStorage.getItem("arittime") + "s";
        document.querySelector("#pdate").innerHTML = localStorage.getItem("aritgamedate");
    }
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