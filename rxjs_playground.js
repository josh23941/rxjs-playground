var last_x;
var last_y;
var subscriber;
var mousePosition = Rx.Observable.fromEvent(document, "mousemove");

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

function subscribeMousePosition(){
    return mousePosition.subscribe(function (mouseEvent) {
        if (last_x === undefined || last_y === undefined) {
            //just store the latest
            last_x = mouseEvent.clientX;
            last_y = mouseEvent.clientY;
        } else {
            drawLine(
                {
                    x: mouseEvent.clientX,
                    y: mouseEvent.clientY
                });
            last_x = mouseEvent.clientX;
            last_y = mouseEvent.clientY;
        }
    });
}

function toggleDraw(){
    console.log("Inside toggle draw");
    if(subscriber === undefined || subscriber.isStopped){
        console.log("subscribing to mouse events");
        subscriber = subscribeMousePosition();
    }else{
        console.log("unsubcribing");
        subscriber.unsubscribe();
        last_x = undefined;
        last_y = undefined;
    }
}

document.addEventListener('click', function(){
    console.log("In click listener");
    toggleDraw();
}, true);

