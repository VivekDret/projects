
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

// winnging combination
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn //true or false

startGame()

//restart button on click throw start game function
restartButton.addEventListener('click', startGame)

//start game ..initial circle turn is false
function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)   //cell placed x or o is removed from class list
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)   //remove handle click that is stored x or O
    cell.addEventListener('click', handleClick, { once: true }) // then again adding value x or when cell clicked
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

// store targeted cell then current class stores with x or O
function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

  //first place mark....check win then check for drawww...it swapturn ..then show hover
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

//ending game ..checking innertext in line if its x or O else draw and adding show in classlist
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

//draw case ,,destructing array and checking  x or O
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

//placing turns ...adding current class thats o or x in cell class list
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

//swapping turns  ..just negating whats previous
function swapTurns() {
  circleTurn = !circleTurn
}

//setting board hover .. removing previous class then adding it back
function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}


//win fnction
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}
