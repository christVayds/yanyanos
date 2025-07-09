
let offsetX = 0;
let offsetY = 0;
let draggedWindow = null;
let draggedTitle = null;
let zIndexCounter = 0;
let sfxVolume = 0.15;
let sfxOn = true;
let musicOn = false;

const clicksfx = document.getElementById('clicksfx');
const exitsfx = document.getElementById('exitsfx');
const papersfx = document.getElementById('papersfx');

function playSound(sound) {
    if(sfxOn){
        sound.volume = sfxVolume;
        sound.currentTime = 0; // Reset sound
        sound.play(); // Play sound
    }
}

// opening window
document.getElementById('aboutButton').addEventListener('click', () => {
    let aboutWindow = document.getElementById('about');
    aboutWindow.style.display = 'flex';
    aboutWindow.style.zIndex = ++zIndexCounter; // Bring to front
    playSound(clicksfx);
});

document.getElementById('contactButton').addEventListener('click', () => {
    let aboutWindow = document.getElementById('contact');
    aboutWindow.style.display = 'flex';
    aboutWindow.style.zIndex = ++zIndexCounter; // Bring to front
    playSound(clicksfx);
});

document.getElementById('worksButton').addEventListener('click', () => {
    let aboutWindow = document.getElementById('works');
    aboutWindow.style.display = 'flex';
    aboutWindow.style.zIndex = ++zIndexCounter; // Bring to front
    playSound(clicksfx);
});

document.getElementById('faqsButton').addEventListener('click', () => {
    let aboutWindow = document.getElementById('faqs');
    aboutWindow.style.display = 'flex';
    aboutWindow.style.zIndex = ++zIndexCounter; // Bring to front
    playSound(clicksfx);
});

document.getElementById('galleryButton').addEventListener('click', () => {
    let aboutWindow = document.getElementById('gallery');
    aboutWindow.style.display = 'flex';
    aboutWindow.style.zIndex = ++zIndexCounter; // Bring to front
    playSound(clicksfx);
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
        window.style.zIndex = 0; // Reset z-index when closed
        // window.style.left = '50%'; // Reset position
        // window.style.top = '50%'; // Reset position
        // window.style.transform = "translate(-50%, -50%)";
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