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
        screenDiv.id = `${ Math.trunc(i / 10)}-${i % 10}` //Theres no integer truncation for some reason...
        screenDiv.classList.add(...styleList);
        screenDiv.classList.add("outline", tailwindOutlineColorString);
        if (i % (squaresPerScreen / 10) === 0) {
            screenDiv.classList.add("rounded-l-sm");
        }
        if (i % (squaresPerScreen / 10) === 9) {
            screenDiv.classList.add("rounded-r-sm");
        }
        parentDiv.appendChild(screenDiv);
        
    }
}
function createScreen(parentDiv, color, outlineColor, id, styleList) {
    let screen = document.createElement("div");
    screen.classList.add(...styleList); // I love javascript
    screen.classList.add(color, outlineColor);
    parentDiv.appendChild(screen);
    return screen;
}
function createButtonAndEventListener(parent, name, id, styleList, backgroundColor, onClickFunction) {
    let button = document.createElement("button");
    button.appendChild(document.createTextNode(name));
    if (id !== "" || id !== "none") {
        button.id = id;
    } 
    button.classList.add(...styleList);
    button.classList.add(backgroundColor);
    parent.appendChild(button);
    button.addEventListener("click", onClickFunction); // Add button click functionality later
    return button;
}



// let playerScreen = document.getElementById("player-screen");
let gameScreenSection = document.getElementById("game-screens");
let shipSelectionSection = document.getElementById("ship-selection");

let playerScreen = null;
let computerScreen = null;

let playerScreenSection = null;
let computerScreenSection = null;

let shipSelectionScreen = null;

let rotateButton = null;
let startButton = null;

const gameScreenSectionStyleList = ["flex", "flex-col", "nowrap", "items-center"];

const screenSectionHeadingTextStyleList = ["py-4"];

const screenLengthWidthSizePx = 500;
const screenStyleList = ["flex", "flex-wrap", `w-[${screenLengthWidthSizePx}px]`, `h-[${screenLengthWidthSizePx}px]`, "bg-sky-500", "rounded-lg", "outline", "outline-8"];
const squaresPerScreen = 100;

const gridSquareLengthWidthSizePx = screenLengthWidthSizePx / squaresPerScreen * 10;
const gridDivStyleList = [`w-[${gridSquareLengthWidthSizePx}px]`, `h-[${gridSquareLengthWidthSizePx}px]`]; 



const shipSelectionTextStyleList = ["py-1"];

const shipSelectionSectionStyleList = ["flex", "flex-row", "justify-center", "items-center","py-4", "w-[40vw]", "h-[20vh]", "min-w-[600px]", "min-h-[190px]", "bg-cyan-200", "outline", "outline-4", "outline-cyan-600", "rounded-lg"]

const shipSelectionButtonDivStyleList = ["flex", "flex-row", "justify-center", "items-center", "px-4", "my-1", "py-3", "bg-cyan-200", "rounded-lg"];

const shipSelectionButtonStyleList = ["flex", "px-4", "py-2", "mx-2", "my-2", "rounded-full"];



playerScreenSection = createAndAppendChildElement(gameScreenSection, "section", "player-screen-section", gameScreenSectionStyleList);
computerScreenSection = createAndAppendChildElement(gameScreenSection, "section", "computer-screen-section", gameScreenSectionStyleList);
createAndAppendTextElement(playerScreenSection, "h1", "Your Ships", "", screenSectionHeadingTextStyleList);
createAndAppendTextElement(computerScreenSection, "h1", "Computers Ships", "", screenSectionHeadingTextStyleList);


playerScreen = createScreen(playerScreenSection, "bg-sky-500", "outline-blue-700", "player-screen", screenStyleList);
computerScreen = createScreen(computerScreenSection, "bg-blue-500", "outline-red-500","player-screen", screenStyleList);
createGrid(playerScreen, "outline-blue-700", gridDivStyleList);
createGrid(computerScreen, "outline-red-500", gridDivStyleList); // set bg here

createAndAppendTextElement(shipSelectionSection, "h1", "Choose Ships", "", shipSelectionTextStyleList);
shipSelectionScreen = createAndAppendChildElement(shipSelectionSection, "div", "ship-selection-screen", shipSelectionSectionStyleList);

createAndAppendChildElement(shipSelectionSection, "div", "ship-selection-buttons",shipSelectionButtonDivStyleList);

//Tune colors later
rotateButton = createButtonAndEventListener(shipSelectionSection.lastChild, "rotate", "rotate-button", shipSelectionButtonStyleList, "bg-red-500", () => {console.log("Button Clicked")});
startButton = createButtonAndEventListener(shipSelectionSection.lastChild, "submit", "submit-button", shipSelectionButtonStyleList, "bg-blue-500", () => {console.log("Button Clicked")});

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