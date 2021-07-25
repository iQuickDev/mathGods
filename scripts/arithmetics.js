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
    document.querySelector("#opbox").style.animation = "moveoperatorslist 3s linear forwards";
}