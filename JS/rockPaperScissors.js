function RockPaperScissorsGame() {
	WeaponChoice = {
		Rock: "rock",
		Paper: "paper",
		Scissors: "scissors"
	};
	RoundResult = {
		Tie: "tie",
		Human: "human",
		Machine: "machine"
	};
	MatchResult = {
		Human: 'human',
		Machine: 'machine'
	}
	getWeaponChoice = () => {
		return weaponChoice;
	};
	getRoundResult = (humanChoice, machineChoice) => {
		if (humanChoice == machineChoice) {
			return RoundResult.Tie;
		}
		switch (humanChoice) {
			case WeaponChoice.Rock:
				if (machineChoice == WeaponChoice.Paper) {
					return RoundResult.Machine;
				} else {
					return RoundResult.Human;
				}
			case WeaponChoice.Paper:
				if (machineChoice == WeaponChoice.Scissors) {
					return RoundResult.Machine;
				} else {
					return RoundResult.Human;
				}
			case WeaponChoice.Scissors:
				if (machineChoice == WeaponChoice.Rock) {
					return RoundResult.Machine;
				} else {
					return RoundResult.Human;
				}
		}
	};
	displayRoundResult = (roundResult, humanChoice, machineChoice) => {
		const ResultParagraph = document.querySelector(".c-resultado_partida");
		switch (roundResult) {
			case RoundResult.Tie:
				ResultParagraph.textContent =
					`It's a tie!`;
				break;
			case RoundResult.Human:
				ResultParagraph.textContent =
					`You win! ${humanChoice} beats ${machineChoice}!`
				break;
			case RoundResult.Machine:
				ResultParagraph.textContent =
					`You lose! ${machineChoice} beats ${humanChoice}!`
		}
	}
	displayPlayersScores = () => {
		const HumanScoreElement = document.querySelector(".c-human_score");
		const MachineScoreElement = document.querySelector(".c-machine_score");
		HumanScoreElement.textContent = 
			`${humanPlayer.getRoundScore()}`;
		MachineScoreElement.textContent = 
			`${machinePlayer.getRoundScore()}`;
	}
	updateMatchScores = (roundResult) => {
		switch (roundResult) {
			case RoundResult.Human:
				humanPlayer.updateRoundScore();
				break;
			case RoundResult.Machine:
				machinePlayer.updateRoundScore();
				break;
		}
		let humanScore = humanPlayer.getRoundScore();
		let machineScore = machinePlayer.getRoundScore();
		if (humanScore == 5) {
			displayMatchResult(
				MatchResult.Human, 
				humanScore, 
				machineScore
			);
		} else if (machineScore == 5) {
			displayMatchResult(
				MatchResult.Machine,
				humanScore,
				machineScore
			);
		}
	}
	displayMatchResult = (matchResult, humanScore, machineScore) => {
		humanPlayer.resetRoundScore();
		machinePlayer.resetRoundScore();
		const ResultsDiv = document.querySelector(".c-results");
		const MatchResultNode = document.createElement("h3");
		const MatchResultNodePrev = document.querySelector(".c-match_result");
		MatchResultNode.classList.add("c-match_result");
		switch (matchResult) {
			case MatchResult.Human:
				MatchResultNode.textContent =
					`You win the match ${humanScore} / ${machineScore}`;
				break;
			case MatchResult.Machine:
				MatchResultNode.textContent =
					`You lost the match ${machineScore} / ${humanScore}`
		}
		if (MatchResultNodePrev) {
			ResultsDiv.replaceChild(MatchResultNode,MatchResultNodePrev);
		} else {
			ResultsDiv.appendChild(MatchResultNode);
		}
	}
	playRound = (humanChoice) => {
		const machineChoice = machinePlayer.getChoice(WeaponChoice);
		const roundResult = getRoundResult(humanChoice, machineChoice);
		displayRoundResult(roundResult, humanChoice, machineChoice);
		updateMatchScores(roundResult);
		displayPlayersScores();
	};
	return {
		getWeaponChoice: getWeaponChoice,
		playRound: playRound,
	};
}
function HumanPlayer() {
	let roundScore = 0;
	getChoice = () => {
		const humanChoices = document.querySelectorAll(".playerChoice");
		humanChoices.forEach(choice => {
			choice.addEventListener("click", () => {
				const humanChoice = choice.dataset.player_choice;
				return rpsGame.playRound(humanChoice);
			});
		});
	};
	getRoundScore = () => {
		return roundScore;
	}
	updateRoundScore = () => {
		roundScore += 1;
	}
	resetRoundScore = () => {
		roundScore = 0;
	}
	return {
		getChoice: getChoice,
		updateRoundScore: updateRoundScore,
		getRoundScore: getRoundScore,
		resetRoundScore: resetRoundScore,
	}
}
function MachinePlayer() {
	let roundScore = 0;
	getChoice = (WeaponChoices) => {
		const WeaponKeys = Object.keys(WeaponChoices);
		return WeaponChoices[WeaponKeys[WeaponKeys.length * Math.random() << 0]];
	}
	updateRoundScore = () => {
		roundScore += 1;
	}
	resetRoundScore = () => {
		roundScore = 0;
	}
	getRoundScore = () => {
		return roundScore;
	}
	return {
		getChoice: getChoice,
		updateRoundScore: updateRoundScore,
		getRoundScore: getRoundScore,
		resetRoundScore: resetRoundScore,
	}
}
const rpsGame = new RockPaperScissorsGame;
const humanPlayer = new HumanPlayer;
const machinePlayer = new MachinePlayer;
humanPlayer.getChoice();