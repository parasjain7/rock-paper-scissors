const totalScore = {
    computerScore: 0,
    playerScore: 0
}

// ** getComputerChoice randomly selects between `rock` `paper` `scissors` and returns that string **
function getComputerChoice() {
    const rpsChoice = ['Rock', 'Paper', 'Scissors']
    const randomNumber = Math.floor(Math.random() * 3)
    return rpsChoice[randomNumber]
}

// ** getResult compares playerChoice & computerChoice and returns the score accordingly **
function getResult(playerChoice, computerChoice) {
    // return the result of score based on if you won, drew, or lost
    let score;

    // All situations where human draws, set `score` to 0    
    if (playerChoice == computerChoice) {
        score = 0

    // All situations where human wins, set `score` to 1
    } else if (playerChoice == 'Rock' && computerChoice == 'Scissors') {
        score = 1
    } else if (playerChoice == 'Paper' && computerChoice == 'Rock') {
        score = 1
    } else if (playerChoice == 'Scissors' && computerChoice == 'Paper') {
        score = 1
    // Otherwise human loses (aka set score to -1)
    } else {
        score = -1
    }
    return score
}

// ** showResult updates the DOM to `You Win!` or `You Lose!` or `It's a Draw!` based on the score. Also shows Player Choice vs. Computer Choice**
function showResult(score, playerChoice, computerChoice) {
    const resultDiv = document.getElementById('result')
    const handsDiv = document.getElementById('hands')
    const playerScoreDiv = document.getElementById('player-score')

    if (score == -1) {
        resultDiv.innerText = "You Lose!"
    } else if (score == 0) {
        resultDiv.innerText = "It's a tie!"
    } else {
        resultDiv.innerText = "You Won!"
    }

    handsDiv.innerText = `👱: ${playerChoice}  vs 🤖: ${computerChoice}`
    playerScoreDiv.innerText = totalScore['playerScore']
}

// ** Calculate who won and show it on the screen **
function onClickRPS(playerChoice) {
    console.log({playerChoice})
    const computerChoice = getComputerChoice()
    console.log({computerChoice})
    const score = getResult(playerChoice, computerChoice)
    totalScore['playerScore'] += score
    console.log(totalScore)
    console.log({score})
    showResult(score,playerChoice,computerChoice)
}


// ** Make the RPS buttons actively listen for a click and do something once a click is detected **
function playGame() {
    // use querySelector to select all RPS Buttons
    const rpsButtons = document.querySelectorAll('.rpsButton')

    // * Adds an on click event listener to each RPS button and every time you click it, it calls the onClickRPS function with the RPS button that was last clicked *
    rpsButtons.forEach(rpsButton => {
        rpsButton.onclick = () => onClickRPS(rpsButton.value)
    })

    // Add a click listener to the end game button that runs the endGame() function on click
    const endGameButton = document.getElementById('endGameButton')
    endGameButton.onclick = () => endGame(totalScore)
}

// ** endGame function clears all the text on the DOM **
function endGame(totalScore) {
    totalScore['playerScore'] = 0
    totalScore['computerScore'] = 0

    const resultDiv = document.getElementById('result')
    const handsDiv = document.getElementById('hands')
    const playerScoreDiv = document.getElementById('player-score')

    resultDiv.innerText = ''
    handsDiv.innerText = ''
    playerScoreDiv.innerText = ''
}

playGame()
