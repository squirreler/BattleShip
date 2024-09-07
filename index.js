//On mouse down
// set draggedItem ship
// set dragged true
// setx trans and y trans to zero
//Add x and y trans to the css class
//On pointer move context window
// remove x and y trans from css classes
// move the ship by incremeting x and y trans by the cursors event.movement values and changing the x and y trans css classes to the new trans values
//on mouse down set all variables to null, remove x and y trans classes




//Create eventlistener in ship class
//set create and append to field

//Your priority is to build out corrdinate system tracking.
let draggedItem = null;
class ship {
    length;   // 2-5
    rotation; // - |
    health; // [o, o, x, o, x]
    location;

    dragging;
    xTrans; 
    yTrans;
    html;

    styleList;//Does not include color or length. 
    // full styleList [display, rounded, color, width, height]
    constructor(shipName, length, rotation, color) {
        this.length = length;
        this.rotation = rotation;
        this.color = color;
        this.health = () => {
            let healthArray = [];
            for (let i = 0; i < this.length;i++) {this.health.push("o");};
            return healthArray;
        };
        this.location = () => {
            let locationArray = [];
            for (let i = 0; i < this.length;i++) {this.location.push(null);};
            return locationArray;
        };

        this.dragging = false;
        this.xTrans = null;
        this.yTrans = null;
        this.styleList = ["flex", "rounded-full"];
        this.html = createAndAppendChildElement(shipSelectionScreen, "div", shipName, this.styleList);

        this.html.classList.add(color);
        this.html.classList.add(this.calculateHTMLWidth(), this.calculateHTMLLength());
        console.log(this.location);
        console.log(this.health);
        this.addEventListeners();
        
    }
    rotate() {
        this.html.classList.remove(this.calculateHTMLWidth());
        this.html.classList.remove(this.calculateHTMLLength());
        this.rotation === "-" ? this.rotation = "|" : this.rotation = "-";
        console.log("rotating");
        this.html.classList.add(this.calculateHTMLWidth());
        this.html.classList.add(this.calculateHTMLLength());
        // this.html.classList.add();
        // if (this.rotation === "-" ){
        //     this.rotation == "|";
        // } else {

        // }
    }
    // placeToGrid(x, y, rotation) {
    //     this.topXCoord = x;
    //     this.topYCoord = y;
    //     this.rotation = rotation;
    // }
    calculateHTMLWidth() {
        if (this.rotation === "-") {
            return `w-[${this.length * 50}px]`;
        } else {
            return "w-[50px]";
        }
    }
    calculateHTMLLength() {
        if (this.rotation === "|") {
            return `h-[${this.length * 50}px]`;
        } else {
            return "h-[50px]";
        }
    }
    get middleXCoordInPx() {
        return this.html.getBoundingClientRect().x + 25;
    }
    get middleYCoordInPx() {
        // return this.html.getBoundingClientRect().y - 25 - (50 * (length - 1));
        return this.html.getBoundingClientRect().y;
    }
    get firstSquareXCoordInPx() {
        return this.html.getBoundingClientRect().x + 25;
    }
    get firstSquareYCoordInPx() {
        return this.html.getBoundingClientRect().y - 25;
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
    addEventListeners() {
        this.html.addEventListener("mousedown", (event) => { //use window.x when you use this for ship //make ship.style.display false; trhough minipulating classelist when drag start
            draggedItem = this;
            let draggedItemHtml = this.html;
            draggedItemHtml.classList.remove(...draggedItemHtml.classList);
            draggedItemHtml.classList.add("fixed", "rounded-full", draggedItem.color, this.calculateHTMLWidth(), this.calculateHTMLLength());
            draggedItem.dragging = true;

             // Here so it can be easily removed in the window event listener
            if (draggedItem.xTrans === null || draggedItem.yTrans === null) {
                let snapX = shipSelectionScreen.getBoundingClientRect().x + (shipSelectionScreen.getBoundingClientRect().right - shipSelectionScreen.getBoundingClientRect().x) / 2;
                let snapY = shipSelectionScreen.getBoundingClientRect().y + (shipSelectionScreen.getBoundingClientRect().bottom - shipSelectionScreen.getBoundingClientRect().y) / 2;
                draggedItem.xTrans = event.x - snapX; 
                draggedItem.yTrans = event.y - snapY;
                // console.log(event);
                // console.log("snapX" + snapX);
                // console.log("snapY" + snapY);
                // console.log(draggedItem.xTrans);
                // console.log(draggedItem.yTrans);
                //clientX
                //page
                //screen
                //x
                //Need to figure out why it does not work on mobile
                
            }
            // console.log(draggedItem.xTrans);
            draggedItemHtml.classList.add(`translate-x-[${draggedItem.xTrans}px]`);
            draggedItemHtml.classList.add(`translate-y-[${draggedItem.yTrans}px]`);
        });

        this.html.addEventListener("mouseup", (event) => {
            //if can snap into box, set ship coords to box coords with offset if needed
            //Else mov it back to where it was initially by giving its old classes back
            console.log("----------");
            console.log(event.x);
                console.log(event.y);
                console.log(this.html.getBoundingClientRect().x);
                console.log(this.html.getBoundingClientRect().y);
            if (false) {
                
            } else {
                draggedItem.html.classList.remove(...draggedItem.html.classList);
                draggedItem.html.classList.add(...this.styleList);
                draggedItem.html.classList.add(this.calculateHTMLWidth(), this.calculateHTMLLength(), this.color);
                draggedItem.xTrans = null;
                draggedItem.yTrans = null;
            }
            draggedItem.dragging = false;
            draggedItem = null;
        });
    }
}

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
function rotateAllShips(shipList) {
    for (let i = 0; i < shipList.length; i++) {
        shipList[i].rotate();
    }
}






document.addEventListener("pointermove", (event) => {
    
    if (draggedItem !== null && draggedItem.dragging === true) {
        let draggedItemHtml = draggedItem.html;
        // console.log(dragging);
        // console.log(event);
        // console.log("pointer is moving")
        if (event.movementX !== 0) {
            // console.log(event.movementX);
        } 
        draggedItemHtml.classList.remove(`translate-x-[${draggedItem.xTrans}px]`);
        draggedItemHtml.classList.remove(`translate-y-[${draggedItem.yTrans}px]`);
        draggedItem.xTrans += event.movementX;
        draggedItem.yTrans += event.movementY;
        draggedItemHtml.classList.add(`translate-x-[${draggedItem.xTrans}px]`);
        draggedItemHtml.classList.add(`translate-y-[${draggedItem.yTrans}px]`);
    }
})































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
const shipSelectionSectionStyleList = ["flex", "flex-row", "wrap", "justify-center", "items-center","gap-x-4", "py-4", "w-[500px]", "h-[270px]", "min-w-[300px]", "bg-cyan-200", "outline", "outline-4", "outline-cyan-600", "rounded-lg"]

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














let playerCarrier = new ship("carrier", 5, "|", "bg-blue-900");
let playerBattleShip = new ship("battleship", 4, "|", "bg-stone-500");
let playerSubmarine = new ship("submarine", 3,"|", "bg-rose-900");
let playerPatrolBoat = new ship("patrol boat", 2, "|", "bg-emerald-900");

let playerShipList = [playerCarrier, playerBattleShip, playerSubmarine, playerPatrolBoat]

rotateButton = createButtonAndEventListener(shipSelectionButtonDiv, "rotate", "rotate-button", shipSelectionButtonStyleList, "bg-red-500", () => {
    let shipSelectionScreenClassList = shipSelectionScreen.classList;
    if (shipSelectionScreenClassList.contains("flex-col") ) {
        shipSelectionScreenClassList.remove("flex-col");
        shipSelectionScreenClassList.add("flex-row");
    } else {
        shipSelectionScreenClassList.remove("flex-row");
        shipSelectionScreenClassList.add("flex-col");
    }
    rotateAllShips(playerShipList);
});

startButton = createButtonAndEventListener(shipSelectionButtonDiv, "submit", "submit-button", shipSelectionButtonStyleList, "bg-blue-500", () => {console.log("Button Clicked")});
// patrolBoat.rotate();

// let computerCarrier = new ship("carrier", 5, "|", "bg-blue-900");
// let computerBattleShip = new ship("battleship", 4, "|", "bg-stone-500");
// let computerSubmarine = new ship("submarine", 3,"|", "bg-rose-900");
// let computerPatrolBoat = new ship("patrol boat", 2, "|", "bg-emerald-900");

// console.log(patrolBoat.rotation);


//Carrier BattleShip Sumbarine, patrol boat

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