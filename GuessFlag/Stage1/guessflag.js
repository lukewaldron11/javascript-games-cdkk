let flags = new Array();
let offset = 0;
let correctFlag;
let score = 0;
let guess_allowed = true;

let elemFlag0 = document.getElementById('idFlag0');
let elemFlag1 = document.getElementById('idFlag1');
let elemFlag2 = document.getElementById('idFlag2');
let elemNext = document.getElementById("idNextFlags");
let elemResult = document.getElementById('idResult');
let elemScore = document.getElementById('idScore');

function displayFlags() {
    elemFlag0.src = `../flags/${flags[offset + 0].code}.svg`;
    elemFlag1.src = `../flags/${flags[offset + 1].code}.svg`;
    elemFlag2.src = `../flags/${flags[offset + 2].code}.svg`;
    correctFlag = Math.floor(Math.random() * 3); // 0, 1 or 2
    document.getElementById('idCountry').innerHTML = flags[offset + correctFlag].country;
    offset += 3;
}

// Runs asynchronously
fetch("../flags/countries.json")
    .then(response => response.json())
    .then(json => {
        jsonFlags = json;
        for (const country in json) {
            flags.push({ code: country.toLowerCase(), country: jsonFlags[country] });
        }
        shuffle(flags);
        displayFlags();
    });

elemFlag0.addEventListener('click', function () { guessFlag(0); });
elemFlag1.addEventListener('click', function () { guessFlag(1); });
elemFlag2.addEventListener('click', function () { guessFlag(2); });

elemNext.disabled = true;
elemNext.addEventListener('click', function () {
    displayFlags();
    elemNext.disabled = true;
    guess_allowed = true;
    elemResult.innerHTML = "";
});

function guessFlag(flagNum) {
    if (guess_allowed) {
        guess_allowed = false;

        elemNext.disabled = false;
        if (flagNum == correctFlag) {

            elemResult.innerHTML = "Correct";
            score++;
        } else {
            elemResult.innerHTML = "Incorrect try again";
            score = 0

        }
        elemScore.innerHTML = `Score = ${score}`;
    }
}

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

let timer;
let timeLimit = 30; // Time limit in seconds

function startTimer() {
    let display = document.getElementById('timer');

    timer = setInterval(function() {
        let minutes = Math.floor(timeLimit / 60);
        let seconds = timeLimit % 60;

        // Display the timer in MM:SS format
        display.textContent = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);

        // Decrease time limit by 1 second
        timeLimit--;

        // If the timer reaches 0, stop the timer
        if (timeLimit < 0) {
            clearInterval(timer);
            display.textContent = 'Time\'s up! Your score was';
            display.textContent = score
            // Add your code here to handle what happens when time's up
        }
    }, 1000); // Update the timer every 1 second (1000 milliseconds)

    resizeFlags(); // Call the function to resize flags when timer starts
}

// Function to resize flags
function resizeFlags() {
    let flags = document.querySelectorAll('.clsFlag');
    flags.forEach(function(flag) {
        flag.style.width = '400px'; // Adjust the width as needed
        flag.style.height = '350px'; // Maintain aspect ratio
    });
}

// Call startTimer function when the page loads
window.onload = startTimer;


function refreshPage(){
    window.location.reload();
} 