document.querySelector('.play').addEventListener('click', playSong);
// document.querySelector('#next-bt').addEventListener('click', grabNextSong);
document.querySelector('#next-bt').addEventListener('click', grabSong);


const songIds = ["995535015", "966411602", "823593456", "956689796", "943946671", "982388023", "907242704", "201281527", "656801339", "910038357", "250038575", "878000348",  "794095205",  "1645339",  "400835962", "325618", "169003415",  "51958108", "76532142", "192688540", "684811768", "344799464", "217633921", "192811017", "640047583", "517438248"];
let randomSong = songIds[Math.ceil(Math.random() * songIds.length - 1)];
let url = `https://itunes.apple.com/us/lookup?id=${randomSong}`
var artist = '';
var score = 0;
fetch(url)
.then(response => response.json())
.then(data => {
    console.log('ready')
    artist = data.results[0].artistName.toLowerCase();
})

document.querySelector('.scoreUp').innerHTML = `${score}`;
document.querySelector('#songSelect').addEventListener('keypress', (event) => {
    const song = document.querySelector('#songSelect').value;
    if (event.key === 'Enter') {
        event.preventDefault();

        if ((song.toLowerCase() === artist.toLowerCase()) || song === artist) {
            document.querySelector('h2').innerText = `Correct!`;
            document.querySelector('.scoreUp').innerHTML = `${score + 1}`;
        } else {
            document.querySelector('h2').innerText = 'Guess again.';
        }
    }
})

async function playSong() {
    const audioElement = document.querySelector('audio');
    const response = await fetch(url);
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