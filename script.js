// Keeps track of score
if (!localStorage.getItem('Score')) {
    localStorage.setItem('Score', Number(0));
} else {
    document.querySelector('.scoreUp').innerHTML = `${(localStorage.getItem('Score'))}`;
}
// Button eventlisteners
document.querySelector('.play').addEventListener('click', playSong);
document.querySelector('#next-bt').addEventListener('click', grabNextSong);

// Global variables for fetch on page load
const songIds = ["966411602", "943946671", "982388023", "201281527", "878000348", "169003415",  "51958108", "192688540", "684811768", "344799464", "217633921", "640047583"];
let randomSong = songIds[Math.ceil(Math.random() * songIds.length - 1)];
let url = `https://itunes.apple.com/us/lookup?id=${randomSong}`
var artist = '';
// Fetch on page load
fetch(url, {method: 'POST',mode: 'cors',headers: {'Content-Type': 'application/json'}})
.then(response => response.json())
.then(data => {
    artist = data.results[0].artistName;
})
// Input eventlistener
document.querySelector('#songSelect').addEventListener('keypress', (event) => {
    const song = document.querySelector('#songSelect').value;
    var currentScore = Number(localStorage.getItem("Score"));
    if (event.key === 'Enter') {
        event.preventDefault();

        if ((song.toLowerCase() === artist.toLowerCase()) || song === artist) {
            currentScore += 1;
            document.querySelector('h2').innerText = `Correct!`;
            localStorage.setItem("Score", currentScore);
            document.querySelector('.scoreUp').innerHTML = `${localStorage.getItem('Score')}`;
            grabNextSong();
        } else {
            document.querySelector('h2').innerText = 'Guess again.';
        }
    }
})

async function playSong() {
    const audioElement = document.querySelector('audio');
    const response = await fetch(url, {method: 'POST',mode: 'cors',headers: {'Content-Type': 'application/json'}})
    const data = await response.json();

    audioElement.src = data.results[0].previewUrl;
    audioElement.play();
}

async function grabNextSong() {
    const songIds = ["966411602", "943946671", "982388023", "201281527", "878000348", "169003415",  "51958108", "192688540", "684811768", "344799464", "217633921", "640047583"];
    let randomSong = songIds[Math.ceil(Math.random() * songIds.length - 1)];
    let newUrl = `https://itunes.apple.com/us/lookup?id=${randomSong}`
    const audioElement = document.querySelector('audio');
    const response = await fetch(newUrl, {method: 'POST',mode: 'cors',headers: {'Content-Type': 'application/json'}});
    const data = await response.json();
    artist = data.results[0].artistName;

    audioElement.src = data.results[0].previewUrl;
    audioElement.play();
}