let diceList = {
    dice0: "AAEEGN",
    dice1: "ABBJOO",
    dice2: "ACHOPS",
    dice3: "AFFKPS",
    dice4: "AOOTTW",
    dice5: "CIMOTU",
    dice6: "DEILRX",
    dice7: "DELRVY",
    dice8: "DISTTY",
    dice9: "EEGHNW",
    dice10: "EEINSU",
    dice11: "EHRTVW",
    dice12: "EIOSST",
    dice13: "ELRTTY",
    dice14: "HIMNUQU",
    dice15: "HLNNRZ"
};

let boardOrder = {}; //object that stores randomize dice location
let finalBoard = []; //array for final board letters
let dictionary = []; //array to store dictionary
let holder = []; //array to hold event target info of each button for no repeats
let wordBank = [];//holds all valid words
let scoreTotal = 0;
let myInterval;
let currentRotation = 0; //initialize variable for degrees

//sets default score
document.getElementById("score").innerHTML = "0";

//calls board upon load of html to generate boggle board
boardGenerator();
//calls function that takes in events
buttonEvent();

//executes board generation
function boardGenerator(){
    //calls shuffle functions
    boardOrder = shuffleDices(diceList);
    finalBoard = shuffleDie(boardOrder);

    //output letters to html
    document.getElementById("boggleBoard").innerHTML = `
        <div class="row" id="row0">
            <div class="col p-1 rotatel">
                <button class="btn btn-outline-dark letter" row = "0" col = "0">${finalBoard[0]}</button>
            </div>
            <div class="col p-1 rotatel">
                <button class="btn btn-outline-dark letter" row = "0" col = "1">${finalBoard[1]}</button>
            </div>
            <div class="col p-1 rotatel">
                <button class="btn btn-outline-dark letter" row = "0" col = "2">${finalBoard[2]}</button>
            </div>
            <div class="col p-1 rotatel">
                <button class="btn btn-outline-dark letter" row = "0" col = "3">${finalBoard[3]}</button>
            </div>
        </div>
        <div class="row" id="row1">
            <div class="col p-1 rotatel">
                <button class="btn btn-outline-dark letter" row = "1" col = "0">${finalBoard[4]}</button>
            </div>
            <div class="col p-1 rotatel">
                <button class="btn btn-outline-dark letter" row = "1" col = "1">${finalBoard[5]}</button>
            </div>
            <div class="col p-1 rotatel">
                <button class="btn btn-outline-dark letter" row = "1" col = "2">${finalBoard[6]}</button>
            </div>
            <div class="col p-1 rotatel">
                <button class="btn btn-outline-dark letter" row = "1" col = "3">${finalBoard[7]}</button>
            </div>
        </div>
        <div class="row" id="row2">
            <div class="col p-1 rotatel">
                <button class="btn btn-outline-dark letter" row = "2" col = "0">${finalBoard[8]}</button>
            </div>
            <div class="col p-1 rotatel">
                <button class="btn btn-outline-dark letter" row = "2" col = "1">${finalBoard[9]}</button>
            </div>
            <div class="col p-1 rotatel">
                <button class="btn btn-outline-dark letter" row = "2" col = "2">${finalBoard[10]}</button>
            </div>
            <div class="col p-1 rotatel">
                <button class="btn btn-outline-dark letter" row = "2" col = "3">${finalBoard[11]}</button>
            </div>
        </div>
        <div class="row" id="row3">
            <div class="col p-1 rotatel">
                <button class="btn btn-outline-dark letter" row = "3" col = "0">${finalBoard[12]}</button>
            </div>
            <div class="col p-1 rotatel">
                <button class="btn btn-outline-dark letter" row = "3" col = "1">${finalBoard[13]}</button>
            </div>
            <div class="col p-1 rotatel">
                <button class="btn btn-outline-dark letter" row = "3" col = "2">${finalBoard[14]}</button>
            </div>
            <div class="col p-1 rotatel">
                <button class="btn btn-outline-dark letter" row = "3" col = "3">${finalBoard[15]}</button>
            </div>
        </div>
    `;
}

//shuffles dice location on board
function shuffleDices(list){
    //stores length of object
    let i = Object.keys(list).length;
    let j = 0;
    let temp;

    while(i--){
        //randomly chooses element based on object size
        j = Math.floor(Math.random()*(i+1));

        //swap randomly chosen element with current element
        temp = list["dice" + i];
        list["dice" + i] = list["dice" + j];
        list["dice" + j] = temp;
    }
    return list;
}

//shuffles individual die
function shuffleDie(list){
    let j = 0;
    let temp;
    let array = [];
    let str = [];

    //loops through object
    for(let k = 0; k < Object.keys(list).length; k++){
        //stores the individual string from object as an array
        str = Array.from(list["dice" + k]);
        let i = 6; //number of die faces

        //randomizes array
        while(i--){
            //randomly chooses element based on object size
            j = Math.floor(Math.random()*(i+1));

            //swap randomly chosen element with current element
            temp = str[i];
            str[i] = str[j];
            str[j] = temp;
        }
        
        //checks for Q and changes it to Qu like in boggle
        if(str[0] == "Q"){
            array[k] = "QU";
        }
        else{
            //stores first letter into a new array
            array[k] = str[0];
        }
    }
    return array;
}

//function for mouse events
function buttonEvent(){
    //timer interval for every second runs function
    myInterval = setInterval(myTimer, 1000);
    //selects all buttons
    let buttons = document.querySelectorAll(".letter");

    //loops through buttons and adds event listeners for mousedown and mouseup
    buttons.forEach(button => {
        button.addEventListener("mousedown", function() {mouseDown(button)});
    });
    buttons.forEach(button => {
        button.addEventListener("mouseup", function() {mouseUp(button)});
    });

    //this works like mouseup but in the case of moving outside the boggle box
    document.querySelector(".box").addEventListener("mouseleave", function() {mouseUp()});
    //for the case where user lets go of mouse when in the box but not on a button
    document.querySelector(".box").addEventListener("mouseup", function() {mouseUp()});
}

//function executes when mouse is pressed down
function mouseDown(event){
    //check to see if button is not already in the holder
    if (!holder.includes(event)) {
        holder.push(event);
        event.style.background = "linear-gradient(164deg, rgba(46,80,187,1) 0%, rgba(21,208,196,0.8435749299719888) 46%, rgba(0,206,255,0.6446953781512605) 100%)";
    }

    //selects all buttons
    let buttons = document.querySelectorAll(".letter");
    //loops through buttons and adds even listener
    buttons.forEach(button => {
        //check to not add the event listener to button that has mousedown event
        if(event != button){
            button.addEventListener("mouseenter", mouseDrag, {once: true});
        }
    });
}

//executes when mouse is released
function mouseUp(event){
    //selects all buttons
    let buttons = document.querySelectorAll(".letter");
    //loops through buttons and removes event listener
    buttons.forEach(button => {
        button.removeEventListener("mouseenter", mouseDrag, {once: true});
    });

    let word = '';

    //loops through holder and grabs the letters inside each button and stores it into word
    for (let i = 0; i < holder.length; i++) {
        holder[i].style.background = null;
        word += holder[i].innerHTML;
    }

    let check;

    //check to see if word is at minimum three letters long
    if(word.length > 2){
        //sends word to function that checks word and returns boolean
        check = validWord(word);

        //runs when word is in dictionary
        if(check == true){
            //check to see if word is not already used
            if (!wordBank.includes(word)) {
                //adds word to array
                wordBank.push(word);
                
                document.getElementById("wordBank").innerHTML = "";
                //loops through array
                for(let i = 0; i < wordBank.length; i++){
                    document.getElementById("wordBank").innerHTML += wordBank[i] + " ";
                }

                //adds score to total
                scoreTotal += wordScore(word);
                //display scores
                document.getElementById("score").innerHTML = scoreTotal;
            }
        }
    }

    //resets holder after every mouse up
    holder = [];
}

//function executed when mouse enters new button
function mouseDrag(event){
    //variable that stores position of last button drag/pushed
    let lastRow = holder[holder.length-1].getAttribute("row");
    let lastCol = holder[holder.length-1].getAttribute("col");

    //variable that stores current position
    let currentRow = event.target.getAttribute("row");
    let currentCol = event.target.getAttribute("col");

    //checks last button with new button position
    if(Math.abs(lastRow - currentRow) <= 1){
        if(Math.abs(lastCol - currentCol) <= 1){
            //event.target refers to the event listener that was invoke
            if (!holder.includes(event.target)) {
                holder.push(event.target);
                event.target.style.background = "linear-gradient(164deg, rgba(46,80,187,1) 0%, rgba(21,208,196,0.8435749299719888) 46%, rgba(0,206,255,0.6446953781512605) 100%)";
            }
        }
    }
}

//reads the text file
fetch('../files/dict.txt')
.then(response => response.text()) 
.then(textString => {
    //Split the string into rows
    const rows = textString.split('\r\n');

    //loops through rows and stores the individual words into the dictionary array
    for (let i = 0; i < rows.length; i++) {
        dictionary[i] = rows[i];
    }
    //stores the dictionary array to local storage
    localStorage.setItem("dict",JSON.stringify(dictionary));
});

//function to check if word is valid
function validWord(word){
    //pulls the dictionary from local storage
    dictionary = JSON.parse(localStorage.getItem("dict"));
    //loops through the dictionary
    for(let i = 0; i < dictionary.length; i++){
        //checks to see if word is in dictionary
        if(word == dictionary[i]){
            console.log("test");
            return true;
        }
    }
    //if word is not in dictionary returns false
    return false;
}

//function to determine score for word
function wordScore(word){
    let score = 0;
    //loop through word for individual letter score
    for(let i = 0; i < word.length; i++){
        if(word[i] == "A" || word[i] == "E" || word[i] == "I" || word[i] == "O" || word[i] == "U" || word[i] == "L" || word[i] == "N" || word[i] == "S" || word[i] == "T" || word[i] == "R"){
            score += 1;
        }
        else if (word[i] == "D" || word[i] == "G"){
            score += 2;
        }
        else if (word[i] == "B" || word[i] == "C" || word[i] == "M" || word[i] == "P"){
            score += 3;
        }
        else if (word[i] == "F" || word[i] == "H" || word[i] == "V" || word[i] == "W" || word[i] == "Y"){
            score += 4;
        }
        else if (word[i] == "K"){
            score += 5;
        }
        else if (word[i] == "J" || word[i] == "X"){
            score += 8;
        }
        else if (word[i] == "Q" || word[i] == "Z"){
            score += 10;
        }
    }
    //check for length multiplier score
    if(word.length == 5){
        score *= 2;
    }
    else if(word.length == 6){
        score *= 3;
    }
    else if(word.length == 7){
        score *= 4;
    }
    else if(word.length >= 8){
        score *= 5;
    }

    return score;
}

//creates connection from js to html modal
var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {backdrop: "static"})

//set initial time
let minutes = 3;
let seconds = 0;
document.getElementById("time").innerHTML = minutes + ":" + seconds + seconds;

//function that updates timer
function myTimer() {
  
    //conditions for updating timer
    if(seconds == 0 && minutes > 0) {
        document.getElementById("time").innerHTML = minutes + ":" + seconds + seconds;
        seconds = 59;
        minutes -= 1;
    }
    else if(minutes >= 0 && seconds > 9){
        document.getElementById("time").innerHTML = minutes + ":" + seconds;
        seconds -= 1;
    }
    else if(minutes >= 0 && seconds < 10 && seconds > 0){
        document.getElementById("time").innerHTML = minutes + ":0" + seconds;
        seconds -= 1;
    }
    else if(minutes == 0 && seconds == 0){
        document.getElementById("time").innerHTML = minutes + ":0" + seconds;
        console.log("test")
        myModal.toggle();
        let finalScore = document.getElementById("score").innerHTML;
        document.getElementById("finalScore").innerHTML = finalScore;
        clearInterval(myInterval);
    }
}

//dom that executes when user clicks on rotate button
document.getElementById("rotate").onclick = function(){rotateBoggle()};

//function that rotates boggle board
function rotateBoggle(){
    //increment degrees
    currentRotation += 90;

    //adds class to boggle board
    document.getElementById("boggleBoard").classList.add('rotatesBoggle');
    //rotates boggle board
    document.querySelector("#boggleBoard").style.transform = 'rotate(' + currentRotation + 'deg)';

    //selects all letters
    let letters = document.querySelectorAll(".rotatel");

    //adds rotates class
    for(let i = 0; i < letters.length; i++){
        letters[i].classList.add('rotates');
    }

    //selects all with rotates class
    let letterRotate = document.querySelectorAll(".rotates");

    for(let i = 0; i < letterRotate.length; i++){
        letterRotate[i].style.transform = 'rotate(-' + currentRotation + 'deg)';
    }
}


//dom that executes when user clicks on the reset button
document.getElementById("reset").onclick = function(){reset()};
document.getElementById("reset1").onclick = function(){reset()};
document.getElementById("reset2").onclick = function(){reset()};

//resets the game
function reset(){
    boardOrder = {};
    finalBoard = [];
    wordBank = [];
    scoreTotal = 0;
    minutes = 3;
    seconds = 0;

    //resets rotation and removes transform
    currentRotation = 0;
    document.getElementById("boggleBoard").classList.remove('rotatesBoggle');
    document.querySelector("#boggleBoard").style.transform = "none";

    //selects all letters
    let letters = document.querySelectorAll(".letter");

    //removes rotates class
    for(let i = 0; i < letters.length; i++){
        letters[i].classList.remove('rotates');
        letters[i].style.transform = "none";
    }

    //resets html
    document.getElementById("time").innerHTML = minutes + ":" + seconds + seconds;
    document.getElementById("score").innerHTML = "0";
    document.getElementById("wordBank").innerHTML = "";
    //clears interval
    clearInterval(myInterval);
    //regenerates board
    boardGenerator();
    //resume mouse events
    buttonEvent();
}