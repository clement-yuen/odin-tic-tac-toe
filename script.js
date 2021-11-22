let board = document.querySelector('.gameboard');
let choices = document.querySelectorAll('.subchoice');



const gameboard = (() => {
    const gameboardArray = ['', '', '','','','','','',''];
    const playerChoice = '';
    const gameWinner = '';
    return {gameboardArray, playerChoice, gameWinner};
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
            if (box.textContent !== '' || gameboard.gameWinner !== '') {
                return;
            }
            else {
                box.textContent = gameboard.playerChoice;
                let index = box.id;
                gameboard.gameboardArray[index] = gameboard.playerChoice;
            }
           
            
        });
    });
}


choices.forEach((choice) => {
    choice.addEventListener('click', ()=> {
        gameboard.playerChoice = choice.textContent;

    });
});

function gameLogic() {
    board.addEventListener('click', checkResult);
}



function playGame() {
    makeBoard();
    fillBoard();
    gameLogic();
}

function findEmptyElement(element) {
    return element === "";
}

function checkConnect3(arrayList) {
    let answerArray = [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6]]
   
    for (triplet = 0; triplet < answerArray.length; triplet++) {
       if (arrayList[answerArray[triplet][0]] == arrayList[answerArray[triplet][1]] &&
       arrayList[answerArray[triplet][0]] == arrayList[answerArray[triplet][2]])  {
           if (arrayList[answerArray[triplet][0]] == '') {
               return;
           }
           else if (arrayList[answerArray[triplet][0]] == 'X') {
                alert('X is winner');
                gameboard.gameWinner = 'X';
           }
           else {
               alert('O is winner');
               gameboard.gameWinner = 'Y';
           }
        
       }
       
    }
       
   
}
playGame();


function checkResult() {
    checkConnect3(gameboard.gameboardArray);
    let checkEmpty = gameboard.gameboardArray.includes('');
    if (checkEmpty == true) {
        
    }
    else {
        if (gameboard.gameWinner != '') {
            alert('winner is ' + gameboard.gameWinner);
            
        }
        else {
            checkConnect3();
        }
    }
}