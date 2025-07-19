// Object named 'game' that contains:
// list of choices, who wins, the score, and functions on how to make the game work
const game = {
    choices: ['rock', 'paper', 'scissors'],

    // Objects inside an object
    outcomes: {
        rock: { rock: 'Tie', paper: 'Lose', scissors: 'Win' },
        paper: { rock: 'Win', paper: 'Tie', scissors: 'Lose' },
        scissors: { rock: 'Lose', paper: 'Win', scissors: 'Tie' }
    },

    stats: {
        wins: 0,
        losses: 0,
        ties: 0,
        total: 0
    },

    // Generates the computers choice
    getComputerChoice() {
        const randIndex = Math.floor(Math.random() * this.choices.length);  // RNG: 0, 1, or 2

        // Uses the index(0, 1, or 2) to choose from the choices array on line 4
        return this.choices[randIndex]; // 'this.choices' - look at the choices inside this object (the game object)
    },

    // Uses the outcomes object to determine result
    // Example: user = rock, computer = paper
    // this.outcomes.rock.paper -> 'Lose'
    getResult(user, computer) {
        return this.outcomes[user][computer];
    },

    // Updates stats by incrementing respective counter
    updateStats(result) {
        if (result === 'Win') { this.stats.wins++; }
        else if (result === 'Lose') { this.stats.losses++; }
        else { this.stats.ties++; }

        this.stats.total++;

        // document.getElementById('wins').textContent = this.stats.wins;
        // document.getElementById('losses').textContent = this.stats.losses;
        // document.getElementById('ties').textContent = this.stats.ties;
        // document.getElementById('total').textContent = this.stats.total;
        this.renderStats();
    },

    // Updates 'stats' section on index.html
    // Originally had this in updateStats(result) but made into its own function to use in resetStats()
    renderStats() {
        document.getElementById('wins').textContent = this.stats.wins;
        document.getElementById('losses').textContent = this.stats.losses;
        document.getElementById('ties').textContent = this.stats.ties;
        document.getElementById('total').textContent = this.stats.total;
    },

    // Resets all counters, updates the value onto index.html, sets all result messages to null
    resetStats() {
        this.stats = { wins: 0, losses: 0, ties: 0, total: 0 };
        this.renderStats();
        document.getElementById('user-choice').textContent = '';
        document.getElementById('computer-choice').textContent = '';
        document.getElementById('winner').textContent = '';
    }
    };


    
// Selects my Rock, Paper, and Scissors buttons with the attribute 'data-choice=_'
document.querySelectorAll('button[data-choice]').forEach(button => {
    // For each of these buttons, add a click event listener
    button.addEventListener('click', () => {
        const userChoice = button.dataset.choice;   // 'dataset.choice' pulls from the 'data-choice' attribute on the button on index.html
        const computerChoice = game.getComputerChoice();    // Calls the 'getComputerChoice()' function in the 'game' object
        const result = game.getResult(userChoice, computerChoice);  // Calls the 'getResult(param1, param2)' function in the 'game' object

        // Updates the result messages on index.html using string literals
        document.getElementById('user-choice').textContent = `You chose: ${userChoice}`;
        document.getElementById('computer-choice').textContent = `Computer chose: ${computerChoice}`;
        document.getElementById('winner').textContent = `You ${result}!`;

        // Calls the 'updateStats()' function in the 'game' object
        game.updateStats(result);   // result = 'Win' || 'Tie' || 'Lose'  -> ex. game.updateStats('Win')
    });
});

    // Click event for reset button
    document.getElementById('reset').addEventListener('click', () => {
    game.resetStats();
});