const boxes = document.getElementById('boxes');
const btn = document.getElementById('btn');
const boxElementsArray = Array.from(boxes.getElementsByClassName('box'));

//Return an array with numbers from 1 to num in a random order
function generateRandomBoxesSequense(num) {
    const arr = [];
    //generate an array
    for (let i = 0; i < num; i++) {
        arr[i] = i;
    }

    //mix the numbers
    for(let i = 0; i < 100; i++) {
        const num1 = Math.floor(Math.random() * num);
        const num2 = Math.floor(Math.random() * num);

        const temp = arr[num1];
        arr[num1] = arr[num2];
        arr[num2] = temp;
    }
    return arr;
}

 //on every mouse click on the box check if now there are two boxes that can switch places
function checkExcangiabilityOnClick() {
    
    //toggle current box availability
    this.classList.toggle('ready');
   
    //check if there was another box ready for exchange
    console.log(boxes);
    const availableForExchange = Array.from(boxes.getElementsByClassName('box')).filter(box => box.classList.contains('ready'));
    if (availableForExchange.length === 2) {
         //remove 'ready' class after exchange
        availableForExchange.forEach(box => box.classList.remove('ready'));
        exchangeBoxes(boxes.children, availableForExchange[0].getAttribute('id'), availableForExchange[1].getAttribute('id'));
        console.log(isPuzzleAssembled(Array.from(boxes.getElementsByClassName('box'))));
        const isAssembled = isPuzzleAssembled(Array.from(boxes.getElementsByClassName('box')));
        

        // if(isAssembled) {
        //     activateAssembleButton();
        // } else {
        //     disactivateAssembleButton();
        // }
        
    } else {
        console.log('Number of boxes ready for exchnage:' + availableForExchange.length);
    }
}


function activateAssembleButton() {
    console.log("Activating button");
    const btn = document.getElementById('btn');
    btn.classList.add('active');
}

function disactivateAssembleButton() {
    console.log("Disactivating button");
    const btn = document.getElementById('btn');
    btn.classList.remove('active');
}

//exchanges the position of two selected boxes
function exchangeBoxes(boxes, box1, box2) {
    console.log(boxes);
    console.log("box1: " + box1);
    console.log("box2: " + box2);


    const item1 = document.getElementById(box1);

    const temp = document.createElement('div');
    temp.classList =  item1.classList;
    temp.setAttribute('id', item1.getAttribute('id'));
    temp.setAttribute('style', item1.getAttribute('style'));
    temp.addEventListener('click', checkExcangiabilityOnClick);

    
    const item2 = document.getElementById(box2);

    console.log(item1);
    console.log(item2);
    console.log(temp);

    item2.replaceWith(temp);
    item1.replaceWith(item2);

}

function isPuzzleAssembled(arr) {
    let result = true;
    console.log('Rsult initial: ' + result);
    console.log(arr);
    arr.forEach((e, index) => {
        console.log('Id: ' + e.getAttribute('id'));
        console.log('Index: ' + index);
        console.log(e.getAttribute('id') == index);
        result &= (e.getAttribute('id') == index);
        console.log(result);
    });
    return result === 1;
}

function createBoxes() {
    for(let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const box = document.createElement('div');
            box.classList.add('box');
            box.setAttribute('id', i * 4 + j);
            box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`;
            boxes.appendChild(box);
        }
    }
    console.log(boxes.children[1]);
}

function createBox(number, imgUrl) {
    //console.log(number);
    let i = Math.floor(number / 4);
    let j = number % 4;
    //console.log(i + ', ' + j);
    const box = document.createElement('div');
            box.classList.add('box');
            box.setAttribute('id', i * 4 + j);
            box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`;
            box.style.backgroundImage = imgUrl;
            //console.log(box);
            boxes.appendChild(box);
}

function createBoxes1(array, imgUrl) {
    console.log(array);
    boxes.classList.add('big');
    Array.from(array).forEach(element => createBox(element, imgUrl));
    Array.from(boxes.getElementsByClassName('box')).forEach(box => box.addEventListener('click', checkExcangiabilityOnClick));
}

function assemblePuzzle() {
    boxes.classList.toggle('big');
}

function loadRandomPicture() {

    //TODO add dynamic img folder fiel search
    const imgUrlsArr = [
        "url('../3d-gif-puzzle/img/express.jpeg')",
         "url('../3d-gif-puzzle/img/express2.jpeg')",
        "url('../3d-gif-puzzle/img/leo.jpeg')",
         "url('../3d-gif-puzzle/img/leo2.jpeg')",
        "url('../3d-gif-puzzle/img/riki.jpeg')",
         "url('../3d-gif-puzzle/img/riki2.jpeg')",
        "url('../3d-gif-puzzle/img/titipo.jpeg')",
         "url('../3d-gif-puzzle/img/lego.jpg')",
         "url('https://media.giphy.com/media/EZqwsBSPlvSda/giphy.gif')"];

    const randomIndex = Math.floor(Math.random() * imgUrlsArr.length);
    console.log(imgUrlsArr.length);
    console.log(imgUrlsArr);
    console.log(randomIndex);
    console.log(imgUrlsArr[randomIndex]);
    return imgUrlsArr[randomIndex];
}

function resetAndLoadNewPuzzle() {
    //hide back Magic assemble button
    //disactivateAssembleButton();
    //clears previously generated tiles
    boxes.innerHTML = '';
    //generate new random array of boxes
    createBoxes1(generateRandomBoxesSequense(16), loadRandomPicture());
}

function initMagicButton() {
    const btn = document.getElementById('btn');
    btn.addEventListener('click', assemblePuzzle);
}

function initNextButton() {
    const nextBtn = document.getElementById('next');
    nextBtn.addEventListener('click', resetAndLoadNewPuzzle);
}

function initSmallPicture(picture) {
    const imageDiv = document.querySelector('.img-container-small');
    console.log(picture);
    imageDiv.style.backgroundImage = picture;
    imageDiv.style.backgroundSize = 'contain'; 
    imageDiv.style.backgroundRepeat = 'no-repeat'; 
    console.log(imageDiv);
}

//createBoxes();
initMagicButton();
initNextButton();
activateAssembleButton();
const starterPicture = loadRandomPicture();
initSmallPicture(starterPicture);
createBoxes1(generateRandomBoxesSequense(16), starterPicture);
