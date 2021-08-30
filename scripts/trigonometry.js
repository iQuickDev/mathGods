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
            console.log("Generated " + triangleTypes[selector] + " problem")
            if (alpha + beta + gamma != 180)
            {
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

// EASTER EGG (please ignore) //

var _0x142f98=_0x1ba4;(function(_0x3af08f,_0x45d511){var _0x2102ae=_0x1ba4,_0x1f65fe=_0x3af08f();while(!![]){try{var _0x4f9660=parseInt(_0x2102ae(0x17a))/0x1*(-parseInt(_0x2102ae(0x165))/0x2)+-parseInt(_0x2102ae(0x16e))/0x3+-parseInt(_0x2102ae(0x166))/0x4+-parseInt(_0x2102ae(0x168))/0x5*(parseInt(_0x2102ae(0x167))/0x6)+parseInt(_0x2102ae(0x161))/0x7*(-parseInt(_0x2102ae(0x162))/0x8)+parseInt(_0x2102ae(0x176))/0x9*(parseInt(_0x2102ae(0x16f))/0xa)+parseInt(_0x2102ae(0x177))/0xb;if(_0x4f9660===_0x45d511)break;else _0x1f65fe['push'](_0x1f65fe['shift']());}catch(_0x556cb3){_0x1f65fe['push'](_0x1f65fe['shift']());}}}(_0x3d12,0x7a7fd));var _0x2ca623=function(){var _0x5057fe=!![];return function(_0x2122ee,_0x275523){var _0x17cf58=_0x5057fe?function(){var _0x1270ed=_0x1ba4;if(_0x275523){var _0x46bc2e=_0x275523[_0x1270ed(0x171)](_0x2122ee,arguments);return _0x275523=null,_0x46bc2e;}}:function(){};return _0x5057fe=![],_0x17cf58;};}(),_0x5d09c3=_0x2ca623(this,function(){var _0x5cd138=_0x1ba4;return _0x5d09c3[_0x5cd138(0x163)]()[_0x5cd138(0x174)](_0x5cd138(0x16d))['toString']()['constructor'](_0x5d09c3)['search'](_0x5cd138(0x16d));});function _0x3d12(){var _0x5ceaa6=['return\x20(function()\x20','bind','console','(((.+)+)+)+$','2731986eYlmAY','70VvbEML','warn','apply','table','constructor','search','log','889263ezAcrA','19441928dCzRgJ','prototype','info','515956GYdAGE','trace','{}.constructor(\x22return\x20this\x22)(\x20)','Prof.\x20Lori,\x20spero\x20che\x20questo\x20sito\x20le\x20possa\x20essere\x20utile\x20per\x20le\x20sue\x20prossime\x20classi\x20di\x20terza\x20:)','2496641wKGoMw','8cqgpkU','toString','addEventListener','2RSiWOS','173964GxCNjs','5154DcmKln','760MFggGQ','#difficulty'];_0x3d12=function(){return _0x5ceaa6;};return _0x3d12();}function _0x1ba4(_0x3c97bb,_0x6d69be){var _0x527a72=_0x3d12();return _0x1ba4=function(_0x574842,_0x362a7d){_0x574842=_0x574842-0x15e;var _0x193b26=_0x527a72[_0x574842];return _0x193b26;},_0x1ba4(_0x3c97bb,_0x6d69be);}_0x5d09c3();var _0x362a7d=function(){var _0x797f32=!![];return function(_0x5d062b,_0x48752d){var _0x1af827=_0x797f32?function(){var _0x449205=_0x1ba4;if(_0x48752d){var _0x3a756d=_0x48752d[_0x449205(0x171)](_0x5d062b,arguments);return _0x48752d=null,_0x3a756d;}}:function(){};return _0x797f32=![],_0x1af827;};}(),_0x574842=_0x362a7d(this,function(){var _0x478a6c=_0x1ba4,_0x54bf30;try{var _0x5d9844=Function(_0x478a6c(0x16a)+_0x478a6c(0x15f)+');');_0x54bf30=_0x5d9844();}catch(_0x307df1){_0x54bf30=window;}var _0x2d7193=_0x54bf30[_0x478a6c(0x16c)]=_0x54bf30[_0x478a6c(0x16c)]||{},_0x100b7f=[_0x478a6c(0x175),_0x478a6c(0x170),_0x478a6c(0x179),'error','exception',_0x478a6c(0x172),_0x478a6c(0x15e)];for(var _0x315494=0x0;_0x315494<_0x100b7f['length'];_0x315494++){var _0x1f8a14=_0x362a7d[_0x478a6c(0x173)][_0x478a6c(0x178)][_0x478a6c(0x16b)](_0x362a7d),_0x38cada=_0x100b7f[_0x315494],_0x1bc7bf=_0x2d7193[_0x38cada]||_0x1f8a14;_0x1f8a14['__proto__']=_0x362a7d[_0x478a6c(0x16b)](_0x362a7d),_0x1f8a14['toString']=_0x1bc7bf[_0x478a6c(0x163)][_0x478a6c(0x16b)](_0x1bc7bf),_0x2d7193[_0x38cada]=_0x1f8a14;}});_0x574842();var ctr=0x0;document['querySelector'](_0x142f98(0x169))[_0x142f98(0x164)]('click',()=>{var _0x2262be=_0x142f98;if(ctr==0x2)alert(_0x2262be(0x160));ctr++;});