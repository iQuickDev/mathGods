window.addEventListener("load", () => {
    const canvas = document.querySelector("#drawzone");
    const ctx = canvas.getContext("2d");
    
    // Size

    canvas.height = 600;
    canvas.width = 800;

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

    function Draw(e)
    {
        if (!drawing) return;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.strokeStyle = "white";

        ctx.lineTo(e.clientX - 560, e.clientY - 180);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - 560, e.clientY - 180);
    }

    // Events

    canvas.addEventListener("mousedown", StartPos);
    canvas.addEventListener("mouseup", FinishedPos);
    canvas.addEventListener("mousemove", Draw);

});

