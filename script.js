$(document).ready(function() {

	 var songIds = ["995535015", "966411602", "823593456", "956689796", "943946671",
                 "982388023", "907242704", "201281527", "656801339", "910038357",
                 "250038575", "878000348",  "794095205",  "1645339",  "400835962",
                 "325618", "169003415",  "51958108",
                 "76532142", "192688540", "684811768", "344799464", "217633921",
                 "192811017", "640047583", "517438248" ];

    $.ajax({

        url: "https://itunes.apple.com/us/lookup?id="+ _.sample(songIds),
        dataType: 'JSONP'
    })

    
    .done(function(data) { 
     
        console.log(data); 
        //Start Button
        function startSong(){
         var audioElement = $('#audio_preview');
         audioElement.attr('src', data.results[0].previewUrl);
         audioElement.on("canplay", function() {
            audioElement[0].play();
        });


     //Submit Form
     $("form").on("submit", function(e){
            e.preventDefault();
            var count =0;
            var songChoice = $("#songSelect").val();
        if (songChoice === data.results[0].artistName){
        $("h2").text("You win!");
            console.log("You win!");
            count++;
            $(".scoreUp").text(count);
            console.log(count);
        } else{
        console.log("You lose");
        $("h2").text("Sorry, wrong answer!");
        }
        });
    }

    //Play track
       $(".play").on("click", startSong);

        })

    ////////////////

        .fail(function(data) { console.log(data);});

 });