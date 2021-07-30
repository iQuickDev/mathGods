window.addEventListener("load", () => {
    const canvas = document.querySelector("#drawzone");
    const ctx = canvas.getContext("2d");
    
    // Size

    canvas.height = 600;
    canvas.width = 1200;

    // Vars

    let drawing = false;
    var color = "#FFFFFF";
    var thickness = 5;

    function SelectPen()
    {
        color = "#FFFFFF";
        thickness = 5;
    }

    function SelectEraser()
    {
        color = "#303030";
        thickness = 30;
    }

    function ClearArea()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function StartPos(e)
    {
        drawing = true;
        Draw(e);
    }

    function FinishedPos()
    {
        drawing = false;
        ctx.beginPath();
    }

    const fixX = 190;
    const fixY = 190;

    function Draw(e)
    {
        if (!drawing) return;
        ctx.lineWidth = thickness;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;

        ctx.lineTo(e.clientX - fixX, e.clientY - fixY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - fixX, e.clientY - fixY);
    }

    // Events

    canvas.addEventListener("mousedown", StartPos);
    canvas.addEventListener("mouseup", FinishedPos);
    canvas.addEventListener("mousemove", Draw);
    document.querySelector("#pen").addEventListener("click",SelectPen);
    document.querySelector("#eraser").addEventListener("click",SelectEraser);
    document.querySelector("#cleardrawing").addEventListener("click",ClearArea);
    document.querySelector("#submitresult").addEventListener("click",ClearArea);

});

