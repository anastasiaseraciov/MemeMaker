let canvasWidth = 500;
let canvasHeight = 500;
let newHeight = 500;
let calcHeight = 500;
let calcWidth = 500;
let canvas = document.getElementById('mycanvas');
let showcase = document.getElementById('showcase');
let input1 = document.getElementById('top-line-text');
let input4 = document.getElementById('bottom-line-text');
input1.disabled = true;
input4.disabled = true;

function textChangeListener(evt) {
    let id = evt.target.id;
    let text = evt.target.value;

    if (id == "top-line-text") {
        window.topLineOne = text;
    } else {
        window.bottomLineTwo = text;
    }

    redrawMeme(window.imageSrc, window.topLineOne, window.bottomLineTwo);
}

function redrawMeme(image, topLineOneText, bottomLineTwoText) {
    // Get Canvas2DContext
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext("2d");
    // Your code here
    // If canvas context is not equal to nothing then draw  a new image with attributed styles
    if (image != null)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.style.display = 'initial';

    // Text attributes
    ctx.font = '30pt Impact';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'white'; 

    //If input fields are equal with some text then add text to the meme
    if (topLineOneText != null) {
        ctx.fillText(topLineOneText, canvas.width / 2, 40);
        ctx.strokeText(topLineOneText, canvas.width / 2, 40);
    }

    if (bottomLineTwoText != null) {
        ctx.fillText(bottomLineTwoText, canvas.width / 2, canvas.height - 20);
        ctx.strokeText(bottomLineTwoText, canvas.width / 2, canvas.height - 20);
    }
}


function handleFileSelect(evt) {
    showcase.style.display = "none";
    input1.disabled = false;
    input4.disabled = false;
    canvasHeight = newHeight;
    let file = evt.target.files[0];


    let reader = new FileReader();
    reader.onload = function (fileObject) {
        let data = fileObject.target.result;

        // Create an image object
        let image = new Image();
        image.onload = function () {

            calcHeight = this.height;
            calcWidth = this.width;

            newHeight = (calcHeight / calcWidth) * 500;
            canvas.height = newHeight;

            window.imageSrc = this;
            redrawMeme(window.imageSrc, null, null);
        };

        // Set image data to background image.
        image.src = data;
        console.log(fileObject.target.result);
    };
    reader.readAsDataURL(file);
}

window.topLineText = "";
window.bottomLineText = "";
input1.oninput = textChangeListener;
input4.oninput = textChangeListener;
document.getElementById('file').addEventListener('change', handleFileSelect, false);

//Fix bug with open file in a new window and possibility to be saved
window.onload = function saveFile() {
        const canvas = document.querySelector('canvas');
        let button = document.getElementById('btn-download');
        button.addEventListener('click', function () {
            window.open(canvas.toDataURL("image/png"), '_blank');
        });
        };