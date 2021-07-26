window.addEventListener("load", () => {
    const canvas = document.querySelector("#drawzone");
    const ctx = canvas.getContext("2d");
    
    // Size

    canvas.height = 600;
    canvas.width = 1200;

    // Vars

    let drawing = false;

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

    const fixX = 178;
    const fixY = 178;

    function Draw(e)
    {
        if (!drawing) return;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.strokeStyle = "white";

        ctx.lineTo(e.clientX - fixX, e.clientY - fixY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - fixX, e.clientY - fixY);
    }

    // Events

    canvas.addEventListener("mousedown", StartPos);
    canvas.addEventListener("mouseup", FinishedPos);
    canvas.addEventListener("mousemove", Draw);

});

