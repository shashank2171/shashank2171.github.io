
var s;
var json;
var flag = false;
var playStatus = false;

function getQ(){

    s=document.querySelector("#search").value;
    document.getElementById("heading").innerHTML = "Searched for: "+s;
    s=s+" song";
    console.log(s);
    makeAllPlays();
    duration();
    songIndex=10;
}

function loadClient() {
    gapi.client.setApiKey("AIzaSyD7csXHNYLrDfHVXn3I3r61OXCal70rjjA");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
}


// Make sure the client is loaded before calling this method.
function execute() {
    return gapi.client.youtube.search.list({
      "part": [
        "snippet",
      ],
      "q": s,
      "maxResults": 10,
      "type": [
        "video"
      ]
    })
    .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                json = (response.result);
                print();
                flag = true;
          },
          function(err) { console.error("Execute error", err); });
}

gapi.load("client");






function print(){
     for(i=0; i<=9; i++){
        console.log(json.items[i].snippet.title);
        console.log(json.items[i].id.videoId);
        console.log(json.items[i].snippet.thumbnails.default.url);

        document.getElementById("h3_"+i).innerHTML = json.items[i].snippet.title
        document.getElementById("img_"+i).src = json.items[i].snippet.thumbnails.default.url;
      }
}

function change(i){
    audioElement.pause();
    async function alter(){
        document.getElementById("video").src = "https://www.youtube.com/embed/"+json.items[i].id.videoId+"?enablejsapi=1&html5=1";
        document.getElementById("masterSongName").innerHTML = json.items[i].snippet.title;
        songIndex = i;
        seconds = 0;
    }
    async function play(){
        await alter();
        setTimeout(() => {
            player.playVideo();
            playStatus=true;
            makeAllPlays();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            currSong.target.classList.remove('fa-play-circle');
            currSong.target.classList.add('fa-pause-circle');
        }, 1000);
    }
    if(playStatus && songIndex==i && pnext==false){
        player.pauseVideo();
        playStatus=false;
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        makeAllPlays();
    }
    else{
        if(songIndex==i && pnext==false){
            playStatus=true;
            player.playVideo();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            currSong.target.classList.remove('fa-play-circle');
            currSong.target.classList.add('fa-pause-circle');
        }
        else{
            pnext=false;
            play();
        }
    }
    
}


// global variable for the player
var player;

// this function gets called when API is ready to use
function onYouTubePlayerAPIReady() {
    // create the global player from the specific iframe (#video)
    player = new YT.Player('video', {
        events: {
            // call this function when player is ready to use
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {

    //bind events
    // var playButton = document.getElementById("play-button");
    // playButton.addEventListener("click", function() {
    //     player.playVideo();
    // });

    // var pauseButton = document.getElementById("pause-button");
    // pauseButton.addEventListener("click", function() {
    //     player.pauseVideo();
    // });

    // var stopButton = document.getElementById("stop-button");
    // stopButton.addEventListener("click", function() {
    //     player.stopVideo();
    // });

}

// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


