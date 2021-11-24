let board = document.querySelector('.gameboard');
let choices = document.querySelectorAll('.subchoice');



const gameboard = (() => {
    const gameboardArray = ['', '', '','','','','','',''];
    const playerChoice = '';
    const AIChoice = '';
    const gameWinner = '';
    const gameStatus = '';
    const gameMode = '';
    const playerTurn = '';
    const difficulty = '';
    const minimaxWinner = '';
    const tempGameWinner = '';
    return {gameboardArray, playerChoice, gameWinner, AIChoice, gameWinner, gameStatus, gameMode, playerTurn, difficulty};
})();


function makeBoard() {
    const gameboardArray = gameboard.gameboardArray;
    
    for (let index = 0; index < gameboardArray.length; index ++) {
       let box = document.createElement('div');
       box.textContent = gameboardArray[index];
       board.appendChild(box);
       box.classList.add('box');
       box.setAttribute('id',[index]);
    }

}

function fillBoard() {

    let boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.addEventListener('click', ()=> {
            
            if (box.textContent !== '') {
                return;
                
            }
            else if (gameboard.gameWinner !== '') {
                return;
            }
            else {
                if (gameboard.playerChoice !== '') {
                        gameboard.gameStatus = 'in Progress';
                        box.textContent = gameboard.playerChoice;
                        let index = box.id;
                        gameboard.gameboardArray[index] = gameboard.playerChoice;
                        gameboard.playerTurn = 'AI';
                        checkResult(gameboard.gameboardArray);
                        displayFruit();
                        AITurn();
                 
                    
                
                }
            }
            
            console.log(gameboard.gameboardArray);
           
            
        });
    });
}
function chooseSide() {
    choices.forEach((choice) => {
        choice.addEventListener('click', ()=> {
            if (gameboard.gameStatus === 'in Progress' || gameboard.playerChoice !== '') {
                return;
            }
            else {
                gameboard.playerChoice = choice.firstElementChild.textContent;
               
                choice.classList.add('chosen');
                assignChoice();
                getDifficulty();
                if (gameboard.difficulty === 'Pepega') {
                    
                    easyAi();
                }
                else if (gameboard.difficulty === '5head') {
                    initiateSmartAI();
                }
            }
            
    
        });
    });
}


function gameLogic() {
    board.addEventListener('click', checkResult(gameboard.gameboardArray));
}



function playGame() {
    makeBoard();
    
    chooseSide();
    reset();
    
    
}


function checkConnect3(arrayList) {
    let answerArray = [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6]];
    
    for (triplet = 0; triplet < answerArray.length; triplet++) {
       if (arrayList[answerArray[triplet][0]] == arrayList[answerArray[triplet][1]] &&
       arrayList[answerArray[triplet][0]] == arrayList[answerArray[triplet][2]]) {
        
           if (arrayList[answerArray[triplet][0]] === 'X') {
                gameboard.gameWinner = 'X';
                if(gameboard.difficulty ==='Pepega') {
                    alert('X is winner');
                    gameboard.gameStatus = 'game over';
                    reset();
                }  
                return gameboard.gameWinner;
           }
           else if (arrayList[answerArray[triplet][0]] ==='O'){
                gameboard.gameWinner = 'O';
                if (gameboard.difficulty === 'Pepega') {
                    alert('O is winner');
                    reset();
                    gameboard.gameStatus = 'game over';
                }    
               return gameboard.gameWinner;
               
           }
           
        
        }
      
       
    }
    return gameboard.gameWinner;
    
       
   
}



function checkResult(arrayList) {
    displayFruit();
    let checkEmpty = gameboard.gameboardArray.includes('');
    if (gameboard.gameWinner != '') {
        return;
    
    }
    else {
        checkConnect3(arrayList);
        
    }
    
    if (checkEmpty == false && gameboard.gameWinner === '') {
        checkTie(arrayList);
        
    }
    return gameboard.gameWinner;
}

function reset() {
    
    
    let reset = document.querySelector('.reset');
    let boxes = document.querySelectorAll('.box');
    let choices = document.querySelectorAll('.subchoice');
    reset.addEventListener('click', ()=> {
        gameboard.gameboardArray = ['', '', '','','','','','',''];
        gameboard.playerChoice = '';
        gameboard.gameWinner = '';
        gameboard.gameStatus = '';
        boxes.forEach((box) => {
            box.textContent = '';
            box.classList.remove('fruitDisplayed');
        });
        reset.classList.add('clicked');
        reset.addEventListener('transitionend', () => {
            reset.classList.remove('clicked');
        });
        choices.forEach((choice) => {
            choice.classList.remove('chosen');
        });
        chooseSide();
        

    
        

    });
}


playGame();


function checkTie(arrayList) {
    let checkEmpty = gameboard.gameboardArray.includes('');
    let answerArray = [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6]];
    
    for (triplet = 0; triplet < answerArray.length; triplet++) {
       if (arrayList[answerArray[triplet][0]] !== arrayList[answerArray[triplet][1]] &&
       arrayList[answerArray[triplet][0]] !== arrayList[answerArray[triplet][2]]) {
            gameboard.gameWinner = 'tie';
            if(gameboard.difficulty === 'Pepega') {
                gameboard.gameStatus = 'game over';
                alert('It\'s a tie!');
            }
            return gameboard.gameWinner;
        }
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}



function easyAi() {
    
    randomAIStart();

    
    if (gameboard.playerTurn === 'human' && gameboard.gameWinner === '') {
        humanTurn();
    }
}

function randomAIStart() {
    let randomInt = getRandomInt(0,10);
    gameboard.gameboardArray[randomInt] = gameboard.AIChoice;
    let box = document.getElementById(randomInt);
    box.textContent = gameboard.AIChoice;
    gameboard.playerTurn = 'human';
    displayFruit()
}



    
function AITurn() {
    if (gameboard.playerTurn === 'AI' && gameboard.difficulty === 'Pepega') {
        let emptyElementIndex = gameboard.gameboardArray.findIndex(findEmptyElement);
        if (emptyElementIndex === -1) {
            return;
        }
        else if (gameboard.gameWinner !== '') {
            return;
        }
        else {
           
            gameboard.gameboardArray[emptyElementIndex] = gameboard.AIChoice;
            let box = document.getElementById(emptyElementIndex);
            box.textContent = gameboard.AIChoice;
            displayFruit();
            gameboard.playerTurn = 'human';
            checkResult(gameboard.gameboardArray);
        }
    }
    else if (gameboard.playerTurn === 'AI' && gameboard.difficulty === '5head') {
        smartAI(gameboard.gameboardArray);
    }

}


function findEmptyElement(element) {
    return element === '';
}

function humanTurn() {
    fillBoard();
    displayFruit();
}
    


function assignChoice() {
    if (gameboard.playerChoice !== '') {
        if(gameboard.playerChoice === 'X') {
            gameboard.AIChoice = 'O';
        }
        else {
            gameboard.AIChoice = 'X';
        }
    }
}

function getDifficulty() {
    if (gameboard.playerChoice !== '') {
        let difficulty = document.getElementById('difficulty');
        gameboard.difficulty = difficulty.value;
        
    }
}

function displayFruit() {
    let boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        
        if (box.textContent === 'X' && box.classList.contains('fruitDisplayed') == false) {

            let img = document.createElement('img');
            img.src = 'banana.png'
            img.classList.add('banana');
            if (gameboard.playerChoice === 'X') {
                img.classList.add('playerFruit')
            }
            else {
                img.classList.add('AIfruit')
            }
            box.appendChild(img);
            box.classList.add('fruitDisplayed');
    
               
            
           
        }
        else if (box.textContent === 'O' && box.classList.contains('fruitDisplayed') == false) {
            let img = document.createElement('img');
            img.src = 'grape.png'
            img.classList.add('grape');
            if (gameboard.playerChoice === 'O') {
                img.classList.add('playerFruit')
            }
            else {
                img.classList.add('AIfruit')
            }
            box.appendChild(img);
            box.classList.add('fruitDisplayed');
        }
    });
}

function countEmpty(arrayList) {
    let count = arrayList.filter(item => item === '').length;
    
    return count;
}


const minimaxObj = (() => {
    const node = null;
    const nodeScenario = null;
    const depth = null;
    const depthScenario = null;
    const maximizingPlayer = null;
    const maxEval = -Infinity;
    const minEval = +Infinity;
    const bestIndex = null;
    const eval = null;
    return {node, depth, maximizingPlayer, maxEval, minEval};
})();


function initiateSmartAI() { //AI's turn after AI and human made decision. AI always initiate game with random decision.
    randomAIStart();
    fillBoard();
    minimaxObj.node = 0;
    minimaxObj.depth = 7;
    minimaxObj.maximizingPlayer = true; //AI is the maximizing player
}

function minimax(currentBoard, depth, maximizingPlayer) {
    
    let result = smartCheckConnect3(currentBoard);
    if (result !== '') {
        let evaluation = staticEval(currentBoard);
        return evaluation;
    }
    else if (maximizingPlayer) {
        let bestScore = -Infinity;
        for (let index = 0; index < 9; index++) {
            if (currentBoard[index] === '') {
                currentBoard[index] = gameboard.AIChoice;
                minimaxObj.maximizingPlayer = false;
                let score = minimax(currentBoard, depth + 1, false);
                currentBoard[index] = '';
                bestScore = Math.max(score, bestScore);
               
            }
        }
        return bestScore;
    }
    else {
        let bestScore = Infinity;
        for (let index = 0; index < 9; index++) {
            if (currentBoard[index] === '') {
                currentBoard[index] = gameboard.playerChoice;
                
                let score = minimax(currentBoard, depth + 1, true);
                currentBoard[index] = '';
                bestScore = Math.min(score, bestScore);
                
            }
        }
        return bestScore;

    }

}


function staticEval(node) {
    
    let gameWinner = smartCheckConnect3(node);
    let score;
    if (gameWinner === gameboard.AIChoice) {
        score = 1;
        
    }
    else if (gameWinner === gameboard.playerChoice) {
        score = -1;
        
    }
    else if (gameWinner === 'tie') {
        score = 0;
        
    }
    
    return score;

}

function smartAI(currentBoard) {
    let bestMove;
    let Rootdepth = countEmpty(currentBoard);
    for (let index = 0; index < 9; index++) {
        if (currentBoard[index] === '') {
            currentBoard[index] = gameboard.AIChoice;
            let score = minimax(currentBoard, 0, false);
            currentBoard[index] = '';
            let bestScore = -Infinity;
            if (score > bestScore) {
                bestScore = score;
                bestMove = index;
                
                
            }
        
        }
    }
    gameboard.gameboardArray[bestMove] = gameboard.AIChoice;
   
    let box = document.getElementById(bestMove);
    
    
    box.textContent = gameboard.AIChoice;
    
    displayFruit();
    checkResult(gameboard.gameboardArray);
    fillBoard();

}   



function smartCheckConnect3(arrayList) {
    let answerArray = [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6]];
    let gameWinner = null;
    for (triplet = 0; triplet < answerArray.length; triplet++) {
       if (arrayList[answerArray[triplet][0]] == arrayList[answerArray[triplet][1]] &&
       arrayList[answerArray[triplet][0]] == arrayList[answerArray[triplet][2]]) {
        
           if (arrayList[answerArray[triplet][0]] === 'X') {
                gameWinner = 'X';
                
           }
           else if (arrayList[answerArray[triplet][0]] ==='O'){
                gameWinner = 'O';
           }
           else {
                gameWinner = 'tie';

           }
        
        }
      
       
    }
    return gameWinner;
       
   
}






