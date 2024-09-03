function createAndAppendChildElement(parent, elementString, id, styleList) {
    let element = document.createElement(elementString);
    element.id = id;
    element.classList.add(...styleList);
    parent.appendChild(element);
    return element;
}
function createAndAppendTextElement(parent, elementString, text, id, classList) {
    let textElement = document.createElement(elementString);
    textElement.classList.add(...classList);
    textElement.appendChild(document.createTextNode(text));
    if (id !== "" || id !== "none") {
        textElement.id = id;
    }
    parent.appendChild(textElement);
    return textElement;
}

function createGrid(parentDiv, tailwindOutlineColorString, styleList) {
    
    for (let i = 0; i < 100; i++) { // Get rid of async
        let screenDiv = document.createElement("div");
        async function thing() {
            screenDiv.classList.add(...styleList);
            screenDiv.classList.add("outline", tailwindOutlineColorString);
        }
        parentDiv.appendChild(screenDiv);
        thing();
        
    }
}
function createScreen(parentDiv, color, id, styleList) {
    let screen = document.createElement("div");
    screen.classList.add(...styleList); // I love javascript
    console.log(parentDiv);
    parentDiv.appendChild(screen);
    return screen;
}


// let playerScreen = document.getElementById("player-screen");
let gameScreenSection = document.getElementById("game-screens");

let playerScreen = null;
let computerScreen = null;

let playerScreenSection = null;
let computerScreenSection = null;


const gameScreenSectionStyleList = ["flex", "flex-col", "nowrap"];

const screenSectionHeadingTextStyleList = [];

const screenLengthWidthSizePx = 500;
const screenStyleList = ["flex", "flex-wrap", `w-[${screenLengthWidthSizePx}px]`, `h-[${screenLengthWidthSizePx}px]`, "bg-sky-500"];
const squaresPerScreen = 100;

const gridSquareLengthWidthSizePx = screenLengthWidthSizePx / squaresPerScreen * 10;
const gridDivStyleList = ["bg-sky-400", `w-[${gridSquareLengthWidthSizePx}px]`, `h-[${gridSquareLengthWidthSizePx}px]`]; //Probably overkill, pair down later


playerScreenSection = createAndAppendChildElement(gameScreenSection, "section", "player-screen-section", gameScreenSectionStyleList);
computerScreenSection = createAndAppendChildElement(gameScreenSection, "section", "computer-screen-section", gameScreenSectionStyleList);
createAndAppendTextElement(playerScreenSection, "h1", "Your Ships", "", screenSectionHeadingTextStyleList);


playerScreen = createScreen(playerScreenSection, "bg-sky-500", "player-screen", screenStyleList);
computerScreen = createScreen(computerScreenSection, "bg-blue-500", "player-screen", screenStyleList);
createGrid(playerScreen, "outline-blue-700", gridDivStyleList);
createGrid(computerScreen, "outline-red-500", gridDivStyleList);

// let screen = document.createElement("div");
// gameScreenSection.appendChild(screen)
// console.log(gameScreenSection);

// createScreen(gameScreenSection, "bg-blue-500", "computer-screen");
// createGrid(playerScreen, "outline-red-500");

















//If stuffing divs inside the divs and letting flexbox figuring stuf out does not work
// let computerScreenCoords = {};
// let playerScreenCoords = {};
// console.log(playerScreen.getBoundingClientRect());
// console.log(computerScreen.getBoundingClientRect());
// console.dir(playerScreen);
// console.dir(computerScreen);