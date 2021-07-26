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
    setInterval(UpdateTimer, 1000);
    UpdateTimer();
    GenerateQuestion();
}


var score = 0;
var operands = ["+","-","×","÷"];
var specialoperands = ["ⁿ","√"];
var firstoperand = "";
var secondoperand = ""
var operator = "";
var result = "";
var timeleft = 60;
var answerscount = 0;

function NextQuestion()
{
   if (answerscount == sessionStorage.getItem("questionscount"))
   {
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

function GenerateQuestion()
{
    firstoperand = (Math.floor(Math.random() * 10));
    secondoperand = (Math.floor(Math.random() * 10));
    operator = operands[Math.floor(Math.random() * 4)];

    switch (sessionStorage.getItem("difficulty"))
    {
        case "easy":
        {
            document.querySelector("#question").innerHTML = (firstoperand  + " " + operator + " " + secondoperand).toString();
            break;
        }

        case "medium":
        {
            break;
        }

        case "hard":
        {
            break;
        }
    }
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
        console.log("Score: " + score);
    }

    document.querySelector("#answer").value = "";
    NextQuestion();
}

function EndGame()
{
 // TODO
}

function UpdateTimer()
{
    if (timeleft >= 0)
    {
        document.querySelector("#timeleft").innerHTML = timeleft.toString();
        timeleft--;
    }
    else
    {
        NextQuestion();
    }
}