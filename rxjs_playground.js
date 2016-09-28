var last_x;
var last_y;

var counter = function() {
    return Rx.Observable.fromEvent(document, "mousemove");
}

function bootstrapCanvas() {
    var canvas = document.getElementById("mainCanvas");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
}

function drawLine(toCoords){
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    ctx.moveTo(last_x, last_y);
    ctx.lineTo(toCoords.x, toCoords.y);
    ctx.stroke();
}

counter().subscribe(function(mouseEvent){
    if (last_x === undefined || last_y === undefined){
        console.log("Don't have start coords, setting to x = " + mouseEvent.clientX + " y = " + mouseEvent.clientY);
        //just store the latest
        last_x = mouseEvent.clientX;
        last_y = mouseEvent.clientY;
    }else{
        drawLine(
            {
                x:mouseEvent.clientX,
                y: mouseEvent.clientY
            });
        last_x = mouseEvent.clientX;
        last_y = mouseEvent.clientY;
    }
});
