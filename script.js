
/**
 * Function that uses MATH.random to generate a num from 1 -> 3 and returns rock, paper, or scissors.
 */
function getComputerChoice(){
    let rnd = Math.floor(Math.random() * 3);
    return rnd == 1 ? "rock" : rnd == 2 ? "paper" : "scissors";
}

/**
 * Function to get the user input and convert it to the capitalized form for uniting the inputs.
 */ 
function getHumanChoice(){
    let userInput
    while(true){
        try {
            userInput = prompt("Enter Your Choice {Rock, Paper, or Scissors}")
            userInput = userInput.toLowerCase();
            if(userInput != "rock" && userInput != "paper" && userInput != "scissors"){
                throw TypeError;
            }
            break;
        } catch (TypeError) {
            alert("Invalid Input! Try Again");
        }
    }
    return userInput;
}
/**
 * Function that plays a rounds of RPC shoot by getting a human and computer choice and saying who won. 
 */
function playRound(playerChoice, computerChoice){
    if(playerChoice == computerChoice){
        alert(`Your choice is '${playerChoice}' and the Computer choice was '${computerChoice}'.
             Its a Tie!`);
        return 0;
    } else if((playerChoice == "paper" && computerChoice == "rock") || (playerChoice == "scissors" && computerChoice == "paper") || (playerChoice == "rock" && computerChoice == "scissors")){
        alert(`Your choice is '${playerChoice}' and the Computer choice was '${computerChoice}'.
             You have won this round!`);
        return 1;
    } else {
        alert(`Your choice is '${playerChoice}' and the Computer choice was '${computerChoice}'.
             The Computer have won this round!`);
        return 2;
    }
}


/**
 * Function that plays 5 rounds of RPC shoot and indicate who is the final winner.
*/
function playGame(turns = 5){
    let humanWins = 0, computerWins = 0;
    while(turns--){
        let plr = getHumanChoice(), comp = getComputerChoice();
        let game = playRound(plr, comp);
        if(game == 1) humanWins++;
        else if(game == 2) computerWins++;
        else turns++;

        alert(`The Score is
            You : ${humanWins}
            Computer : ${computerWins}
            `)
    }
    if(computerWins == humanWins) alert("Its A Tie!");
    else alert(`The Final winner is ${computerWins > humanWins ? "The Computer" : "YOU"}!`)
}


playGame();


