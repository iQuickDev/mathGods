var score = 0;
var a = 0;
var b = 0;
var c = 0;
var alpha = 0;
var beta = 0;
var gamma = 0;
var result = "";
var timeleft = 300;
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
    document.querySelector("#playground").style.animation = "playgroundmoveup .1s linear forwards";
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

function toDegrees(value)
{
    return value * 180 / Math.PI;
}

function LawOfCosine(side)
{
    switch (side)
    {
        case "a":
            return ((Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c));
        case "b":
            return ((Math.pow(a, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * a * c));
        case "c":
            return ((Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b));
    }
}

function GenerateQuestion()
{
    switch (sessionStorage.getItem("difficulty"))
    {
        case "easy":
        {

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
    document.querySelector("#question").innerHTML = "Solve the triangle";
}

function GenerateProblem(type)
{
    switch (type)
    {
        case "SSS":
            a = Randomizer(20, 25);
            b = Randomizer(13, 17);
            c = Randomizer(13, 19);
            alpha = Math.round(toDegrees(Math.acos(LawOfCosine("a"))));
            beta = Math.round(toDegrees(Math.acos(LawOfCosine("b"))));
            gamma = Math.round(toDegrees(Math.acos(LawOfCosine("c"))));
            break;

        case "ASA":
            let angles = ["alpha","beta","gamma"]

            break;

        case "AAS":
                break;
                
        case "SAS":
                break;
    }

    console.table([["a", "b", "c", "alpha", "beta", "gamma"], [a, b , c, alpha, beta, gamma]]);
    console.table([["b + c > a", "b - c < a"], [b + c > a, b - c < a]])
}

function CheckResult()
{   
    // calculate the result



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
    localStorage.setItem("trigname", sessionStorage.getItem("username"));
    localStorage.setItem("trigscore", score);
    localStorage.setItem("trigtime", elapsedtime);
    localStorage.setItem("triggamedate", GetMatchDate());
    UpdatePreviousMatch();
    timeleft = 0;
    clearInterval(UpdateTimer);
}

function UpdatePreviousMatch()
{
    if (localStorage.getItem("trigname") == null || localStorage.getItem("trigscore") == null || localStorage.getItem("trigtime") == null || localStorage.getItem("triggamedate") == null)
    {
        document.querySelector("#username").innerHTML = "&nbsp;";
        document.querySelector("#pscore").innerHTML = "&nbsp;";
        document.querySelector("#ptime").innerHTML = "&nbsp;";
        document.querySelector("#pdate").innerHTML = "&nbsp;";
    }
    else
    {
        document.querySelector("#username").innerHTML = localStorage.getItem("trigname");
        document.querySelector("#pscore").innerHTML = localStorage.getItem("trigscore");
        document.querySelector("#ptime").innerHTML = localStorage.getItem("trigtime") + "s";
        document.querySelector("#pdate").innerHTML = localStorage.getItem("triggamedate");
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