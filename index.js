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

function createGrid(parentDiv, tailwindOutlineColorString, backgroundColor, styleList) {
    for (let i = 0; i < 100; i++) { // Get rid of async
        let screenDiv = document.createElement("div");
        screenDiv.id = `${ Math.trunc(i / 10)}-${i % 10}` //Theres no integer truncation for some reason...
        screenDiv.classList.add(...styleList);
        screenDiv.classList.add("outline", tailwindOutlineColorString);
        screenDiv.classList.add(backgroundColor);
        if (i % (squaresPerScreen / 10) === 0) {
            screenDiv.classList.add("rounded-l-sm");
        }
        if (i % (squaresPerScreen / 10) === 9) {
            screenDiv.classList.add("rounded-r-sm");
        }
        parentDiv.appendChild(screenDiv);
        
    }
}
function createScreen(parentDiv,outlineColor, id, styleList) {
    let screen = document.createElement("div");
    screen.classList.add(...styleList); // I love javascript
    screen.classList.add(outlineColor);
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
const gameScreenSectionStyleList = ["flex", "flex-col", "nowrap", "items-center"];



let gameInfoPanel = document.getElementById("game-info");

let playerScreenSection = null;
let computerScreenSection = null;
const screenSectionStyleList = ["flex", "flex-col", "nowrap", "items-center"];

let shipSelectionSection = document.getElementById("ship-selection");

let playerScreen = null;
let computerScreen = null;
const screenLengthWidthSizePx = 500;
const screenStyleList = ["flex", "flex-wrap", `w-[${screenLengthWidthSizePx}px]`, `h-[${screenLengthWidthSizePx}px]`, "bg-sky-500", "rounded-lg", "outline", "outline-8"];
const squaresPerScreen = 100;
const gridSquareLengthWidthSizePx = screenLengthWidthSizePx / squaresPerScreen * 10;
const gridDivStyleList = [`w-[${gridSquareLengthWidthSizePx}px]`, `h-[${gridSquareLengthWidthSizePx}px]`]; 


let shipSelectionSectionGrouping = null;
let shipSelectionSectionGroupingStyleList = ["flex", "flex-row", "gap-x-5"];



let shipSelectionScreen = null;
const shipSelectionSectionStyleList = ["flex", "flex-row", "justify-center", "items-center","py-4", "w-[550px]", "h-[230px]", "min-w-[300px]", "bg-cyan-200", "outline", "outline-4", "outline-cyan-600", "rounded-lg"]

let shipSelectionButtonDiv = null;
const shipSelectionButtonDivStyleList = ["flex", "flex-col", "justify-center", "items-center", "px-4", "my-1", "py-3", "bg-cyan-200", "rounded-lg"];


let rotateButton = null;
let startButton = null;
const shipSelectionButtonStyleList = ["flex", "px-4", "py-2", "mx-2", "my-2", "rounded-full"];


const screenSectionHeadingTextStyleList = ["py-4"];


const shipSelectionTextStyleList = ["py-1"];







playerScreenSection = createAndAppendChildElement(gameScreenSection, "section", "player-screen-section", screenSectionStyleList);
computerScreenSection = createAndAppendChildElement(gameScreenSection, "section", "computer-screen-section", screenSectionStyleList);
createAndAppendTextElement(playerScreenSection, "h1", "Your Ships", "", screenSectionHeadingTextStyleList);
createAndAppendTextElement(computerScreenSection, "h1", "Computers Ships", "", screenSectionHeadingTextStyleList);


playerScreen = createScreen(playerScreenSection, "outline-blue-700", "player-screen", screenStyleList);
computerScreen = createScreen(computerScreenSection, "outline-red-500","player-screen", screenStyleList);
createGrid(playerScreen, "outline-blue-700","bg-sky-500",gridDivStyleList);
createGrid(computerScreen, "outline-rose-500", "bg-sky-500", gridDivStyleList); // set bg here



createAndAppendTextElement(shipSelectionSection, "h1", "Choose Ships", "", shipSelectionTextStyleList);
shipSelectionSectionGrouping = createAndAppendChildElement(shipSelectionSection, "div", "ship-selection-grouping", shipSelectionSectionGroupingStyleList);
shipSelectionScreen = createAndAppendChildElement(shipSelectionSectionGrouping, "div", "ship-selection-screen", shipSelectionSectionStyleList);

shipSelectionButtonDiv = createAndAppendChildElement(shipSelectionSectionGrouping, "div", "ship-selection-buttons",shipSelectionButtonDivStyleList);

//Tune colors later
rotateButton = createButtonAndEventListener(shipSelectionButtonDiv, "rotate", "rotate-button", shipSelectionButtonStyleList, "bg-red-500", () => {console.log("Button Clicked")});
rotateButton.draggable = true;
console.dir(rotateButton);
startButton = createButtonAndEventListener(shipSelectionButtonDiv, "submit", "submit-button", shipSelectionButtonStyleList, "bg-blue-500", () => {console.log("Button Clicked")});


rotateButton.addEventListener("mouseUp", (event) => { //use window.x when you use this for ship //make ship.style.display false; trhough minipulating classelist when drag start
    console.log(event);
    rotateButton.classList.add("hidden"); // Drag and drop api is overkill for my uses, just use event listeners to make the thing draggable. 
});

//Your priority is to build out corrdinate system tracking.
class ship {
    length;   // 2-5
    rotation; // - |
    health; // [o, o, x, o, x]
    topXCoord;
    topYCoord;
    constructor(length, rotation, color) {
        this.length = length;
        this.rotation = rotation;
        this.color = color;
        this.topXCoord = null;
        this.topYCOord = null;
        this.health = () => {
            let healthArray = [];
            for (let i = 0; i < this.length;i++) {this.health.push("o");};
            return healthArray;
        };
        console.log(this.health);
        

    }
    placeToGrid(x, y, rotation) {
        this.topXCoord = x;
        this.topYCoord = y;
        this.rotation = rotation;
    }
    render() {
        
    }
    get isDestroyed() {
        let isDestroyed = true;
        for (sectionStatus of health) {
            if (sectionStatus === "o") {
                return false;
            }
        }
        return this.isDestroyed;
    }
    // set health() {
    //     return this.health;            //Need to work more on placing ships before I can confidently draw up the structure of this class. 
    // }
    // [o, o, o, x]
    //isDead
    //etc

}

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