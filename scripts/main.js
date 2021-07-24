window.addEventListener('load', start);
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
                "EVERYBODY GANGSTA UNTIL YOU SEE <b>∫<b>"                                            // 20

]

function start()
{
    let randomint = Math.floor(Math.random() * 20);
    document.getElementById("subtitlefield").innerHTML = subtitles[randomint];
    ShuffleFormulas();
}

function CenterArithmetics()
{
    document.querySelector("#arithmetics").style.animation = "centerarithmetics 1s ease-in-out forwards";
    document.querySelector("#algebra").style.animation = "slideawayright 1s ease-in-out forwards";
    document.querySelector("#trigonometry").style.animation = "slideawayright 1s ease-in-out forwards";
    document.querySelector("#calculus").style.animation = "slideawayright 1s ease-in-out forwards";
    document.querySelector(".play").style.display = "block";
    document.querySelector(".play").style.animation = "playpanelslideup 1s linear forwards";
}

function CenterAlgebra()
{
    document.querySelector("#arithmetics").style.animation = "slideawayleft 1s ease-in-out forwards";
    document.querySelector("#algebra").style.animation = "centeralgebra 1s ease-in-out forwards";
    document.querySelector("#trigonometry").style.animation = "slideawayright 1s ease-in-out forwards";
    document.querySelector("#calculus").style.animation = "slideawayright 1s ease-in-out forwards";
    document.querySelector(".play").style.display = "block";
    document.querySelector(".play").style.animation = "playpanelslideup 1s linear forwards";
}

function CenterTrigonometry()
{
    document.querySelector("#arithmetics").style.animation = "slideawayleft 1s ease-in-out forwards";
    document.querySelector("#algebra").style.animation = "slideawayleft 1s ease-in-out forwards";
    document.querySelector("#trigonometry").style.animation = "centertrigonometry 1s ease-in-out forwards";
    document.querySelector("#calculus").style.animation = "slideawayright 1s ease-in-out forwards";
    document.querySelector(".play").style.display = "block";
    document.querySelector(".play").style.animation = "playpanelslideup 1s linear forwards";
}

function CenterCalculus()
{
    document.querySelector("#arithmetics").style.animation = "slideawayleft 1s ease-in-out forwards";
    document.querySelector("#algebra").style.animation = "slideawayleft 1s ease-in-out forwards";
    document.querySelector("#trigonometry").style.animation = "slideawayleft 1s ease-in-out forwards";
    document.querySelector("#calculus").style.animation = "centercalculus 1s ease-in-out forwards";
    document.querySelector(".play").style.display = "block";
    document.querySelector(".play").style.animation = "playpanelslideup 1s linear forwards";
}

var formulas = document.getElementsByTagName("cite");
var winWidth = window.innerWidth - 200;
var winHeight = window.innerHeight - 200;

function getRandomNumber(min, max) {
    
    return Math.random() * (max - min) + min;
      
  }

function ShuffleFormulas()
{
    for ( var i=0; i < formulas.length; i++ ) {
 	
        // shortcut! the current div in the list
        var thisDiv = formulas[i];
        
        // get random numbers for each element
        randomTop = getRandomNumber(0, winHeight);
        randomLeft = getRandomNumber(0, winWidth);
        
        // update top and left position
        thisDiv.style.top = randomTop +"px";
        thisDiv.style.left = randomLeft +"px";
        
    }
}