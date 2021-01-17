let canvasBody = document.querySelector(".paintWindow__canvas");
let canvas = canvasBody.getContext("2d");

let color = document.querySelector("#color");
let weight = document.querySelector("#weight");
let options = {
  color: color.value,
  weight: weight.value,
}

window.addEventListener("load", () => {
    let painting = false;
    function startPosition (event) {
        painting = true;
        options.color = color.value;
        options.weight = weight.value;
        draw(event);
    }
    
    function endPosition () {
        painting = false;
        canvas.beginPath();
    }
    
    function getMousePos(canvasBody, event) {
      var rect = canvasBody.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
  }

    function draw (event) {
      if (!painting) {
        return;
      } 

      let pos = getMousePos(canvasBody, event);

      canvas.lineWidth = options.weight;
      canvas.lineCap = "round";
      canvas.strokeStyle = options.color.toString();

      canvas.lineTo(pos.x, pos.y);
      canvas.stroke();
      canvas.beginPath();
      canvas.moveTo(pos.x, pos.y);
    }
    
    canvasBody.addEventListener("mousedown",startPosition);
    canvasBody.addEventListener("mouseup", endPosition);
    canvasBody.addEventListener("mousemove", draw);
}); 

function clearAll () {
    canvas.clearRect(0, 0, canvasBody.width, canvasBody.height);
}
