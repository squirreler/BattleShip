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
  parent;
  length; // 2   3   4   5
  rotation; // - |
  placementLock;
  healthArray; // [o, o, x, o, x]
  locationArray;

  dragging;
  xTrans;
  yTrans;
  html;

  styleList; //Does not include color or length.
  // full styleList [display, rounded, color, width, height]
  constructor(shipName, length, rotation, color, parent, display, customStyleList) {
    console.log("-----e");
    console.log(customStyleList);
    console.log("-----e");
    this.parent = parent;
    this.length = length;
    this.rotation = rotation;
    this.placementLock = false;
    this.color = color;

    this.healthArray = this.initHealth();
    this.locationArray = this.location;

    this.dragging = false;
    this.xTrans = null;
    this.yTrans = null;
    if (typeof display !== "undefined") {
      this.styleList = [display, "rounded-full"];
    } else {
      this.styleList = ["flex", "rounded-full"];
    }

    if (typeof customStyleList !== "undefined") {
      // console.log("Custom Style List");
      // console.log(customStyleList);
      // console.log("The type of custom style list is: " + typeof customStyleList);
      // console.log("Custom style list is: ");
      // for (let i = 0; i < customStyleList.length; i++) {
      //     console.log(customStyleList[i]);
      // }
      console.log(
        shipName +
          " was sent: " +
          customStyleList[0] +
          " | " +
          customStyleList[1],
      );

      this.styleList.push(customStyleList[0], customStyleList[1]);

      console.log("------");
      console.log("Final Style List: "); // Custom stylelist only has x and y transform
      console.log(this.styleList);
      console.log("------");
    }

    this.html = createAndAppendChildElement(
      this.parent,
      "div",
      shipName,
      this.styleList,
    );

    this.html.classList.add(color);
    this.html.classList.add(
      this.calculateHTMLWidth(),
      this.calculateHTMLLength(),
    );
    console.log(this.location);
    console.log("location" + this.location);
    console.log(this.health);
    this.addEventListeners();
  }
  rotate() {
    if (this.placementLock) {
      return;
    }
    this.html.classList.remove(this.calculateHTMLWidth());
    this.html.classList.remove(this.calculateHTMLLength());
    this.rotation === "-" ? (this.rotation = "|") : (this.rotation = "-");
    console.log("rotating");
    this.html.classList.add(this.calculateHTMLWidth());
    this.html.classList.add(this.calculateHTMLLength());
  }

  get location() {
    if (typeof this.locationArray === "undefined") {
      return this.getNullArray(this.length);
    }
    return this.locationArray;
  }
  set location(array) {
    this.locationArray = array;
  }
  get health() {
    if (typeof this.healthArray === "undefined") {
      return this.getNullArray(this.length);
    }
    return this.healthArray;
  }
  set health(array) {
    if (typeof array === "undefined") {
      alert('Trying to set health, an undefined value, this is bad')
      return;
    }
    this.healthArray = array;
  }
  initHealth() {
    if (typeof this.healthArray !== "undefined") {
      alert('Heath inited twice, this really should not be happening');
      return;
    }
    let localArray = [];
    for (let i = 0; i < length; i++) {
      localArray.push("o");
    }
    return localArray;
  }
  getNullArray(length) {
    let localArray = [];
    for (let i = 0; i < length; i++) {
      localArray.push(null);
    }
    return localArray;
  }
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
    return this.html.getBoundingClientRect().x + 25; // SOmthing bad is happenin for the middle coords
  }
  get middleYCoordInPx() {
    // return this.html.getBoundingClientRect().y - 25 - (50 * (length - 1));
    return this.html.getBoundingClientRect().y;
  }
  get firstSquareXCoordInPx() {
    return this.html.getBoundingClientRect().x + 25;
  }
  get firstSquareYCoordInPx() {
    return this.html.getBoundingClientRect().y + 25;
  }
  get styleList() {}

  get isDestroyed() {
    for (sectionStatus of health) {
      if (sectionStatus === "o") {
        return false;
      }
    }
    return this.isDestroyed;
  }
  addEventListeners() {
    this.html.addEventListener("mousedown", (event) => {
      //use window.x when you use this for ship //make ship.style.display false; trhough minipulating classelist when drag start
      draggedItem = this;
      console.log(draggedItem.html);
      console.log("draggedItem.html" + draggedItem.html);
      let draggedItemHtml = this.html;
      draggedItemHtml.classList.remove(...draggedItemHtml.classList);
      draggedItemHtml.classList.add(
        "fixed",
        "rounded-full",
        draggedItem.color,
        this.calculateHTMLWidth(),
        this.calculateHTMLLength(),
      );
      draggedItem.dragging = true;
      let shipBoundingX =
        draggedItemHtml.getBoundingClientRect().x +
        (draggedItemHtml.getBoundingClientRect().right -
          draggedItemHtml.getBoundingClientRect().x) /
          2;
      let shipBoundingY =
        draggedItemHtml.getBoundingClientRect().y +
        (draggedItemHtml.getBoundingClientRect().bottom -
          draggedItemHtml.getBoundingClientRect().y) /
          2;
      console.log(shipBoundingX);
      console.log(shipBoundingY);
      // Here so it can be easily removed in the window event listener
      if (draggedItem.xTrans === null || draggedItem.yTrans === null) {
        let snapX =
          this.parent.getBoundingClientRect().x +
          (this.parent.getBoundingClientRect().right -
            this.parent.getBoundingClientRect().x) /
            2;
        let snapY =
          this.parent.getBoundingClientRect().y +
          (this.parent.getBoundingClientRect().bottom -
            this.parent.getBoundingClientRect().y) /
            2;
        draggedItem.xTrans = event.clientX - snapX;
        draggedItem.yTrans = event.clientY - snapY;

        // console.log(event.target);
        // console.log(event);
        //Would allow for it to work on mobile screen sizes but has been depreciated for more than 10 years and broken on webkit that tailwind uses
        //It works on any ship for the first time them breaks for all furthers ships
        // draggedItem.xTrans = event.layerX - snapX;
        // draggedItem.yTrans = snapY - event.layerY;

        // console.log(event);
        // console.log("snapX" + snapX);
        // console.log("snapY" + snapY);
        // console.log("eventX: " + event.layerX);
        // console.log("eventY" + event.layerY);
        // console.log(draggedItem.xTrans);
        // console.log(draggedItem.yTrans);
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
      console.log(event);
      let doesTheShipFit = shipFits(playerScreen, draggedItem);
      console.log(shipFits(playerScreen, draggedItem));
      console.log(
        "does the ship fit: " +
          doesTheShipFit.x +
          " | " +
          doesTheShipFit.y +
          " | " +
          doesTheShipFit.calc,
      );
      if (doesTheShipFit != false) {
        draggedItem.placementLock = true;
        draggedItem.location = doesTheShipFit.calc;
        console.log("Dragged ITem Location: " + draggedItem.location);
      } else {
        draggedItem.html.classList.remove(...draggedItem.html.classList);
        draggedItem.html.classList.add(...this.styleList);
        draggedItem.html.classList.add(
          this.calculateHTMLWidth(),
          this.calculateHTMLLength(),
          this.color,
        );
        draggedItem.xTrans = null;
        draggedItem.yTrans = null;
      }
      draggedItem.dragging = false;
      draggedItem = null;
    });
  }
}
// window.addEventListener("click", (event) => {
//   console.log("Clicked X Coord: " + event.clientX);
//   console.log("Clicked Y Coord: " + event.clientY);
// });
function createAndAppendChildElement(parent, elementString, id, styleList) {
  let element = document.createElement(elementString);
  element.id = id;
  element.classList.add(...styleList);
  parent.appendChild(element);
  return element;
}
function createAndAppendTextElement(
  parent,
  elementString,
  text,
  id,
  classList,
) {
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
  for (let i = 0; i < 100; i++) {
    // Get rid of async
    let screenDiv = document.createElement("div");
    screenDiv.id = `${Math.trunc(i / 10)}-${i % 10}`; //Theres no integer truncation for some reason...
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
function createScreen(parentDiv, outlineColor, id, styleList) {
  let screen = document.createElement("div");
  screen.classList.add(...styleList); // I love javascript
  screen.classList.add(outlineColor);
  screen.id = id;
  parentDiv.appendChild(screen);
  return screen;
}
function createButtonAndEventListener(
  parent,
  name,
  id,
  styleList,
  backgroundColor,
  onClickFunction,
) {
  let button = document.createElement("button");
  let lineBreak = false;
  for (let i = 0; i < name.length; i++) {
    // console.log(name[i]);
    if (name[i] === " ") {
      lineBreak = true;
      button.appendChild(document.createTextNode(name.slice(0, i)));
      button.appendChild(document.createElement("br"));
      button.appendChild(document.createTextNode(name.slice(i + 1)));
    }
  }
  if (lineBreak === false) {
    button.appendChild(document.createTextNode(name));
  }

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
    shipList.get(i).rotate();
  }
}
function xyCoordIsIn(parent, x, y) {
  let parentTopX = parent.getBoundingClientRect().x;
  let parentTopY = parent.getBoundingClientRect().y;
  let parentRightX = parent.getBoundingClientRect().right;
  let parentBottomX = parent.getBoundingClientRect().bottom;
  // console.log(parent.getBoundingClientRect().x);
  // console.log(parent.getBoundingClientRect().y);
  // console.log(parent.getBoundingClientRect().right);
  // console.log(parent.getBoundingClientRect().bottom);
  if (
    x > parentTopX &&
    x < parentRightX &&
    y > parentTopY &&
    y < parentBottomX
  ) {
    return true;
  }
  return false;
}
function calculateShipCoordsFromTopCoords(topX, topY, ship) {
  console.log("----------");
  console.log("topX: " + topX);
  console.log("topY: " + topY);
  console.dir("ship: " + ship);
  console.log("----------");
  let shipCoordsList = [];
  let incrementCoord = 0;
  let staticCoord = 0;
  console.log("ship rotation: " + ship.rotation);
  let coordGrid = 0;
  let refreshCoordGrid = 0;

  if (ship.rotation === "|") {
    incrementCoord = topY;
    staticCoord = topX;
    refreshCoordGrid = (incrementCoord, staticCoord) => {
      return `${staticCoord}-${incrementCoord}`;
    };
  } else {
    incrementCoord = topX;
    staticCoord = topY;
    refreshCoordGrid = (incrementCoord, staticCoord) => {
      return `${incrementCoord}-${staticCoord}`;
    };
  }

  if (
    incrementCoord < 0 ||
    topX > 9 ||
    topY > 9 ||
    incrementCoord > 9 ||
    topX < 0 ||
    topY < 0
  ) {
    //Perfect code...
    return false;
  }
  for (let i = 0; i < ship.length; i++) {
    shipCoordsList.push(refreshCoordGrid(incrementCoord, staticCoord));
    incrementCoord++;
    console.log("incrementCoord: " + incrementCoord);
    if (incrementCoord > 9 && i + 1 !== ship.length) {
      console.log("returning false");
      return false;
    }
  }
  console.log("ship Coord list: " + shipCoordsList);
  return shipCoordsList;

  //Return array of coords if fits, fals otherwisse
}
function shipFits(playerScreen, draggedShip) {
  //Assumes dragged item is in playerscreen due to the previous check
  let screenTopX = playerScreen.getBoundingClientRect().x;
  let screenTopY = playerScreen.getBoundingClientRect().y;
  // let screenRightX = playerScreen.getBoundingClientRect().right;
  // let screenBottomX = playerScreen.getBoundingClientRect().bottom;

  // let draggedItemTopX = draggedItem.html.getBoundingClientRect().x;
  //let draggedShipTopY = draggedShip.html.getBoundingClientRect().y;
  // let draggedItemRightX = draggedItem.html.getBoundingClientRect().right;
  // let draggedItemBottomX = draggedItem.html.getBoundingClientRect().bottom;

  let draggedShipStartGridX = draggedShip.firstSquareXCoordInPx;
  let draggedShipStartGridY = draggedShip.firstSquareYCoordInPx;
  console.log("Ship top grid center X coord: " + draggedShipStartGridX);
  console.log("Ship top grid center Y coord: " + draggedShipStartGridY);
  let gridDisplacementDistanceX = draggedShipStartGridX - screenTopX; // mabye use these values
  let gridDisplacementDistanceY = draggedShipStartGridY - screenTopY;
  if (
    gridDisplacementDistanceX > 500 ||
    gridDisplacementDistanceX < 0 ||
    gridDisplacementDistanceY > 500 ||
    gridDisplacementDistanceY < 0
  ) {
    return false;
  }
  console.log("draggedShipStartGridX: " + draggedShipStartGridX);
  console.log("draggedShipStartGridY: " + draggedShipStartGridY);
  let topGridSquareX = Math.trunc(gridDisplacementDistanceX / 50);
  let topGridSquareY = Math.trunc(gridDisplacementDistanceY / 50);
  console.log("topGridSquareX: " + topGridSquareX);
  console.log("topGridSquareY: " + topGridSquareY);
  // console.log("The output of the calculateshipcoords is: " + calculateShipCoordsFromTopCoords(topGridSquareX, topGridSquareY, draggedShip));
  let shipCoordCalc = calculateShipCoordsFromTopCoords(
    topGridSquareX,
    topGridSquareY,
    draggedShip,
  );
  console.log("shipCoordCalc: " + shipCoordCalc);
  if (shipCoordCalc !== false) {
    return { x: topGridSquareX, y: topGridSquareY, calc: shipCoordCalc };
  } else {
    return false;
  }

  console.log("gridDisplacementDistanceX: " + gridDisplacementDistanceX);
  console.log("gridDisplacementDistanceY: " + gridDisplacementDistanceY);
  console.log("screenTopY: " + screenTopY);
  console.log("draggedItemTopY: " + draggedShipTopY);
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
    if (draggedItem.placementLock) {
      return;
    }
    draggedItemHtml.classList.remove(`translate-x-[${draggedItem.xTrans}px]`);
    draggedItemHtml.classList.remove(`translate-y-[${draggedItem.yTrans}px]`);
    draggedItem.xTrans += event.movementX;
    draggedItem.yTrans += event.movementY;
    draggedItemHtml.classList.add(`translate-x-[${draggedItem.xTrans}px]`);
    draggedItemHtml.classList.add(`translate-y-[${draggedItem.yTrans}px]`);
  }
});

// let playerScreen = document.getElementById("player-screen");
let gameScreenSection = document.getElementById("game-screens");
const gameScreenSectionStyleList = [
  "flex",
  "flex-col",
  "nowrap",
  "items-center",
];

let gameInfoPanel = document.getElementById("game-info");

let playerScreenSection = null;
let computerScreenSection = null;
const screenSectionStyleList = ["flex", "flex-col", "nowrap", "items-center"];

let shipSelectionSection = document.getElementById("ship-selection");

let playerScreen = null;
let computerScreen = null;
const screenLengthWidthSizePx = 500;
const screenStyleList = [
  "flex",
  "flex-wrap",
  `w-[${screenLengthWidthSizePx}px]`,
  `h-[${screenLengthWidthSizePx}px]`,
  "bg-sky-500",
  "rounded-lg",
  "outline",
  "outline-8",
];
const squaresPerScreen = 100;
const gridSquareLengthWidthSizePx =
  (screenLengthWidthSizePx / squaresPerScreen) * 10;
const gridDivStyleList = [
  `w-[${gridSquareLengthWidthSizePx}px]`,
  `h-[${gridSquareLengthWidthSizePx}px]`,
  "flex",
  "justify-center",
  "align-center",
];

let shipSelectionSectionGrouping = null;
let shipSelectionSectionGroupingStyleList = ["flex", "flex-row", "gap-x-5"];

let shipSelectionScreen = null;
const shipSelectionSectionStyleList = [
  "flex",
  "flex-row",
  "wrap",
  "justify-center",
  "items-center",
  "gap-x-4",
  "gap-y-2",
  "py-4",
  "w-[500px]",
  "h-[270px]",
  "min-w-[300px]",
  "bg-cyan-200",
  "outline",
  "outline-4",
  "outline-cyan-600",
  "rounded-lg",
];

let shipSelectionButtonDiv = null;
const shipSelectionButtonDivStyleList = [
  "flex",
  "flex-col",
  "justify-center",
  "items-center",
  "w-[150px]",
  "h-[220]",
  "my-1",
  "py-3",
  "bg-cyan-200",
  "rounded-lg",
];

let rotateButton = null;
let startButton = null;
// const shipSelectionButtonStyleList = ["flex", "px-2", "py-2", "mx-2", "my-2", "rounded-full"];
const shipSelectionButtonStyleList = [
  "flex",
  "justify-center",
  "items-center",
  "px-2",
  "py-2",
  "mx-2",
  "my-2",
  "min-w-[120px]",
  "rounded-full",
  "text-white",
];

const screenSectionHeadingTextStyleList = ["pb-[10px]"];

const shipSelectionTextStyleList = ["py-1"];

playerScreenSection = createAndAppendChildElement(
  gameScreenSection,
  "section",
  "player-screen-section",
  screenSectionStyleList,
);
computerScreenSection = createAndAppendChildElement(
  gameScreenSection,
  "section",
  "computer-screen-section",
  screenSectionStyleList,
);
createAndAppendTextElement(
  playerScreenSection,
  "h1",
  "Your Ships",
  "",
  screenSectionHeadingTextStyleList,
);
createAndAppendTextElement(
  computerScreenSection,
  "h1",
  "Computers Ships",
  "",
  screenSectionHeadingTextStyleList,
);

playerScreen = createScreen(
  playerScreenSection,
  "outline-blue-700",
  "player-screen",
  screenStyleList,
);
computerScreen = createScreen(
  computerScreenSection,
  "outline-red-500",
  "player-screen",
  screenStyleList,
);
let playerGridBackgroundColor = "bg-sky-500";
let computerGridBackroundColor = "outline-rose-500";
createGrid(playerScreen, "outline-blue-700", "bg-sky-500", gridDivStyleList);
createGrid(computerScreen, "outline-rose-500", "bg-sky-500", gridDivStyleList); // set bg here

createAndAppendTextElement(
  shipSelectionSection,
  "h1",
  "Place Ships on your Grid",
  "",
  shipSelectionTextStyleList,
);
shipSelectionSectionGrouping = createAndAppendChildElement(
  shipSelectionSection,
  "div",
  "ship-selection-grouping",
  shipSelectionSectionGroupingStyleList,
);
shipSelectionScreen = createAndAppendChildElement(
  shipSelectionSectionGrouping,
  "div",
  "ship-selection-screen",
  shipSelectionSectionStyleList,
);

shipSelectionButtonDiv = createAndAppendChildElement(
  shipSelectionSectionGrouping,
  "div",
  "ship-selection-buttons",
  shipSelectionButtonDivStyleList,
);

function startGame() {
  alert("Game started");
  return 0;
}

class Game {
  playerShipList;
  computerShipList;
  playerScreen;
  computerScreen;
  winner; // String holding the value if who wins, if no winner is declared yet assigned to null
  messageText;
  messageTextBelow;
  messageTextClassList;
  state;

  playerTurnIcon;
  computerTurnIcon;

  constructor(
    playerShipList,
    computerShipList,
    playerScreen,
    computerScreen,
    playerTurnIcon,
    computerTurnIcon,
  ) {
    this.playerScreen = playerScreen;
    this.computerScreen = computerScreen;
    this.playerShipList = playerShipList;
    this.computerShipList = computerShipList;
    this.playerTurnIcon = playerTurnIcon;
    this.computerTurnIcon = computerTurnIcon;
    this.winner = null;
    this.messageTextClassList = [];
    this.state = "gameNotStarted"; // So I can easily trace where the logic is when bughunting
    this.messageText = null;
    this.messageTextBelow = null;
  }
  start() {
    alert("game started");
    this.messageText = createAndAppendTextElement(
      shipSelectionScreen,
      "h1",
      "Your Move: ",
      "shipSelectionScreen",
      this.messageTextClassList,
    );
    this.messageTextBelow = createAndAppendTextElement(
      shipSelectionScreen,
      "h1",
      "Click on Enemy Grid Board to Attack!",
      "shipSelectionScreen",
      this.messageTextClassList,
    );
    this.state = "gameStarted";
    if (this.computerShipList.manuallyAssignCoords() === true) {
      alert("Computer ship list set");
    }
    this.playerShipList.printShipInfo();
    this.computerShipList.printShipInfo();

    this.createPlayerMove();
    // this.createComputerMove();

    //Asnc function that check if winner equals sothing outer than null every .1 seconds, not idea but I want this shit done!!!!!
  }
  createPlayerMove() {
    this.state = "waitingForPlayerInput";
    computerScreen.addEventListener("click", (event) => {
      if (this.state !== "waitingForPlayerInput") {
        return;
      }
      console.log("---------------------------------------");
      console.log("Player Attack Click");
      let screenTopX = computerScreen.getBoundingClientRect().x;
      let screenTopY = computerScreen.getBoundingClientRect().y;
      console.log("Attack click event: " + event);
      let eventClickCoordX = event.clientX;
      let eventClickCoordY = event.clientY;
      console.log("event Click Coord X: " + eventClickCoordX);
      console.log("event Click Coord Y: " + eventClickCoordY);
      let gridDisplacementDistanceX = eventClickCoordX - screenTopX; // mabye use these values
      let gridDisplacementDistanceY = eventClickCoordY - screenTopY;
      if (
        gridDisplacementDistanceX > 500 ||
        gridDisplacementDistanceX < 0 ||
        gridDisplacementDistanceY > 500 ||
        gridDisplacementDistanceY < 0
      ) {
        alert("Did not click on a valid grid square");
      }
      console.log("gridDisplacementCoordX: " + gridDisplacementDistanceX);
      console.log("gridDisplacementCoordY: " + gridDisplacementDistanceY);
      let topGridSquareX = Math.trunc(gridDisplacementDistanceX / 50);
      let topGridSquareY = Math.trunc(gridDisplacementDistanceY / 50);
      console.log("topGridSquareX: " + topGridSquareX);
      console.log("topGridSquareY: " + topGridSquareY);
      console.log("---------------------------------------");

      // Take the x y coords, turn them into grid coords,  and pass them through player ship list,
      //if any of the grid coords match the ship grid cords, change the health status of the computer ship
      //In the same scope turn the grid cords into an id and use it to identify and change the styling of the
      //grid coord square thing so it is white if no ship, or has a red x with an elevated z axis if hit

      //Need a function to pass x and y coords as an attack and have the damage be done
      //There needs to be a isDead function in shiplist to check if all ships have been decimated.
      //Then i'm basically done, I need to make sure my homework is in order first

      // Tak
      console.log("ComputerGameScreenClickEvent: ", event);
    });
  }
  createComputerMove() {
    // this.state = "waitingForComputerInput";
    playerScreen.addEventListener("click", (event) => {
      if (this.state !== "waitingForPlayerInput") {
        return;
      }

      //Generate coords at random, within the bounds of grid coords, and pass them through the player ship list,
      //if any of the grid coords match the ship grid cords, change the health status of the player ship
      // Take the x y coords, turn them into grid coords,  and pass them through player ship list,
      //In the same scope turn the grid cords into an id and use it to identify and change the styling of the
      //grid coord square thing so it is white if no ship, or has a red x with an elevated z axis if hit
      //Check for player death using shiplist method, set this winner uppon death

      //

      // Tak
      console.log("ComputerGameScreenClickEvent: ", event);
    });
  }

  removeShipSelectionStuff() {
    // let shipSelectionStuff = document.getElementById("ship-selection");
    // shipSelectionStuff.remove();
  }
  addMarkToGridSquare(gridSquare, mark) {
    if (typeof mark !== "string") {
      alert("addMarkTOGridSquare invalid mark parameter input");
    }
    if (mark === "x") {
      createAndAppendTextElement(gridSquare, "h1", "x", "", [
        "text-red-500",
        "text-5xl",
        "z-10",
      ]);
      if (gridSquare.parentElement.id === "player-screen") {
        gridSquare.classList.remove(playerGridBackgroundColor);
      }
      if (gridSquare.parentElement.id === "computer-screen") {
        gridSquare.classList.remove(computerGridBackroundColor);
      }
      gridSquare.classList.add("bg-red-300");
    }
    if (mark === "o") {
      if (gridSquare.parentElement.id === "player-screen") {
        gridSquare.classList.remove(playerGridBackgroundColor);
      }
      if (gridSquare.parentElement.id === "computer-screen") {
        gridSquare.classList.remove(computerGridBackroundColor);
      }
      gridSquare.classList.add("bg-sky-200");
    }
  }
}

class ShipList {
  carrier;
  battleship;
  submarine;
  patrolBoat;
  parent;

  constructor(parent, display) {
    if (typeof parent === "undefined") {
      alert("invalid parent parmeter for the shiplist constructor");
    }
    this.parent = parent;
    (this.carrier = new ship(
      "carrier",
      5,
      "|",
      "bg-blue-900",
      parent,
      display,
    )),
      (this.battleShip = new ship(
        "battleship",
        4,
        "|",
        "bg-stone-500",
        parent,
        display,
      )),
      (this.submarine = new ship(
        "submarine",
        3,
        "|",
        "bg-rose-900",
        parent,
        display,
      )),
      (this.patrolBoat = new ship(
        "patrol boat",
        2,
        "|",
        "bg-emerald-900",
        parent,
        display,
      ));
  }
  get(index) {
    if (typeof index === "string") {
      switch (index) {
        case "carrier":
          return this.carrier;
        case "battleship":
          return this.battleShip;
        case "submarine":
          return this.submarine;
        case "patrolBoat":
        case "patrol boat":
          return this.patrolBoat;
      }
      alert("shipList get function does not recognize string");
    } else if (typeof index === "number") {
      switch (index) {
        case 0:
          return this.carrier;
        case 1:
          return this.battleShip;
        case 2:
          return this.submarine;
        case 3:
          return this.patrolBoat;
      }
      alert("shipList get function does not recognize index");
    } else {
      alert("Getting index of ship has failed");
      return null;
    }
  }
  get length() {
    return 4;
  }

  reset(parent) {
    if (typeof parent !== "undefined") {
      this.parent = parent;
      console.log("Typeof parent = " + typeof parent);
    }
    for (let i = 0; i < this.length; i++) {
      this.get(i).html.remove();
    }
    this.carrier = new ship("carrier", 5, "|", "bg-blue-900", this.parent);
    this.battleShip = new ship(
      "battleship",
      4,
      "|",
      "bg-stone-500",
      this.parent,
    );
    this.submarine = new ship("submarine", 3, "|", "bg-rose-900", this.parent);
    this.patrolBoat = new ship(
      "patrol boat",
      2,
      "|",
      "bg-emerald-900",
      this.parent,
    );
  }
  reassignParent(parent) {
    if (typeof parent !== "undefined") {
      this.parent = parent;
      console.log("Typeof parent = " + typeof parent);
    }
    // draggedItemHtml.classList.add(`translate-x-[${draggedItem.xTrans}px]`);
    //     draggedItemHtml.classList.add(`translate-y-[${draggedItem.yTrans}px]`);
    let previousStyleLists = [];
    for (let i = 0; i < this.length; i++) {
      let localArray = [
        `translate-x-[${this.get(i).xTrans}px]`,
        `translate-y-[${this.get(i).yTrans}px]`,
      ];
      previousStyleLists.push(localArray);
    }
    for (let i = 0; i < this.length; i++) {
      this.get(i).html.remove();
    }
    console.log("-------------------");
    console.log("Previous Style Lists: " + previousStyleLists);
    console.log([previousStyleLists[0]]);
    console.log([previousStyleLists[1]]);
    console.log([previousStyleLists[2]]);
    console.log([previousStyleLists[3]]);
    console.log("-------------------");
    this.carrier = new ship(
      "carrier",
      5,
      "|",
      "bg-blue-900",
      this.parent,
      "fixed",
      previousStyleLists[0],
    ); //Mark
    this.battleShip = new ship(
      "battleship",
      4,
      "|",
      "bg-stone-500",
      this.parent,
      "fixed",
      previousStyleLists[1],
    );
    this.submarine = new ship(
      "submarine",
      3,
      "|",
      "bg-rose-900",
      this.parent,
      "fixed",
      previousStyleLists[2],
    );
    this.patrolBoat = new ship(
      "patrol boat",
      2,
      "|",
      "bg-emerald-900",
      this.parent,
      "fixed",
      previousStyleLists[3],
    );
  }
  checkShipOverlap() {
    let coordList = [];
    for (let i = 0; i < this.length; i++) {
      if (this.get(i).location[i] === null) {
        alert("not all ships are placed");
        return false;
      }
      coordList.push(...this.get(i).location);
      // for (let j = 0; j < this.get(i)[i].length; j++) {
      //     coordList.push(this.get(i).location);
      // }
    }
    console.log("Ship coord List: " + coordList);
    for (let i = 0; i < coordList.length - 1; i++) {
      coordList.sort();
      if (coordList[i] === coordList[i - 1]) {
        return false;
      }
    }
    console.log("Ship coord List: " + coordList);
    return true;
  }
  getRandomInt(max) {
    //Copied entire function from mdn
    return Math.floor(Math.random() * max);
  }
  getRandomFilteredGridCoords(shipLength) {
    let coordsList = [];
    let gridLength = 10;
    let rotation = this.getRandomInt(2);
    let randomX = null;
    let randomY = null;
    rotation === 0 ? (rotation = "|") : (rotation = "-");
    if (rotation === "|") {
      randomX = this.getRandomInt(10);
      randomY = this.getRandomInt(gridLength - shipLength + 1);
    }
    if (rotation === "-") {
      randomX = this.getRandomInt(gridLength - shipLength + 1);
      randomY = this.getRandomInt(10);
    }
    for (let i = 0; i < shipLength; i++) {
      coordsList.push(`${randomX}-${randomY}`);
      rotation === "|" ? randomY++ : randomX++;
    }
    return coordsList;
  }
  manuallyAssignCoords() {
    let localCoordList = [];
    for (let i = 0; i < this.length; i++) {
      let localShip = this.get(i);
      let randomFilteredCoords = this.getRandomFilteredGridCoords(
        localShip.length,
      );
      localShip.location = randomFilteredCoords;
      localCoordList.push(localShip.location);
    }
    if (this.checkShipOverlap()) {
      console.log("Computer ships are placed correctily");
      console.log("Final Enemy Ship Coord List", localCoordList.sort());
      return true;
    } else {
      return this.manuallyAssignCoords();
    }
  }
  printShipInfo() {
    console.log("----------");
    // console.log(this.parent[0]);
    let shipInfoArray = [];
    shipInfoArray.push(["Coords"]);
    for (let i = 0; i < this.length; i++) {
      shipInfoArray[0].push(this.get(i).location);
    }
    shipInfoArray.push(["Health"]);
    for (let i = 0; i < this.length; i++) {
      shipInfoArray[1].push(this.get(i).health);
    }
    console.log(shipInfoArray);
    console.log("----------");
  }
}
let playerTurnIcon = null;
let computerTurnIcon = null;

let playerShipList = new ShipList(shipSelectionScreen);
let computerShipList = new ShipList(shipSelectionScreen, "hidden");
// let computerShipList = new ShipList(document.body);
let battleShipGame = new Game(
  playerShipList,
  computerShipList,
  playerScreen,
  computerScreen,
  playerTurnIcon,
  computerTurnIcon,
);

let gridSquare = document.getElementById("0-0");
let egridSquare = document.getElementById("0-1");

battleShipGame.addMarkToGridSquare(gridSquare, "x");
battleShipGame.addMarkToGridSquare(egridSquare, "o");
rotateButton = createButtonAndEventListener(
  shipSelectionButtonDiv,
  "rotate",
  "rotate-button",
  shipSelectionButtonStyleList,
  "bg-red-500",
  () => {
    let shipSelectionScreenClassList = shipSelectionScreen.classList;
    if (shipSelectionScreenClassList.contains("flex-col")) {
      shipSelectionScreenClassList.remove("flex-col");
      shipSelectionScreenClassList.add("flex-row");
    } else if (shipSelectionScreenClassList.contains("flex-row")) {
      shipSelectionScreenClassList.remove("flex-row");
      shipSelectionScreenClassList.add("flex-col");
    }
    rotateAllShips(playerShipList);
  },
);

startButton = createButtonAndEventListener(
  shipSelectionButtonDiv,
  "submit",
  "submit-button",
  shipSelectionButtonStyleList,
  "bg-blue-500",
  () => {
    if (playerShipList.checkShipOverlap()) {
      let shipSelectionScreenClassList = shipSelectionScreen.classList;
      if (shipSelectionScreenClassList.contains("flex-row")) {
        shipSelectionScreenClassList.remove("flex-row");
        shipSelectionScreenClassList.add("flex-col");
      }
      battleShipGame.start();
      startButton.remove();
      rotateButton.remove();
      playerTurnIcon = createButtonAndEventListener(
        shipSelectionButtonDiv,
        "Player Turn",
        "player-turn-button",
        shipSelectionButtonStyleList,
        "bg-blue-500",
      );
      computerTurnIcon = createButtonAndEventListener(
        shipSelectionButtonDiv,
        "Computer Turn",
        "player-turn-button",
        shipSelectionButtonStyleList,
        "bg-red-500",
      );
    } else {
      alert("Ships are overlapping");
      playerShipList.reset();
    }
  },
);


//Need to get snap to grid working

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
