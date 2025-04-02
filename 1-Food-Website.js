"use strick"
const search_input = document.querySelector(".search-input")
const search = document.querySelector("#sh")

search.addEventListener("click",()=>{
    search_input.classList.toggle("active")
})

const video = document.getElementById("bg-video");

// Array of video sources
const videos = ["https://v.ftcdn.net/04/73/11/54/700_F_473115455_5ptoUKrIliNHSHhcS3H1sD7Cd9W4gXDi_ST.mp4",
   "https://v.ftcdn.net/07/21/91/10/700_F_721911013_tRFpo6Khlo3vLK8kpy151F7hjwFnTu0z_ST.mp4",
   "https://v.ftcdn.net/03/31/45/83/700_F_331458333_sm5QP3SF0fV1pWNAmqZ0pV78IU3YhKCQ_ST.mp4",
   "https://v.ftcdn.net/01/63/99/01/700_F_163990165_Ild4QMZNirNnWz6e7aibQRORDG9imlKv_ST.mp4",
   "https://v.ftcdn.net/04/01/64/30/700_F_401643055_50Jcguwy28hINw2DYXy9zXE0WaWdOqnK_ST.mp4"
   ];
let currentVideoIndex = 0;

// Function to change the video
function changeVideo() {
  currentVideoIndex = (currentVideoIndex + 1) % videos.length;
  video.src = videos[currentVideoIndex];
  video.play();
}

// Change video every 3 seconds
setInterval(changeVideo, 4000);


const microphone = document.querySelector("#microphone")
const search_input_input = document.querySelector(".search-input input")
var recognition = new webkitSpeechRecognition()

recognition.lang = window.navigator.language
recognition.interimResults = true
microphone.addEventListener("click",()=>{
   recognition.start()

   microphone.addEventListener("click",()=>{recognition.stop()})
})

recognition.addEventListener('result',(e)=>{
   const result = e.results[e.results.length-1][0].transcript
   search_input_input.textContent = result
})

/*---------- LOgin/REgitraion --------------------*/
document.querySelector('.log-btn').addEventListener('click', () => {
   sessionStorage.setItem('lastPage', window.location.href);
});



/*----------- Aactive link ----------------*/
   document.querySelectorAll('header nav ul li a').forEach(link => {
      link.addEventListener('click', function() {
          document.querySelector('header nav ul li a.active').classList.remove('active');
          this.classList.add('active');
          
      });
  });


