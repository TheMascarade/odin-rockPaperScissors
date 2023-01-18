function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
class RockPaperScissorsGame{
	constructor() {
		this.humanPlayer = new HumanPlayer;
		this.machinePlayer = new MachinePlayer;
	}
	choice = {
		Rock:Symbol("rock"),
		Paper:Symbol("paper"),
		Scissors:Symbol("scissors"),
	}
	choiceArray = [this.choice.Rock,
		this.choice.Paper, 
		this.choice.Scissors];
	results = {
		Draw:Symbol('draw'),
		Human:Symbol('human'),
		Machine:Symbol('machine')
	}
	result
	gameResult(humanChoice, machineChoice) {
		if (humanChoice == machineChoice) {
			this.result = this.results.Draw;
		} else {
			switch (humanChoice) {
				case this.choice.Rock:
					if (machineChoice == this.choice.Paper) {
						this.result = this.results.Machine;
					} else {
						this.result = this.results.Human;
					}
					break;
				case this.choice.Paper:
					if (machineChoice == this.choice.Rock) {
						this.result = this.results.Human;
					} else {
						this.result = this.results.Machine;
					}
					break;
				case this.choice.Scissors:
					if (machineChoice == this.choice.Paper) {
						this.result = this.results.Human;
					} else {
						this.result = this.results.Machine;
					}
			}
		}
	}
	displayMessage(){
		switch (this.result) {
			case this.results.Draw:
				console.log("Es un empate!");
				break;
			case this.results.Human:
				console.log("Ganaste!");
				break;
			case this.results.Machine:
				console.log("Perdiste!");
				break;
		}
	}
	play() {
		this.gameResult(this.humanPlayer.getChoice(this.choiceArray), this.machinePlayer.getChoice(this.choiceArray));
		this.displayMessage(this.result);
	}
}
class HumanPlayer {
	choice
	getChoice(choiceArray){
		/*this.choice = parseInt.apply(window.prompt(
		`Elija una arma:
			1: Roca
			2: Papel
			3: Tijeras`));*/
		return choiceArray[0];
	}
}
class MachinePlayer {
	choice
	getChoice(choiceArray){
		return choiceArray[getRandomIntInclusive(0,2)];
	}
}
