console.log("Welcome to Spotify");


// Initialize the Variables
var seconds;
var total;
var pnext=false;
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
var currSong;
var t;

let songs = [
    {songName: "Stereo", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

function duration(){
    for( i=0; i<=9; i++){
        document.getElementById("t_"+i).innerHTML = "--:--  ";
    }
}

masterPlay.addEventListener('click', ()=>{
    if(flag==false){
        if(audioElement.paused|| audioElement.currentTime<=0){
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            currSong.target.classList.remove('fa-play-circle');
            currSong.target.classList.add('fa-pause-circle');
        }
        else{
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            makeAllPlays();
        }
    }
    else{
        if(playStatus){
            player.pauseVideo();
            playStatus=false;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            makeAllPlays();
        }
        else{
            player.playVideo();
            playStatus=true;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            currSong.target.classList.remove('fa-play-circle');
            currSong.target.classList.add('fa-pause-circle');
        }
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    if(flag==false){
        total = parseInt(audioElement.duration);
        t = parseInt(total/60)+" : "+parseInt(total%60)+" ";
        document.getElementById("t_"+songIndex).innerHTML = t;
        document.getElementById("tot").innerHTML = t;
        progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
        myProgressBar.value = progress;
        var cur = parseInt(audioElement.currentTime);
        document.getElementById("current").innerHTML =  parseInt(cur/60)+" : "+parseInt(cur%60);
    }
})

myProgressBar.addEventListener('change', ()=>{
    if(flag==false){
        audioElement.currentTime = (myProgressBar.value/100) * audioElement.duration;
    }
    else{
        seconds = (myProgressBar.value/100) * total;
        console.log(seconds);
        console.log(myProgressBar.value)
        console.log(total);
        player.seekTo(seconds, true);
    }
})

function prog(){

    
    function incrementSeconds() {
        total = player.getDuration();
        var k=parseInt(total/60)+" : "+parseInt(total%60)+" ";
        document.getElementById("t_"+songIndex).innerHTML = k;
        document.getElementById("tot").innerHTML = k;
        seconds = player.getCurrentTime();
        progress = parseInt((seconds/total)* 100); 
        myProgressBar.value = progress;
        document.getElementById("current").innerHTML = parseInt(seconds/60)+" : "+parseInt(seconds%60);
    }

    setInterval(incrementSeconds, 500);
}

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        currSong=e;
        console.log(playStatus);
        if(flag===false){
            if(playStatus){
                if(songIndex != parseInt(e.target.id) || pnext){
                    pnext=false;
                    makeAllPlays();
                    songIndex = parseInt(e.target.id);
                    e.target.classList.remove('fa-play-circle');
                    e.target.classList.add('fa-pause-circle');
                    audioElement.src = `songs/${songIndex+1}.mp3`;
                    audioElement.src = `songs/${songIndex+1}.mp3`;
                    masterSongName.innerText = songs[songIndex].songName;
                    audioElement.play();
                    audioElement.currentTime = 0;
                    document.getElementById("t_"+songIndex).innerHTML = parseInt(total/60)+" : "+total%60+" ";
                    gif.style.opacity = 1;
                    masterPlay.classList.remove('fa-play-circle');
                    masterPlay.classList.add('fa-pause-circle');
                    
                    console.log("1")
                }
                else{
                    makeAllPlays();
                    playStatus=false;
                    audioElement.pause();
                    masterPlay.classList.remove('fa-pause-circle');
                    masterPlay.classList.add('fa-play-circle');
                    gif.style.opacity = 0;
                    console.log(2)
                }
    
            }
            else{
                if(songIndex == parseInt(e.target.id) && pnext==false){
                    audioElement.play();
                    e.target.classList.remove('fa-play-circle');
                    e.target.classList.add('fa-pause-circle');
                    playStatus=true;
                    masterPlay.classList.remove('fa-play-circle');
                    masterPlay.classList.add('fa-pause-circle');
                    gif.style.opacity = 1;
                    console.log(3)
                }
                else{
                    pnext=false;
                    makeAllPlays();
                    songIndex = parseInt(e.target.id);
                    e.target.classList.remove('fa-play-circle');
                    e.target.classList.add('fa-pause-circle');
                    audioElement.src = `songs/${songIndex+1}.mp3`;
                    audioElement.src = `songs/${songIndex+1}.mp3`;
                    masterSongName.innerText = songs[songIndex].songName;
                    audioElement.play();
                    audioElement.currentTime = 0; 
                    gif.style.opacity = 1;
                    playStatus=true;
                    masterPlay.classList.remove('fa-play-circle');
                    masterPlay.classList.add('fa-pause-circle');
                    console.log(4+playStatus)
                }
            }
        }
        else{
            audioElement.pause();
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    pnext=true;
    if(flag==false){
        if(songIndex>=9){
            songIndex = 0
        }
        else{
            songIndex += 1;
        }
        pnext=true;
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementById(songIndex).click();
    }
    else{
        console.log(songIndex);
        if(songIndex>=9){
            songIndex = 0
        }
        else{
            songIndex += 1;
        }
        makeAllPlays();
        document.getElementById(songIndex).click();
    }
})

document.getElementById('previous').addEventListener('click', ()=>{
    pnext=true;
    if(flag==false){
        if(songIndex<=0){
            songIndex = 9
        }
        else{
            songIndex -= 1;
        }
        
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementById(songIndex).click();
    }
    else{
        console.log(songIndex);
        if(songIndex<=0){
            songIndex = 0
        }
        else{
            songIndex -= 1;
        }
        makeAllPlays();
        document.getElementById(songIndex).click();
    }
})