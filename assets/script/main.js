
let offsetX = 0;
let offsetY = 0;
let draggedWindow = null;
let draggedTitle = null;
let zIndexCounter = 0;
let sfxVolume = 1;
let sfxOn = true;
let musicOn = false;

let pWord = ""
let pIndex = 0
let aboutIndex = 0
let type = false

const aboutme = [
    "Hi! I'm Christian Vaydal, a passionate programmer, digital artist, and game developer who loves blending creativity with technology. I especialize in web developement, graphic design, and game development, working across languages and tools like Python, C/C++, Java, C#, PHP, Godot, Unity, Pygame and Raylib. ",
    "I enjoy building interactive experiences, from web apps and portfolios sites to 2D and 3D games. I'm also fascinated by retro games, programming, and computer hardware, which inspire much of my design and development style. ",
    "My goal is to create meaningful digital experiences that connect technology, art, and imagination."
]

const pAboutMe = document.getElementById("aboutMe")
const clicksfx = document.getElementById('clicksfx');
const exitsfx = document.getElementById('exitsfx');
const papersfx = document.getElementById('papersfx');

// set volume here
clicksfx.volume = .5
exitsfx.volume = .1

function playSound(sound) {
    if(sfxOn){
        sound.currentTime = 0; // Reset sound
        sound.play(); // Play sound
    }
}

// opening window
document.getElementById('aboutButton').addEventListener('click', () => {
    let aboutWindow = document.getElementById('about');
    let childDiv = aboutWindow.querySelector('.win_content');
    childDiv.scrollTop = 0; // Reset scroll position
    aboutWindow.style.display = 'flex';
    aboutWindow.style.zIndex = ++zIndexCounter; // Bring to front
    playSound(clicksfx);
    type = true
    pWord = ""
    pIndex = 0
    aboutIndex = 0
});

document.getElementById('contactButton').addEventListener('click', () => {
    let aboutWindow = document.getElementById('contact');
    aboutWindow.scrollTop = 0; // Reset scroll position
    aboutWindow.style.display = 'flex';
    aboutWindow.style.zIndex = ++zIndexCounter; // Bring to front
    playSound(clicksfx);
});

document.getElementById('worksButton').addEventListener('click', () => {
    let aboutWindow = document.getElementById('works');
    aboutWindow.scrollTop = 0; // Reset scroll position
    aboutWindow.style.display = 'flex';
    aboutWindow.style.zIndex = ++zIndexCounter; // Bring to front
    playSound(clicksfx);
});

document.getElementById('faqsButton').addEventListener('click', () => {
    let aboutWindow = document.getElementById('faqs');
    aboutWindow.scrollTop = 0; // Reset scroll position
    aboutWindow.style.display = 'flex';
    aboutWindow.style.zIndex = ++zIndexCounter; // Bring to front
    playSound(clicksfx);
});

document.getElementById('galleryButton').addEventListener('click', () => {
    let aboutWindow = document.getElementById('gallery');
    aboutWindow.scrollTop = 0; // Reset scroll position
    aboutWindow.style.display = 'flex';
    aboutWindow.style.zIndex = ++zIndexCounter; // Bring to front
    playSound(clicksfx);
});

document.getElementById('viewResume').addEventListener('click', () => {
    let aboutWindow = document.getElementById('resumeViever');
    aboutWindow.scrollTop = 0; // Reset scroll position
    aboutWindow.style.display = 'flex';
    aboutWindow.style.zIndex = ++zIndexCounter; // Bring to front
    playSound(papersfx);
});

// play game
document.getElementById('play-home').addEventListener('click', () => {
    let window = document.getElementById('game-container');
    window.style.display = 'flex';
    window.style.zIndex = ++zIndexCounter; // Bring to front

    const iframe = window.querySelector('iframe');
    iframe.src = 'assets/games/home/ship.html'; // Reload iframe content
    if(iframe){iframe.focus();}

    playSound(papersfx);
});

// opening link
document.querySelectorAll(".clickedsfx").forEach((link) => {
    link.addEventListener('click', ()=>{
        playSound(clicksfx);
    });
});

// on exit window
document.querySelectorAll('.exit').forEach((exitButton) => {
    exitButton.addEventListener('click', (e) => {
        playSound(exitsfx);
        let window = exitButton.parentElement.parentElement
        window.style.display = 'none';
        window.scrollTop = 0; // Reset scroll position
        window.style.zIndex = 0; // Reset z-index when closed
    });
});

// on moving window
document.querySelectorAll('.win_header').forEach((window) => {
    window.addEventListener('mousedown', (e) => {
        draggedWindow = window.parentElement;
        draggedTitle = window;
        offsetX = e.clientX - draggedWindow.offsetLeft;
        offsetY = e.clientY - draggedWindow.offsetTop;
        draggedTitle.style.cursor = 'grabbing';

        draggedWindow.style.zIndex = ++zIndexCounter; // Bring to front
    });
});

document.addEventListener('mousemove', (e) => {
    if (draggedWindow) {
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        const maxLeft = window.innerWidth - draggedWindow.offsetWidth;
        const maxTop = window.innerHeight - draggedWindow.offsetHeight;

        newLeft = Math.max(0, Math.min(newLeft, maxLeft));
        newTop = Math.max(0, Math.min(newTop, maxTop));

        draggedWindow.style.left = newLeft + 'px';
        draggedWindow.style.top = newTop + 'px';
    }
});

document.addEventListener('mouseup', () => {
    if(!draggedWindow) return;
    draggedTitle.style.cursor = 'grab';
    draggedWindow = null;
    draggedTitle = null;
});

let seconds = 0
let Word = ["Web Developer", "Game Developer", "Programmer", "Web Designer", "Graphic Artist", "System Developer", "UI/UX Designer", "Software Developer"]
let wordIndex = 0
let index = 0
let word = ""
let wait = false

const changingText = document.getElementById("service");
const timer = setInterval(() => {
    seconds++
    if(!wait){
        word += Word[wordIndex][index]
        changingText.textContent = word 
        index++
        if(index >= Word[wordIndex].length){
            wordIndex++
            if(wordIndex >= Word.length){
                wordIndex = 0
            }
            index = 0
            word = ""
            seconds = 0
            wait = true
        }
    } else {
        if(seconds >= 10){
            wait = false
        }
    }
}, 50) // 1000ms = 1s

const aboutTimer = setInterval(() => {
    if(type){
        pWord += aboutme[aboutIndex][pIndex]
        pAboutMe.innerHTML = pWord + '<i class="fa-solid fa-i-cursor"></i>'
        pIndex++
        if(pIndex >= aboutme[aboutIndex].length){
            if(aboutIndex >= aboutme.length-1){
                type = false
            }
            aboutIndex++
            pIndex = 0
        }
    }
}, 20);