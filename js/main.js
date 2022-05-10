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
    dice14: "HIMNUQu",
    dice15: "HLNNRZ"
};

let boardOrder = {}; //object that stores randomize dice location
let finalBoard = []; //array for final board letters
let dictionary = []; //array to store dictionary

//calls board upon load of html to generate boggle board
boardGenerator();

//executes board generation
function boardGenerator(){
    //calls shuffle functions
    boardOrder = shuffleDices(diceList);
    finalBoard = shuffleDie(boardOrder);

    //output letters to html
    document.getElementById("boggleBoard").innerHTML = `
        <div class="row" id="row0">
            <div class="col p-0">
                <button class="btn btn-outline-dark letter">${finalBoard[0]}</button>
            </div>
            <div class="col p-0">
                <button class="btn btn-outline-dark letter">${finalBoard[1]}</button>
            </div>
            <div class="col p-0">
                <button class="btn btn-outline-dark letter">${finalBoard[2]}</button>
            </div>
            <div class="col p-0">
                <button class="btn btn-outline-dark letter">${finalBoard[3]}</button>
            </div>
        </div>
        <div class="row" id="row1">
            <div class="col p-0">
                <button class="btn btn-outline-dark letter">${finalBoard[4]}</button>
            </div>
            <div class="col p-0">
                <button class="btn btn-outline-dark letter">${finalBoard[5]}</button>
            </div>
            <div class="col p-0">
                <button class="btn btn-outline-dark letter">${finalBoard[6]}</button>
            </div>
            <div class="col p-0">
                <button class="btn btn-outline-dark letter">${finalBoard[7]}</button>
            </div>
        </div>
        <div class="row" id="row2">
            <div class="col p-0">
                <button class="btn btn-outline-dark letter">${finalBoard[8]}</button>
            </div>
            <div class="col p-0">
                <button class="btn btn-outline-dark letter">${finalBoard[9]}</button>
            </div>
            <div class="col p-0">
                <button class="btn btn-outline-dark letter">${finalBoard[10]}</button>
            </div>
            <div class="col p-0">
                <button class="btn btn-outline-dark letter">${finalBoard[11]}</button>
            </div>
        </div>
        <div class="row" id="row3">
            <div class="col p-0">
                <button class="btn btn-outline-dark letter">${finalBoard[12]}</button>
            </div>
            <div class="col p-0">
                <button class="btn btn-outline-dark letter">${finalBoard[13]}</button>
            </div>
            <div class="col p-0">
                <button class="btn btn-outline-dark letter">${finalBoard[14]}</button>
            </div>
            <div class="col p-0">
                <button class="btn btn-outline-dark letter">${finalBoard[15]}</button>
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
            array[k] = "Qu";
        }
        else{
            //stores first letter into a new array
            array[k] = str[0];
        }
    }
    return array;
}

//dom that executes when user clicks on the reset button
document.getElementById("reset").onclick = function(){reset()};

//resets the game
function reset(){
    boardOrder = {};
    finalBoard = [];

    //regenerates board
    boardGenerator();
}

//reads the text file
fetch('dict.txt')
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
    word = word.toUpperCase();
    //pulls the dictionary from local storage
    dictionary = JSON.parse(localStorage.getItem("dict"));
    //loops through the dictionary
    for(let i = 0; i < dictionary.length; i++){
        //checks to see if word is in dictionary
        if(word == dictionary[i]){
            return true;
        }
    }
    //if word is not in dictionary returns false
    return false;
}

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

console.log(wordScore("QUIZZES"));