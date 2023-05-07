const gameBoard = document.querySelector('#board');
const turnLabel = document.querySelector('#turnLabel')
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const winningMessage = document.querySelector('[winningMessage]')
const winningMessageSection = document.querySelector('.winning-message-section')
const restartBtn = document.querySelector('#restartBtn')
let player;
const X_PLAYER = 'x';
const O_PLAYER = 'o';

createGameBoard()
function createGameBoard(){
    const boardTiles = " ".repeat(9).split("");
    const tiles = boardTiles.map(tile => {
        return (`<button class="tile"></button>`)
    }).join("")

    gameBoard.innerHTML = tiles;
}

startGame()

restartBtn.addEventListener('click', startGame);

function startGame() {
    allTiles = [...document.querySelectorAll('.tile')];
    allTiles.forEach(tile => {
        tile.classList.remove(O_PLAYER)
        tile.classList.remove(X_PLAYER)
        tile.removeEventListener('click', handleTileClick)

        tile.addEventListener('click', handleTileClick, {once: true})
    })
    winningMessageSection.classList.remove('appear');
}

function handleTileClick(e) {
    const tile = e.target;
    const currentPlayer = player ? O_PLAYER : X_PLAYER
    // 1
    playerLabel(tile, currentPlayer)

    // 2
    if (checkWinPossibility(currentPlayer)){
        endGame(false)
    } else if (checkDrawPossibility()){  // 3
        endGame(true)
    } else{
        // 4
        switchTurns()
        applyHover()
    }
}

function playerLabel(tile, currentPlayer) {
        tile.classList.add(currentPlayer)
}

function switchTurns() {
    player = !player
    turnLabel.innerText = `${player ? "O's" : "X's"} turn`
}

function applyHover() {
    // otherwise it'll continue last games hover to new game
    gameBoard.classList.remove(O_PLAYER);
    gameBoard.classList.remove(X_PLAYER);

    if (player) {
        gameBoard.classList.add(O_PLAYER);
    } 
    else {
        gameBoard.classList.add(X_PLAYER);
    }
}

function checkWinPossibility(player) {
    return(
        winningCombos.some(combo => {
            return (
                combo.every(index => {
                    return (
                        allTiles[index].classList.contains(player)
                    )
                })
            )
        })
    )
}

function checkDrawPossibility() {
    return (
        [...allTiles].every(tile => {
            return (
                tile.classList.contains(X_PLAYER) || tile.classList.contains(O_PLAYER)
            )
        })
    )
}

function endGame(isDraw) {
    if(isDraw) {
        winningMessage.innerText = "Draw";
    } else {
        winningMessage.innerText = `${player ? O_PLAYER.toUpperCase() : X_PLAYER.toUpperCase()} Wins`;
    }
    winningMessageSection.classList.add('appear');
}
