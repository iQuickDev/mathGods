window.addEventListener('load', Start);
var subtitlestring = document.getElementById("subtitlefield").innerHTML;

var subtitles = 
[

                "Squeeze your Brain.",                                                               // 1
                "One Calculation a day keeps the Teacher away.",                                     // 2
                "Pure mathematics is, in it's way, the poetry of logical Ideas.",                    // 3
                "Don't worry if you suck, I do too.",                                                // 4
                "Brain power: e<sup>i&pi;</sup>",                                                    // 5
                "Just because we can’t find a solution, it doesn’t mean there isn’t one.",           // 6
                "Math is not an opinion, it's purely based on Facts.",                               // 7
                "In mathematics, you don’t understand things. You just get used to them.",           // 8
                "Math is everywhere, even in your pockets.",                                         // 9
                "Two plus Two is Four minus One that's Three, quick Maths.",                         // 10
                "Fibonacci's playground",                                                            // 11
                "Imagine using your fingers to count",                                               // 12
                "Not all facts can be demonstrated",                                                 // 13
                "Did you know that pringles are z = x²/a² - y² / b², x² / a² + y² / b² < 1 ?",       // 14
                "Did you know that when guys pee they form a parable similar to y = -x² + 4x ?",     // 15
                "Always remember that Δ = b² - 4ac",                                                 // 16
                "I only date 160cm > x < +∞cm girls",                                                // 17
                "OMG LOOK AT THAT, 2π NOSCOPE!!!",                                                   // 18
                "Always stay x > -∞",                                                                // 19
                "EVERYBODY GANGSTA UNTIL YOU SEE <b>∫<b>",                                           // 20
                "y = sin(x) do be kinda curvy 😳",                                                   // 21
                "GL & HF, it's free enjoyment :)",                                                   // 22
]

function Start()
{
    let randomint = Math.floor(Math.random() * 20);
    document.getElementById("subtitlefield").innerHTML = subtitles[randomint];
    ShuffleFormulas();
    AnimateFormulas();
}

function CenterArithmetics()
{
    document.querySelector("#arithmetics").style.animation = "centerarithmetics 1s ease-in-out forwards";
    document.querySelector("#algebra").style.animation = "slideawayright 1s ease-in-out forwards";
    document.querySelector("#trigonometry").style.animation = "slideawayright 1s ease-in-out forwards";
    document.querySelector("#calculus").style.animation = "slideawayright 1s ease-in-out forwards";
    document.querySelector(".play").style.display = "block";
    document.querySelector(".play").style.animation = "playpanelslideup 1s linear forwards";
    sessionStorage.setItem("topic", "arithmetics");
}

function CenterAlgebra()
{
    document.querySelector("#arithmetics").style.animation = "slideawayleft 1s ease-in-out forwards";
    document.querySelector("#algebra").style.animation = "centeralgebra 1s ease-in-out forwards";
    document.querySelector("#trigonometry").style.animation = "slideawayright 1s ease-in-out forwards";
    document.querySelector("#calculus").style.animation = "slideawayright 1s ease-in-out forwards";
    document.querySelector(".play").style.display = "block";
    document.querySelector(".play").style.animation = "playpanelslideup 1s linear forwards";
    sessionStorage.setItem("topic", "algebra");
}

function CenterTrigonometry()
{
    document.querySelector("#arithmetics").style.animation = "slideawayleft 1s ease-in-out forwards";
    document.querySelector("#algebra").style.animation = "slideawayleft 1s ease-in-out forwards";
    document.querySelector("#trigonometry").style.animation = "centertrigonometry 1s ease-in-out forwards";
    document.querySelector("#calculus").style.animation = "slideawayright 1s ease-in-out forwards";
    document.querySelector(".play").style.display = "block";
    document.querySelector(".play").style.animation = "playpanelslideup 1s linear forwards";
    sessionStorage.setItem("topic", "trigonometry");
}

function CenterCalculus()
{
    document.querySelector("#arithmetics").style.animation = "slideawayleft 1s ease-in-out forwards";
    document.querySelector("#algebra").style.animation = "slideawayleft 1s ease-in-out forwards";
    document.querySelector("#trigonometry").style.animation = "slideawayleft 1s ease-in-out forwards";
    document.querySelector("#calculus").style.animation = "centercalculus 1s ease-in-out forwards";
    document.querySelector(".play").style.display = "block";
    document.querySelector(".play").style.animation = "playpanelslideup 1s linear forwards";
    sessionStorage.setItem("topic", "calculus");
}

function DiffEasy()
{
    sessionStorage.setItem("difficulty", "easy");
}

function DiffMedium()
{
    sessionStorage.setItem("difficulty", "medium");
}

function DiffHard()
{
    sessionStorage.setItem("difficulty", "hard");
}

function StartGame()
{
    sessionStorage.setItem("username", document.querySelector("#usernamefield").value);
    sessionStorage.setItem("questionscount", document.querySelector("#questionscount").value);
    switch (sessionStorage.getItem("topic"))
    {
        case "arithmetics":
        {
            window.location.href = "pages/arithmetics.html";
            break;
        }

        case "algebra":
        {
            window.location.href = "pages/algebra.html";
            break;
        }

        case "trigonometry":
        {
            window.location.href = "pages/trigonometry.html";
            break;
        }

        case "calculus":
        {
            window.location.href = "pages/calculus.html";
            break;
        }
    }
}

var formulas = document.getElementsByTagName("cite");
var winWidth = window.innerWidth - 200;
var winHeight = window.innerHeight - 200;

function Randomizer(min, max) 
{
    return Math.random() * (max - min) + min;
}

function ShuffleFormulas()
{
    for (var i=0; i < formulas.length; i++)
    {
 	
        // shortcut! the current div in the list
        var thisDiv = formulas[i];
        
        // get random numbers for each element
        randomTop = Randomizer(0, winHeight);
        randomLeft = Randomizer(0, winWidth);
        
        // update top and left position
        thisDiv.style.top = randomTop +"px";
        thisDiv.style.left = randomLeft +"px";
    }
}

$(document).ready(function () {
    animateElement("#formula1");
    animateElement("#formula2");
    animateElement("#formula3");
    animateElement("#formula4");
    animateElement("#formula5");
    animateElement("#formula6");
    animateElement("#formula7");
    animateElement("#formula8");
  });
  
  function makeNewPosition()
  {

    var h = $(window).height() - 50;
    var w = $(window).width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
  
    return [nh, nw];
  }
  
  function animateElement(element)
  {
    var newq = makeNewPosition();
    $(element).animate({ top: newq[0], left: newq[1] }, 1500, function () {
      animateElement(element);
    });
  }
  