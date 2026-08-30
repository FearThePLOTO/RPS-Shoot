// RPS Samurai - game logic for first to 5 wins
function getComputerChoice() {
    const rnd = Math.floor(Math.random() * 3);
    return rnd === 1 ? "rock" : rnd === 2 ? "paper" : "scissors";
}

const icons = {
    rock: "石",
    paper: "紙",
    scissors: "刀",
    waiting: "-",
};

let humanScore = 0;
let computerScore = 0;
let round = 1;
let gameOver = false;

const humanScoreEl = document.getElementById("humanScore");
const computerScoreEl = document.getElementById("computerScore");
const resultEl = document.getElementById("result");
const resultTextEl = document.getElementById("resultText");
const playerIconEl = document.getElementById("playerIcon");
const cpuIconEl = document.getElementById("cpuIcon");
const playerChoiceTextEl = document.getElementById("playerChoiceText");
const cpuChoiceTextEl = document.getElementById("cpuChoiceText");
const playerPickEl = document.getElementById("playerPick");
const cpuPickEl = document.getElementById("cpuPick");
const roundNumEl = document.getElementById("roundNum");
const roundHintEl = document.getElementById("roundHint");
const winnerBanner = document.getElementById("winnerBanner");
const winnerTitle = document.getElementById("winnerTitle");
const winnerSub = document.getElementById("winnerSub");
const resetBtn = document.getElementById("resetBtn");
const buttons = document.querySelectorAll(".move-btn");
const resultsDiv = document.getElementById("results");

// Updates scores and round display
function updateScoreboard() {
    humanScoreEl.textContent = humanScore;
    computerScoreEl.textContent = computerScore;
    roundNumEl.textContent = gameOver ? "-" : round;
    resultsDiv.textContent = `Score - You: ${humanScore} | CPU: ${computerScore}`;
}

// Shows chosen weapons and triggers reveal animation
function setChoices(playerChoice, computerChoice) {
    playerIconEl.textContent = icons[playerChoice];
    cpuIconEl.textContent = icons[computerChoice];
    playerChoiceTextEl.textContent = playerChoice;
    cpuChoiceTextEl.textContent = computerChoice;
    playerPickEl.classList.remove("reveal");
    cpuPickEl.classList.remove("reveal");
    void playerPickEl.offsetWidth;
    playerPickEl.classList.add("reveal");
    cpuPickEl.classList.add("reveal");
}

// Displays final winner and locks controls
function announceWinner() {
    gameOver = true;
    buttons.forEach((b) => (b.disabled = true));
    resetBtn.classList.add("show");
    winnerBanner.classList.add("show");
    roundHintEl.textContent = "MATCH OVER";
    if (humanScore >= 5) {
        winnerTitle.textContent = "YOU WIN THE MATCH!";
        winnerSub.textContent = `FINAL ${humanScore} - ${computerScore} • YOU DOMINATED`;
        resultEl.textContent = "YOU TOOK IT 5 POINTS FIRST";
        resultEl.className = "win";
        resultTextEl.textContent = "Clean sweep. The machine couldn't keep up. Hit play again if you want more.";
    } else {
        winnerTitle.textContent = "CPU WINS THE MATCH";
        winnerSub.textContent = `FINAL ${computerScore} - ${humanScore} • MACHINE VICTORY`;
        resultEl.textContent = "COMPUTER TAKES THE MATCH";
        resultEl.className = "lose";
        resultTextEl.textContent = "Don't sweat it - the CPU got lucky. Reset and run it back.";
    }
    const announcement = document.createElement("p");
    announcement.textContent = winnerTitle.textContent + " - " + winnerSub.textContent;
    resultsDiv.appendChild(announcement);
}

// Plays one round and updates scores
function playRound(playerChoice) {
    if (gameOver) return;
    const computerChoice = getComputerChoice();
    setChoices(playerChoice, computerChoice);
    let outcome;
    let message = "";
    let detail = "";
    if (playerChoice === computerChoice) {
        outcome = 0;
        message = "IT'S A TIE";
        detail = `Both threw ${playerChoice} - no points. Go again.`;
        resultEl.className = "tie";
        playerPickEl.classList.add("shake");
        cpuPickEl.classList.add("shake");
        setTimeout(() => {
            playerPickEl.classList.remove("shake");
            cpuPickEl.classList.remove("shake");
        }, 320);
    } else if (
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "rock" && computerChoice === "scissors")
    ) {
        outcome = 1;
        humanScore++;
        message = "YOU WIN THIS ROUND";
        detail = `${playerChoice} beats ${computerChoice} - point for you.`;
        resultEl.className = "win";
    } else {
        outcome = 2;
        computerScore++;
        message = "CPU TAKES THE ROUND";
        detail = `${computerChoice} beats ${playerChoice} - point for CPU.`;
        resultEl.className = "lose";
    }
    resultEl.textContent = message;
    resultTextEl.textContent = detail;
    updateScoreboard();
    const line = document.createElement("div");
    line.textContent = `Round ${round}: you=${playerChoice}, cpu=${computerChoice} → ${message}`;
    resultsDiv.appendChild(line);
    while (resultsDiv.children.length > 7) resultsDiv.removeChild(resultsDiv.firstChild);
    if (humanScore >= 5 || computerScore >= 5) {
        announceWinner();
    } else {
        if (outcome !== 0) round++;
        roundHintEl.textContent = outcome === 0 ? "TIE - REPLAY ROUND" : "NEXT ROUND";
        updateScoreboard();
    }
    return outcome;
}

// Resets game state and UI
function resetGame() {
    humanScore = 0;
    computerScore = 0;
    round = 1;
    gameOver = false;
    buttons.forEach((b) => (b.disabled = false));
    resetBtn.classList.remove("show");
    winnerBanner.classList.remove("show");
    playerIconEl.textContent = icons.waiting;
    cpuIconEl.textContent = icons.waiting;
    playerChoiceTextEl.textContent = "WAITING";
    cpuChoiceTextEl.textContent = "WAITING";
    playerPickEl.classList.remove("reveal", "shake");
    cpuPickEl.classList.remove("reveal", "shake");
    resultEl.textContent = "MAKE YOUR MOVE";
    resultEl.className = "";
    resultTextEl.textContent = "Rock smashes Scissors • Scissors cuts Paper • Paper wraps Rock";
    roundHintEl.textContent = "CHOOSE YOUR WEAPON BELOW";
    resultsDiv.innerHTML = "";
    updateScoreboard();
}

// Weapon button clicks
document.getElementById("rock").addEventListener("click", () => playRound("rock"));
document.getElementById("paper").addEventListener("click", () => playRound("paper"));
document.getElementById("scissors").addEventListener("click", () => playRound("scissors"));
resetBtn.addEventListener("click", resetGame);

// Keyboard support for weapon buttons
buttons.forEach((btn) => {
    btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            playRound(btn.dataset.choice);
        }
    });
});

// Initialize scoreboard
updateScoreboard();
