if (!localStorage.getItem('Score')) {
    localStorage.setItem('Score', Number(0));
} else {
    document.querySelector('.scoreUp').innerHTML = `${(localStorage.getItem('Score'))}`;
}

document.querySelector('.play').addEventListener('click', playSong);
// document.querySelector('#next-bt').addEventListener('click', grabNextSong);
document.querySelector('#next-bt').addEventListener('click', grabSong);

// These songs result in promise error: [2500385, 794095205, 823593456, 956689796, 1645339, 910038357, 192811017, 656801339, 517438248, 325618, 76532142, 995535015]
const songIds = ["966411602", "943946671", "982388023", "201281527", "878000348", "169003415",  "51958108", "192688540", "684811768", "344799464", "217633921", "640047583"];
let randomSong = songIds[Math.ceil(Math.random() * songIds.length - 1)];
let url = `https://itunes.apple.com/us/lookup?id=${randomSong}`
var artist = '';

fetch(url, {method: 'POST',mode: 'cors',headers: {'Content-Type': 'application/json'}})
.then(response => response.json())
.then(data => {
    console.log(`ready using song ${randomSong}`)
    artist = data.results[0].artistName.toLowerCase();
})

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
        } else {
            document.querySelector('h2').innerText = 'Guess again.';
        }
    }
})

async function playSong() {
    const audioElement = document.querySelector('audio');
    const response = await fetch(url, {method: 'POST',mode: 'cors',headers: {'Content-Type': 'application/json'}})
    const data = await response.json();

    console.log(data.results[0]);
    console.log(data.results[0].artistName);

    audioElement.src = data.results[0].previewUrl;
    audioElement.play();
}

// TODO
// async function grabNextSong() {
//     const audioElement = document.querySelector('audio');
//     const response = await fetch(url);
//     const data = await response.json();

//     console.log(data.results[0]);
//     console.log(data.results[0].artistName);

//     audioElement.src = data.results[0].previewUrl;
//     audioElement.play();
// }

//     //Functions
   
//         $("form").on("submit", function(e){
//             e.preventDefault();    
//         var songChoice = $("#songSelect").val();
//         $("#songSelect").val("");

//         if (songChoice === data.results[0].artistName){
//         $("h2").text("Correct.");
//             console.log("Correct.");
//             count++;
//             $(".scoreUp").text(count);
//             console.log(count);
//         } else{
//         console.log("You lose");
//         $("h2").text("Incorrect.");
//         }
//         });
      

//     function startSong(){
//         audioElement.attr('src', data.results[0].previewUrl);
//         audioElement.on("canplay", function() {
//         if (this.paused === false){
//             this.pause();
//             }else{
//             audioElement[0].play();
//             $("#songSelect").focus();
//             console.log(data); 
//             }});
//         // submitSong();   
//         }

    function grabSong(){
    const audioElement = document.querySelector('audio');

        $.ajax({
            url: "https://itunes.apple.com/us/lookup?id="+ _.sample(songIds),
            dataType: 'JSONP'
            }).done(function(response){
                data = response;
            audioElement.attr('src', data.results[0].previewUrl);
            audioElement.on("canplay", function(){
            audioElement[0].play();
            $("#songSelect").val("");
            $("#songSelect").focus();
             console.log(data);
             // submitSong(); 
            });
           $("h2").text("");
                 
        });

        }


//     $.ajax({
//         url: "https://itunes.apple.com/us/lookup?id="+ _.sample(songIds),
//         dataType: 'JSONP'
//     }) 
//     .done(function(response) { 
//         data = response;
//     //Play track
//         $(".play").on("click", startSong);    
//         $("#next-bt").on("click", grabSong);
//         })
//         .fail(function(data) { console.log(data);});

//  });