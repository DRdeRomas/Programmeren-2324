console.log("Who's That Pokémon?")

const pokemonList = [
    "bulbasaur",
    "charmander",
    "squirtle",
    "chikorita",
    "cyndaquil",
    "totodile",
    "treecko",
    "torchic",
    "mudkip",
    "turtwig",
    "chimchar",
    "piplup",
    "snivy",
    "tepig",
    "oshawott"
];

var currentQuestion = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var correctPokemon = null;

function selectRandomPokemon() {
    if (currentQuestion < 5) {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        const selectedPokemon = pokemonList[randomIndex];
        document.getElementById('pokemon-image').src = "img/" + selectedPokemon + ".png";
        document.getElementById('pokemon-audio').src = "audio/" + selectedPokemon + "_cry.mp3";
        correctPokemon = selectedPokemon;
        makeQuestions(selectedPokemon);
    } else {
        endQuiz();
    }
}

function makeQuestions(selectedPokemon) {
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = "";

    const availablePokemon = pokemonList.filter(pokemon => pokemon !== selectedPokemon);
    const shuffledOptions = shuffle([...availablePokemon]);

    const options = shuffledOptions.slice(0, 4);

    options.push(selectedPokemon);

    const shuffledAllOptions = shuffle(options);

    shuffledAllOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => {
            document.getElementById('pokemon-audio').src = "audio/" + option + "_cry.mp3";
            document.getElementById('pokemon-audio').play();
            document.querySelectorAll('#options button').forEach(btn => {
                btn.classList.remove('selected');
            });
            button.classList.add('selected'); 
        };
        optionsContainer.appendChild(button);
    });
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkAnswer() {
    const resultShow = document.getElementById('result');
    const selectedOption = document.querySelector('#options button.selected');
    if (selectedOption) {
        const selectedPokemon = selectedOption.textContent;
        if (selectedPokemon === correctPokemon) {
            resultShow.textContent = "Correct!";
            correctAnswers++;
        } else {
            resultShow.textContent = `Incorrect. The correct answer is ${correctPokemon}.`;
            incorrectAnswers++;
        }
        currentQuestion++;
        document.getElementById('next-btn').style.display = "block";
        document.getElementById('check-btn').style.display = "none";
    } else {
        resultShow.textContent = "Please select an option!";
    }
}

function endQuiz() {
    document.getElementById('result').textContent = `Quiz ended! Your score: ${correctAnswers} / 5`;
    document.getElementById('button-wrapper').style.display = "none";
}

document.getElementById('check-btn').addEventListener('click', checkAnswer);
document.getElementById('next-btn').addEventListener('click', () => {
    document.getElementById('next-btn').style.display = "none";
    document.getElementById('check-btn').style.display = "block";
    selectRandomPokemon();
});

selectRandomPokemon();