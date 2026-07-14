
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
    "Hi! I'm Christian Vaydal, a passionate programmer, digital artist, and indie game developer who loves blending creativity with technology. I especialize in web developement, graphic design, and game development, working across languages and tools like Python, C/C++, Java, C#, PHP, Godot, Unity, Pygame and Raylib. ",
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

// Projects data: description and image filenames (relative to assets/images)
const projects = [
    { title: "Nano8", desc: "Nano8 is a fantasy micro-computer game engine I developed. It provides a simple yet powerful framework for creating 2D games with a retro aesthetic.", images: ["nano8.png"] },
    { title: "MonkeyRoulette", desc: "MonkeyRoulette is my entry for The Very Serious Juniper Dev Game Jam 2026. Spin the roulette to align colors and avoid letting fruits reach the bottom.", images: ["monkeyroulette.png"] },
    { title: "Altech.ph", desc: "Freelance web development where I improved responsiveness, UI, and performance for the company's website.", images: ["altech_ph.png"] },
    { title: "Jack 'n Junk", desc: "Jack 'n Junk is an entry for GameDev.js Jam 2026. Protect the sunflower and carry it to the Life Machine in this action-RPG.", images: ["jacknjunk.png"] },
    { title: "Mirror Move", desc: "Mirror Move is a puzzle game where you control two entities with different directions and try to merge them.", images: ["mirrormove.png"] },
    { title: "JiC Interpreter", desc: "JiC is the interpreter for my Yanji Programming language. It is written in C.", images: ["yanji.png"] },
    { title: "Brainfuck Interpreter in C", desc: "A Brainfuck interpreter implemented in C.", images: ["brainfuck.webp"] },
    { title: "Back In Time", desc: "A cozy 2D RPG built in Pygame where players explore, fight, and solve puzzles to change the past.", images: ["backintime.webp"] },
    { title: "Home", desc: "HOME is a 2D mini game made in Pico-8. (Under Development)", images: ["home.png"] },
    { title: "Yanji Compiler Prototype", desc: "A prototype of my programming language implemented in Python with LLVMLite.", images: [] },
    { title: "MineScape", desc: "A massive 2D sandbox horror game inspired by Minecraft and Terraria — still in development.", images: ["minescape.webp"] },
    { title: "SBCA School Portal", desc: "A complete school portal system built as a thesis project for managing enrollment and student records.", images: ["sbcaportal.webp"] },
    { title: "My First Web Portfolio", desc: "My first web portfolio.", images: ["christianvaydalportfolio.png"] }
]

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

// Inject "View More Info" buttons into each project and handle opening the project info window
function setupProjectButtons() {
    const workItems = document.querySelectorAll('.workItem');
    workItems.forEach((item, i) => {
        const actions = item.querySelector('.actions');
        if (!actions) return;
        // skip if a view-more already exists
        if (actions.querySelector('.view-more')) return;

        const btn = document.createElement('p');
        btn.className = 'linked button view-more clickedsfx';
        btn.textContent = 'View More Info';
        btn.dataset.index = i;
        actions.appendChild(btn);

        btn.addEventListener('click', (e) => {
            playSound(clicksfx);
            const idx = parseInt(e.currentTarget.dataset.index, 10);
            openProjectWindow(idx);
        });
    });
}

// Create or reuse a project info window, populate with data, and show it
function openProjectWindow(index) {
    const data = projects[index] || { title: 'Project', desc: 'No details available.', images: [] };

    let win = document.getElementById('projectInfo');
    if (!win) {
        win = document.createElement('div');
        win.className = 'window project';
        win.id = 'projectInfo';
        win.style.display = 'flex';
        win.style.flexDirection = 'column';
        win.innerHTML = `
            <div class="win_header showBorder">
                <div class="exit showBorder"><i class="fa-solid fa-xmark"></i></div>
                <div class="win_label"><p></p></div>
            </div>
            <div class="win_content showBorder">
                <div class="projectContent"></div>
            </div>`;
        document.body.appendChild(win);

        // exit button
        const exitBtn = win.querySelector('.exit');
        exitBtn.addEventListener('click', () => {
            playSound(exitsfx);
            win.style.display = 'none';
            win.style.zIndex = 0;
        });

        // make draggable
        const header = win.querySelector('.win_header');
        header.addEventListener('mousedown', (e) => {
            draggedWindow = win;
            draggedTitle = header;
            offsetX = e.clientX - draggedWindow.offsetLeft;
            offsetY = e.clientY - draggedWindow.offsetTop;
            draggedTitle.style.cursor = 'grabbing';
            draggedWindow.style.zIndex = ++zIndexCounter;
        });
    }

    // populate
    win.querySelector('.win_label p').textContent = data.title;
    const content = win.querySelector('.projectContent');
    content.innerHTML = '';
    const descEl = document.createElement('p');
    descEl.textContent = data.desc;
    content.appendChild(descEl);

    if (data.images && data.images.length) {
        const gallery = document.createElement('div');
        gallery.className = 'projectImages';
        data.images.forEach((img) => {
            const imgEl = document.createElement('img');
            // if path already contains a slash assume full path, otherwise use assets/images/
            imgEl.src = img.includes('/') ? img : `assets/images/${img}`;
            imgEl.style.maxWidth = '100%';
            imgEl.style.marginTop = '64px';
            gallery.appendChild(imgEl);
        });
        content.appendChild(gallery);
    }

    win.style.display = 'flex';
    win.style.fontSize = '24px';
    win.style.zIndex = ++zIndexCounter;
    win.scrollTop = 0;
}

// initialize project buttons after DOM ready
window.addEventListener('load', () => {
    try { setupProjectButtons(); } catch (e) { console.error(e); }
});

// typing animation and change text

const Word = ["Web Developer", "Game Developer", "Programmer", "Web Designer", "Graphic Artist", "System Developer", "UI/UX Designer", "Software Developer"]
let wordIndex = 0
let charIndex = 0
let isDeleting = false
let delayCount = 0
const typingSpeed = 70
const deletingSpeed = 50
const pauseAfterTyping = 32
const pauseAfterDeleting = 8

const changingText = document.getElementById("service")

function updateTyping() {
    const currentWord = Word[wordIndex]

    if (!isDeleting) {
        charIndex += 1
        changingText.textContent = currentWord.substring(0, charIndex)

        if (charIndex === currentWord.length) {
            isDeleting = true
            delayCount = pauseAfterTyping
        }
    } else if (delayCount > 0) {
        delayCount -= 1
    } else {
        charIndex -= 1
        changingText.textContent = currentWord.substring(0, charIndex)

        if (charIndex === 0) {
            isDeleting = false
            wordIndex = (wordIndex + 1) % Word.length
            delayCount = pauseAfterDeleting
        }
    }

    const nextDelay = isDeleting ? deletingSpeed : typingSpeed
    setTimeout(updateTyping, nextDelay)
}

updateTyping()

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

// animation slide up
const images = document.querySelectorAll('.slide-up');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the element is visible
});

images.forEach((image) => {
    observer.observe(image);
});
