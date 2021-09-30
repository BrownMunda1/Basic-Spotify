let previous=document.querySelector('#prev');
let play=document.querySelector('#play');
let next=document.querySelector('#next');
let title=document.querySelector('#title');
let artist=document.querySelector('#artist');
let recent_volume=document.querySelector('#volume');
let volume_show=document.querySelector('#volume_show');
let slider=document.querySelector('#duration_slider');
let show_duration=document.querySelector('#show_duration');
let track_image=document.querySelector('#track_image');
let auto_play=document.querySelector('#auto');
let total=document.querySelector('#total');


let timer;
let autoplay=0;

let index_num=0;
let playing_song=false;

// create a audio element
let track=document.createElement('audio');

// All songs list
let all_songs=[
    {
        name:"Chone Ah",
        path: "song1.mp3",
        img: "img1.jfif",
        singer: "The PropheC"
    }, 

    {
        name:"Here and There",
        path: "song2.mp3",
        img: "img2.jfif",
        singer: "Karan Aujla"
    }, 

    {
        name:"Schedule",
        path: "song3.mp3",
        img: "img3.jfif",
        singer: "Tegi Pannu"
    }, 

    {
        name:"Solace",
        path: "song4.mp3",
        img: "img4.jpg",
        singer: "The PropheC"
    }, 

    {
        name:"Vibe",
        path: "song5.mp3",
        img: "img5.jfif",
        singer: "Diljit Dosanjh"
    } 


];

// All function 

//funtion to load the track
function load_track(index_num){
    clearInterval(timer);
    reset_slider();
    track.src=all_songs[index_num].path;
    title.innerHTML=all_songs[index_num].name;
    track_image.src=all_songs[index_num].img;
    artist.innerHTML=all_songs[index_num].singer;

    total.innerHTML=all_songs.length;
    present.innerHTML=index_num+1;

    timer=setInterval(range_slider,1000);

    track.load();
}

load_track(index_num);

//mute sound
function mute_sound(){
    track.volume=0;
    volume.value=0;
    volume_show.innerHTML=0;

}

//reset song slider
function reset_slider(){
    slider.value=0;
}

// checking the song is playing or not 
function justplay(){
    if(playing_song==false){
        playsong();
    }
    else{
        pausesong();
    }
}

//play song
function playsong(){
    track.play();
    playing_song=true;
    play.innerHTML='<i class="fa fa-pause"></i>'
}

//pause song
function pausesong(){
    track.pause();
    playing_song=false;
    play.innerHTML='<i class="fa fa-play"></i>'
}

//next song
function next_song(){
    if(index_num<all_songs.length-1){
        index_num+=1;
        load_track(index_num);
        playsong();
    }
    else{
        index_num=0;
        load_track(index_num);
        playsong()
    }
}

//previous song
function previous_song(){
    if(index_num>0){
        index_num-=1;
        load_track(index_num);
        playsong();
    }
    else{
        index_num=all_songs.length-1;
        load_track(index_num);
        playsong();
    }
}

//change volume
function volume_change(){
    volume_show.innerHTML=recent_volume.value;
    track.volume=recent_volume.value/100;
}

//change slider position 
function change_duration(){
    let slider_position=track.duration * (slider.value/100);
    track.currentTime=slider_position;
}

//autoplay 
function autoplay_switch(){
    if(autoplay==1){
        autoplay=0;
        auto_play.style.background="rgba(255,255,255,0.2)";
    }
    else{
        autoplay=1;
        auto_play.style.background="#FF8A65";
    }
}

function range_slider(){
    let position=0;

    //update slider position
    if(!isNaN(track.duration)){
        position=track.currentTime * (100/track.duration);
        slider.value=position;
    }

    if(track.ended){
        play.innerHTML='<i class="fa fa-play"></i>'
        if(autoplay==1){
            index_num+=1;
            load_track(index_num);
            playsong();
        }
    }
}