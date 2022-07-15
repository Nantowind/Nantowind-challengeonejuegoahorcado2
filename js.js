var words = ['Carne', 'Martillo', 'Lavadora', 'Sucio', 'Cangrejo', 'Lento', 'Alimentos', 'Delgado', 'Cubo', 'Comida', 'Caracol', 'Abajo', 'Alumno', 'Bonito', 'Cesta', 'Sol', 'Beber', 'Botella', 'Hamburguesa', 'Invierno'];

var words2 = [];
var PalabraFinal;


const wordContainer = document.getElementById("wordContainer");
const startButton = document.getElementById("startButton");
const userLettersElement = document.getElementById("userLetters");
var agregarPalabra = document.getElementById('AddWordList');
var palabraNueva = document.getElementById('palabraNueva')
var resultado = document.getElementById('resultado')
var rendirse = document.getElementById('rendirse')
rendirse.style.display = 'none'

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width = 0;
ctx.canvas.height = 0;




const bodyParts = [
    [4, 2, 1, 1],
    [4, 3, 1, 2],
    [3, 5, 1, 1],
    [5, 5, 1, 1],
    [3, 3, 1, 1],
    [5, 3, 1, 1]
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    userLettersElement.appendChild(letterElement);

}


const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block'
    agregarPalabra.style.display = 'block'
    palabraNueva.style.display = 'block'
    rendirse.style.display = 'none'
}


const correctLetter = letter => {
    const { children } = wordContainer;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }


    }
    if (hits === selectedWord.length) {
        endGame();
        resultado.innerHTML = 'Ganaste  Adivinste tu palabra en el intento: Nº ' + (mistakes + 1);
    }


}

const addBodyPart = bodyParts => {
    ctx.fillStyle = 'ffff'
    ctx.fillRect(...bodyParts);
}

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++
    if (mistakes === bodyParts.length) {
        endGame();
        resultado.innerHTML = 'Perdiste la palabra  era "' + PalabraFinal + '"';
    }
}


const letterInput = letter => {
    if (selectedWord.includes(letter)) {
        correctLetter(letter);
    }
    else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);


}


const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if (newLetter.match(/^[a-zÑ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    }
}

const drawWord = () => {
    selectedWord.forEach(letter => {
        const LetterElement = document.createElement('span');
        LetterElement.innerHTML = letter.toUpperCase();
        LetterElement.classList.add('letter');
        LetterElement.classList.add('hidden');
        wordContainer.appendChild(LetterElement);
    });
}


//elije La palabra en nuestro arraa y la divide en letras con split
const selectRandomWord = () => {
    let word = words[Math.floor(Math.random() * words.length)].toUpperCase();
    selectedWord = word.split('');
    PalabraFinal = word
}



var drawHangMan = () => {
    ctx.canvas.width = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'd95d39'
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);

}

//funciones que se ejecutan al presionarstart, tambien limpiamos la pantalla de elementos.
var startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    userLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    agregarPalabra.style.display = 'none'
    palabraNueva.style.display = 'none'
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent)
    resultado.innerHTML = '';
    rendirse.style.display = 'block'
}

var agregar = () => {
    agregarPalabra.style.display = 'none'
    palabraNueva.style.display = 'none'
    var palabrita = document.getElementById('palabraNueva').value;
    words2.push(palabrita)
    words = words2;
    startGame();
}
var mostrarPalabra = () =>{
    resultado.innerHTML = 'Perdiste la palabra  era "' + PalabraFinal + '"';
    endGame();
    
}

agregarPalabra.addEventListener('click', agregar)
startButton.addEventListener('click', startGame);
rendirse.addEventListener('click', mostrarPalabra)


//funcion paraque no permita ingregsar caracteres numericos y acentos.
function soloLetras(e) {
    var key = e.keyCode || e.which,
        tecla = String.fromCharCode(key).toLowerCase(),
        letras = " abcdefghijklmnñopqrstuvwxyz",
        especiales = [8, 37, 39, 46],
        tecla_especial = false;

    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}
