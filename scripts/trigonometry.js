var score = 0;
var a = 0;
var b = 0;
var c = 0;
var alpha = 0;
var beta = 0;
var gamma = 0;
var timeleft = 300;
var answerscount = 0;
var elapsedtime = 0;
var isPlaying = false;

var answerSideA = document.querySelector("#answerSideA");
var answerSideB = document.querySelector("#answerSideB");
var answerSideC = document.querySelector("#answerSideC");
var answerAngleAlpha = document.querySelector("#answerAngleAlpha");
var answerAngleBeta = document.querySelector("#answerAngleBeta");
var answerAngleGamma = document.querySelector("#answerAngleGamma");

window.addEventListener("load", PageLoad);

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
       timeleft = 300;
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
    return value * (180 / Math.PI);
}

function ReverseLawOfCosine(side)
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

function ReverseLawOfSine(side)
{
    switch (side)
    {
        case "a":
            return ((b * Math.sin(alpha)) / Math.sin(beta));
        case "b":
            return ((a * Math.sin(beta)) / Math.sin(alpha));
        case "c":
            return ((a * Math.sin(gamma)) / Math.sin(alpha));
    }
}

function delShiftLeft(arr, index)
{
    return arr.slice(0, index).concat(arr.slice(index + 1));
}

function ResetTriangle()
{
    a = 0;
    b = 0;
    c = 0;
    alpha = 0;
    beta = 0;
    gamma = 0;
    answerSideA.value = "";
    answerSideB.value = "";
    answerSideC.value = "";
    answerAngleAlpha.value = "";
    answerAngleBeta.value = "";
    answerAngleGamma.value = "";
    answerSideA.readOnly = false;
    answerSideB.readOnly = false;
    answerSideC.readOnly = false;
    answerAngleAlpha.readOnly = false;
    answerAngleBeta.readOnly = false;
    answerAngleGamma.readOnly = false;
}

function GenerateQuestion()
{
    let triangleTypes = ["SSS", "ASA", "SAS"]
    let selector = Randomizer(0, 2);
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
            GenerateProblem(triangleTypes[selector]);
            console.log("Generated " + triangleTypes[selector] + " problem");
            if (alpha + beta + gamma != 180)
            {
                ResetTriangle();
                GenerateProblem(triangleTypes[selector]);
                console.error("An error has occurred while rounding the values, a new triangle of type " + triangleTypes[selector] +" has been generated");
            }
            break;
        }
    }
    document.querySelector("#question").innerHTML = "Solve the triangle";
}

function GenerateProblem(type)
{
    let index = 0;
    let totalAnglesSum = 180;

    switch (type)
    {
        case "SSS":
            a = Randomizer(20, 25);
            b = Randomizer(13, 17);
            c = Randomizer(13, 19);
            answerSideA.readOnly = true;
            answerSideB.readOnly = true;
            answerSideC.readOnly = true;
            answerSideA.value = a;
            answerSideB.value = b;
            answerSideC.value = c;
            alpha = Math.round(toDegrees(Math.acos(ReverseLawOfCosine("a"))));
            beta = Math.round(toDegrees(Math.acos(ReverseLawOfCosine("b"))));
            gamma = Math.round(toDegrees(Math.acos(ReverseLawOfCosine("c"))));
            break;

        case "ASA":
            index = Randomizer(1, 3);
            let angles = ["alpha", "beta", "gamma"];
            let pickedAngles = [];

            switch (index)
            {
                case 1:
                a = Randomizer(20, 25);
                answerSideA.value = a;
                answerSideA.readOnly = true;
                    break;
                case 2:
                b = Randomizer(13, 17);
                answerSideB.value = b;
                answerSideB.readOnly = true;
                    break;
                case 3:
                c = Randomizer(13, 19);
                answerSideC.value = c;
                answerSideC.readOnly = true;
                    break;
            }

            index = Randomizer(0, 2);
            pickedAngles[0] = angles[index];
            angles = delShiftLeft(angles, index);
            index = Randomizer(0, 1);
            pickedAngles[1] = angles[index];
            angles = delShiftLeft(angles, index);

            switch (pickedAngles[0])
            {
                case "alpha":
                    alpha = Randomizer(1, 80);
                    answerAngleAlpha.value = alpha;
                    answerAngleAlpha.readOnly = true;
                        break;
                case "beta":
                    beta = Randomizer(1, 80);
                    answerAngleBeta.value = beta;
                    answerAngleBeta.readOnly = true;
                        break;
                case "gamma":
                    gamma = Randomizer(1, 80);
                    answerAngleGamma.value = gamma;
                    answerAngleGamma.readOnly = true;
                        break;
            }

            switch (pickedAngles[1])
            {
                case "alpha":
                    alpha = Randomizer(1, 80);
                    answerAngleAlpha.value = alpha;
                    answerAngleAlpha.readOnly = true;
                        break;
                case "beta":
                    beta = Randomizer(1, 80);
                    answerAngleBeta.value = beta;
                    answerAngleBeta.readOnly = true;
                        break;
                case "gamma":
                    gamma = Randomizer(1, 80);
                    answerAngleGamma.value = gamma;
                    answerAngleGamma.readOnly = true;
                        break;
            }

            switch (angles[0])
            {
                case "alpha":
                    alpha = totalAnglesSum - beta - gamma;
                    break;
                case "beta":
                    beta = totalAnglesSum - alpha - gamma;
                    break;
                case "gamma":
                    gamma = totalAnglesSum - alpha - beta;
                    break;
            }

            if (a == 0 && b == 0)
            {
                a = Math.round(((c * Math.sin(alpha * (Math.PI / 180))) / Math.sin(gamma * (Math.PI / 180))));
                b = Math.round(((c * Math.sin(beta * (Math.PI / 180))) / Math.sin(gamma * (Math.PI / 180))));
            }
            if (a == 0 && c == 0)
            {
                a = Math.round(((b * Math.sin(alpha * (Math.PI / 180))) / Math.sin(beta * (Math.PI / 180))));
                c = Math.round(((b * Math.sin(gamma * (Math.PI / 180))) / Math.sin(beta * (Math.PI / 180))));
            }
            if (b == 0 && c == 0)
            {
                b = Math.round(((a * Math.sin(beta * (Math.PI / 180))) / Math.sin(alpha * (Math.PI / 180))));
                c = Math.round(((a * Math.sin(gamma * (Math.PI / 180))) / Math.sin(alpha * (Math.PI / 180))));
            }
            break;
                
        case "SAS":
            let sides = ["a", "b", "c"];
            let pickedSides = [];
            index = Randomizer(1, 3);

            switch (index)
            {
                case 1:
                alpha = Randomizer(1, 80);
                answerAngleAlpha.value = alpha;
                answerAngleAlpha.readOnly = true;
                    break;
                case 2:
                beta = Randomizer(1, 80);
                answerAngleBeta.value = beta;
                answerAngleBeta.readOnly = true;
                    break;
                case 3:
                gamma = Randomizer(1, 80);
                answerAngleGamma.value = gamma;
                answerAngleGamma.readOnly = true;
                    break;
            }
            
            index = Randomizer(0, 2);
            pickedSides[0] = sides[index];
            sides = delShiftLeft(sides, index);
            index = Randomizer(0, 1);
            pickedSides[1] = sides[index];

            switch (pickedSides[0])
            {
                case "a":
                a = Randomizer(20, 25);
                answerSideA.value = a;
                answerSideA.readOnly = true;
                    break;
                case "b":
                b = Randomizer(13, 17);
                answerSideB.value = b;
                answerSideB.readOnly = true;
                    break;
                case "c":
                c = Randomizer(13, 19);
                answerSideC.value = c;
                answerSideC.readOnly = true;
                    break;
            }

            switch (pickedSides[1])
            {
                case "a":
                a = Randomizer(20, 25);
                answerSideA.value = a;
                answerSideA.readOnly = true;
                    break;
                case "b":
                b = Randomizer(13, 17);
                answerSideB.value = b;
                answerSideB.readOnly = true;
                    break;
                case "c":
                c = Randomizer(13, 19);
                answerSideC.value = c;
                answerSideC.readOnly = true;
                    break;
            }

            if (a != 0 && b != 0 && alpha != 0)
            {
                beta = Math.round(Math.asin(b * Math.sin(alpha) / a));
                gamma = totalAnglesSum - alpha - beta;
                c = Math.round((a * Math.sin(gamma) / Math.sin(alpha)));
            }

            if (a != 0 && b != 0 && beta != 0)
            {
                alpha = Math.round(Math.asin(a * Math.sin(beta) / b));
                gamma = totalAnglesSum - alpha - beta;
                c = Math.round(b * Math.sin(gamma) / Math.sin(beta));
            }

            if (a != 0 && b != 0 && gamma != 0)
            {
                c = Math.round(Math.sqrt((Math.pow(a, 2) + Math.pow (b, 2) - 2 * a * b * Math.cos(gamma))));
                alpha = Math.round(Math.asin(a * Math.sin(gamma) / c));
                beta = totalAnglesSum - alpha - gamma;
            }

            if (a != 0 && c != 0 && alpha != 0)
            {
                gamma = Math.round(Math.asin(c * Math.sin(alpha) / a));
                beta = totalAnglesSum - alpha - gamma;
                b = Math.round((a * Math.sin(beta) / Math.sin(alpha)));
            }

            if (a != 0 && c != 0 && beta != 0)
            {
                b = Math.round(Math.sqrt((Math.pow(a, 2) + Math.pow(c, 2) - 2 * a * c * Math.cos(beta))));
                alpha = Math.round(Math.asin(a * Math.sin(beta) / b));
                gamma = totalAnglesSum - alpha - beta
            }

            if (a != 0 && c != 0 && gamma != 0)
            {
                alpha = Math.round(Math.asin(a * Math.sin(gamma) / c));
                beta = totalAnglesSum - alpha - gamma;
                b = Math.round(Math.sqrt((Math.pow(a, 2) + Math.pow(c, 2) - 2 * a * b * Math.cos(beta))));
            }

            if (b != 0 && c != 0 && alpha != 0)
            {
                a = Math.round(Math.sqrt((Math.pow(b, 2) + Math.pow(c, 2) - 2 * b * c * Math.cos(alpha))));
                beta = Math.round(Math.asin(b * Math.sin(alpha) / alpha));
                gamma = totalAnglesSum - alpha - beta;
            }

            if (b != 0 && c != 0 && beta != 0)
            {
                gamma = Math.round(c * Math.sin(beta) / b);
                alpha = totalAnglesSum - beta - gamma;
                a = Math.round(Math.sqrt((Math.pow(b, 2) + Math.pow(c, 2) - 2 * b * c * Math.cos(alpha))));
            }

            if (b != 0 && c != 0 && gamma != 0)
            {
                beta = Math.round(b * Math.sin(gamma) / c);
                alpha = totalAnglesSum - beta - gamma;
                a = Math.round(Math.sqrt((Math.pow(b, 2) + Math.pow(c, 2) - 2 * b * c * Math.cos(alpha))));
            }

            break;
    }

    console.table([
    ["a", "b", "c", "alpha", "beta", "gamma"],
    [a, b , c, alpha, beta, gamma],
    ["#1", "#2", "180deg"],
    [b + c > a, b - c < a, alpha + beta + gamma == 180]]);
}

function CheckResult()
{   
    if (isPlaying && answerSideA.value == a && answerSideB.value == b && answerSideC.value == c && answerAngleAlpha.value == alpha && answerAngleBeta.value == beta && answerAngleGamma.value == gamma)
    {
        score++;
        document.querySelector("#score").innerHTML = score;
    }
    ResetTriangle();
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
