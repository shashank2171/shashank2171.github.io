
var s;
var json;
function getQ(){
    s=document.querySelector("#q").value+" song";
}

function loadClient() {
    gapi.client.setApiKey("AIzaSyAckppQylvaU9PC4AnyrCSvcnQ2vgyNKfE");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
}


// Make sure the client is loaded before calling this method.
function execute() {
    return gapi.client.youtube.search.list({
      "part": [
        "snippet"
      ],
      "q": s,
      "type": [
        "video"
      ]
    })
    .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                json = (response.result);
                print();
          },
          function(err) { console.error("Execute error", err); });
}

gapi.load("client");






function print(){
     for(i=0; i<5; i++){
        console.log(json.items[i].snippet.title);
        console.log(json.items[i].id.videoId);
        console.log(json.items[i].snippet.thumbnails.default.url);

        document.getElementById("h3_"+i).innerHTML = json.items[i].snippet.title
        document.getElementById("img_"+i).src = json.items[i].snippet.thumbnails.default.url;
      }
}

function change(i){
  document.getElementById("thumb").src = json.items[i].snippet.thumbnails.default.url
  document.getElementById("video").src = "https://www.youtube.com/embed/"+json.items[i].id.videoId+"?enablejsapi=1&html5=1";
  document.getElementById("selected").innerHTML = "SELECTED: "+json.items[i].snippet.title;
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

    // bind events
    var playButton = document.getElementById("play-button");
    playButton.addEventListener("click", function() {
        player.playVideo();
    });

    var pauseButton = document.getElementById("pause-button");
    pauseButton.addEventListener("click", function() {
        player.pauseVideo();
    });

    var stopButton = document.getElementById("stop-button");
    stopButton.addEventListener("click", function() {
        player.stopVideo();
    });

}

// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
