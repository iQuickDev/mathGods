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
    document.querySelector("#questionscount").innerHTML = sessionStorage.getItem("questionscount");
    document.querySelector("#answerscount").innerHTML = answerscount.toString();
    UpdateTimer();
}

var answerscount = 0;

function NextQuestion()
{
   if (answerscount != sessionStorage.getItem("questionscount"))
   {
       EndGame();
   }
   else
   {
       GenerateQuestion();
   }
}

var result;
var score;
var operands = ["+","-","×","÷","ⁿ","√"];

function GenerateQuestion()
{
    // TODO
}

function CheckResult()
{
    if (document.querySelector("#answer").value == result)
    {
        score++;
        NextQuestion();
    }
    else
    {
        NextQuestion();
    }
}

function EndGame()
{
 // TODO
}

var timer;
var timeleft = 60;

function UpdateTimer()
{
    if (timeleft >= 0)
    {
        document.querySelector("#timeleft").innerHTML = timeleft.toString();
        timeleft--;
        timer = setTimeout(UpdateTimer, 1000);
    }
    else
    {
        NextQuestion();
    }
}