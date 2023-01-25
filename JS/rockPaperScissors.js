function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}
const gameChoice = {
	Rock: "rock",
	Paper: "paper",
	Scissors: "scissors",
}
const RockPaperScissorsGame = function() {
	choiceArray = [
		gameChoice.Rock,
		gameChoice.Paper,
		gameChoice.Scissors];
	results = {
		Draw: 'draw',
		Human: 'human',
		Machine: 'machine'
	}
	result = results;
	const gameResult = (humanChoice, machineChoice) => {
		if (humanChoice == machineChoice) {
			this.result = this.results.Draw;
		} else {
			switch (humanChoice) {
				case gameChoice.Rock:
					if (machineChoice == gameChoice.Paper) {
						this.result = this.results.Machine;
					} else {
						this.result = this.results.Human;
					}
					break;
				case gameChoice.Paper:
					if (machineChoice == gameChoice.Rock) {
						this.result = this.results.Human;
					} else {
						this.result = this.results.Machine;
					}
					break;
				case gameChoice.Scissors:
					if (machineChoice == gameChoice.Paper) {
						this.result = this.results.Human;
					} else {
						this.result = this.results.Machine;
					}
			}
		}
		return this.result;
	}
	const displayMessage = (result, humanChoice, machineChoice) => {
		const resultParagraph = document.querySelector(".c-resultado_partida");
		switch (result) {
			case this.results.Draw:
				resultParagraph.textContent = "It's a tie!";
				break;
			case this.results.Human:
				resultParagraph.textContent =
					`You win! ${humanChoice} is better than ${machineChoice}`;
				break;
			case this.results.Machine:
				resultParagraph.textContent =
					`You lose! ${machineChoice} is better than ${humanChoice}`;
				break;
		}
	}
	const play = (humanChoice) => {
		const machineChoice = MachinePlayer().getChoice(choiceArray);
		const result = gameResult(humanChoice, machineChoice);
		displayMessage(result, humanChoice, machineChoice);
	}
	return {
		play: play,
	}
}
const HumanPlayer = function() {
	const getChoice = () => {
		let playerChoices = document.querySelectorAll(".playerChoice");
		playerChoices.forEach((choice) => {
			choice.addEventListener('click', () => {
				const playerChoice = choice.dataset.player_choice;
				return RockPaperScissorsGame().play(playerChoice);
			});
		});
	}
	return {
		getChoice: getChoice,
	}
}
const MachinePlayer = function() {
	const getChoice = (choiceArray) => {
		return choiceArray[getRandomIntInclusive(0, 2)];
	}
	return {
		getChoice: getChoice,
	}
}
HumanPlayer().getChoice();