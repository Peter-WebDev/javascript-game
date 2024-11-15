window.addEventListener("DOMContentLoaded", main);

/**
 * Global variable containing an array of propertys for the game
 * @typedef {Object} GameState
 * @property {string} name Player's name for the character
 * @property {number} money Player's current amount of money 
 * @property {string[]} inventory Player's current inventory items 
 * @property {string} scene Current scene name
 * @property {Audio} audio Audio files used in the game
 */

/**
 * @type {GameState}
 */
let gameState = {
  name: "",
  money: 50,
  inventory: {
    "Knife": 1,
  },
  scene: "StartScene",
  audio: [
    "assets/music/tawny-owl-in-molkom-sweden.mp3",
    "assets/music/dark-mystery-cinematic-melody.mp3"
  ]
};

/**
 * Create array of Audio objects from the files listed in the game state audio property
 * @typedef {string} Audio
*/
const audioTracks = gameState.audio.map(audioFile => new Audio(audioFile));

/**
 * Array of button names
 */
const buttonNames = ["West", "East", "North", "South", "Pick up", "Give coins", "Touch Orb", "Retry", "New character", "Start", "Play again"];

/**
 * Set name and save state to local storage
 * @param {string} name Username in the game to be set
 */
function setName(name) {
  gameState.name = name;
  saveGameState();
}

/**
 * Set current money and save state to local storage
 * @param {string} name - Amount of money
 */
function setMoney(name) {
  gameState.money = name;
  saveGameState();
}

/**
 * Set current inventory and save state to local storage
 * @param {string} name Inventory object
 */
function setInventory(name) {
  gameState.inventory = name;
  saveGameState();
}

/** 
 * Set current scene name and save state to local storage
 * @param {string} name - Scene name to be set
 */
function setScene(name) {
  gameState.scene = name;
  saveGameState();
}

/**
 * Update display of money and inventory
 */
function updateDisplay() {
  const inventoryContainer = document.getElementById("inventory-container");

  // Ensure the ul element exists
  let itemList = inventoryContainer.querySelector("ul");
  if (!itemList) {
    itemList = document.createElement("ul");
    itemList.classList.add("item-list");
    inventoryContainer.appendChild(itemList);
  }

  // Update money item
  const moneyItem = itemList.querySelector("li:first-child");
  if (!moneyItem) {
    const moneyItem = document.createElement("li");
    moneyItem.textContent = "Coins (" + gameState.money + ")";
    itemList.appendChild(moneyItem);
  } else {
    moneyItem.textContent = "Coins (" + gameState.money + ")";
  }

  // Clear inventory items (except the first one)
  const inventoryItems = itemList.querySelectorAll("li:not(:first-child)");
  inventoryItems.forEach(item => item.remove());

  // Add new inventory items
  for (const [item, quantity] of Object.entries(gameState.inventory)) {
    const inventoryItem = document.createElement("li");
    inventoryItem.textContent = `${item} (${quantity})`;
    itemList.appendChild(inventoryItem);
  }

  saveGameState();
}

/**
 * Increases the player's money  if triggered
 * @param {number} amount  
 */
function increaseMoney(amount) {
  gameState.money += amount;
  saveGameState();
  updateDisplay();
}

/**
 * Decrease the player's money if triggered
 * @param {number} amount The amount to decrease
 */
function decreaseMoney(amount) {
  // Tries to decrease money, but also prevent negative number
  if (gameState.money >= amount) {
    gameState.money -= amount;
    saveGameState();
    updateDisplay();
  } else {
    console.log("Not enough money");
    alert("Not enough money");
  } 
}

/**
 * Adds item to player's inventory if new one or increment its quantity
 * @param {string} item The name of the item to add
 */
function addItemToInventory(item) {
  gameState.inventory[item] = (gameState.inventory[item] || 0) + 1;
  saveGameState();
  updateDisplay();
}

/**
 * Removes item from the player's inventory if triggered
 * @param {string} item The item name to be removed
 */
function removeItemFromInventory(item) {
  if (gameState.inventory[item] > 0) {
    gameState.inventory[item]--;
    updateDisplay();
    saveGameState();
  } else {
    console.log("Item not found in inventory");
    alert("Item not found in inventory");
  }
}

function createInventoryButton(index, action, value, container) {
  const button = document.createElement("button");
  button.classList.add("btn");
  button.textContent = buttonNames[index];

  switch (action) {
    case "increaseMoney":
      button.addEventListener("click", () => {
        increaseMoney(value);
      });
      break;
    case "decreaseMoneyOne":
      button.addEventListener("click", () => {
        decreaseMoney(value);
        // Create a new button after the action
        createButton(3, "south", createSceneForestTwo, container);
        button.remove();
      });
      break;
    case "decreaseMoneyTwo":
      button.addEventListener("click", () => {
        decreaseMoney(value);
        // Create a new button after the action
        createButton(6, "movecloser", createSceneFinal, container);
        button.remove();
      });
      break;
    case "decreaseMoneyThree":
      button.addEventListener("click", () => {
        decreaseMoney(value);
        // Create a new button after the action
        createButton(1, "east", createSceneCaveTwo, container);
        button.remove();
      });
      break;
     case "decreaseMoneyFour":
      button.addEventListener("click", () => {
        decreaseMoney(value);
        // Create a new button after the action
        createButton(6, "movecloser", createSceneFinal, container);
        button.remove();
      });
      break;
    case "addItem":
      button.addEventListener("click", () => {
        addItemToInventory(value);
        button.remove();
      });
      break;
    default:
      console.error("Invalid action", action);
  }

  container.appendChild(button);
}

/** 
 * Starts the game and loads the saved game state and current scene 
 */
function main() {
  const savedState = loadGameState();
  if (savedState) {
    gameState = savedState;
  }
  loadScene(gameState.scene);
}

/** 
 * Load current scene based on scene name
 * @param {string} sceneName Scene name to load
 */
function loadScene(sceneName) {
  switch (sceneName) {
    case "SceneMain":
      createSceneMain();
      break;
    case "SceneAltMain":
      createSceneAltMain();
      break;
    case "SceneForestOne":
      createSceneForestOne();
      break;
    case "SceneForestTwo":
      createSceneForestTwo();
      break;
    case "SceneForestThree":
      createSceneForestThree();
      break;
    case "SceneCaveOne":
      createSceneCaveOne();
      break;
    case "SceneCaveTwo":
      createSceneCaveTwo();
      break;
    case "SceneCaveThree":
      createSceneCaveThree();
      break;
    case "SceneCaveDeath":
      createSceneCaveDeath();
      break;
    case "SceneFinal":
      createSceneFinal();
    default:
      loadStartScene();
  }
}

/**
 * Function to save the username from form input and trigger the game
 * @param {Event} event Form input
 * @returns {void}
 */
function saveUserInfo(event) {
  event.preventDefault();
  const nameInput = document.getElementById("storyName");
  const name = nameInput.value;
  
  // If user entered a name the property will be that name, else use "Stranger"
  if (name) {
    gameState.name = name;
  } else {
    gameState.name = "Stranger";
  }
  
  const node = document.getElementById("formStoryName");
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }

  // Save username to the property name, then creates the Main Scene
  setName(gameState.name);
  createSceneMain();
}

/**
 * Load the users name
 * @returns {string} - The username
 */
function loadUserInfo() {
  let name = gameState.name;
  return name;
}

/**
 * Save the game state
 */
function saveGameState() {
  localStorage.setItem("gameState", JSON.stringify(gameState));
}

/**
 * Load the game state from local storage and returns the state
 * @returns {Object|null} The loaded game state object or null
 */
function loadGameState() {
  const gameStateData = JSON.parse(localStorage.getItem("gameState"));
  if (gameStateData) {
    return gameStateData;
  }
  return null;
}

function clearGameState() {
  localStorage.removeItem("gameState");
}

/**
 * Play Audio and loop
 * @param {number} index The index of the audio track that will be played
 */
function playAudio(index) {
  audioTracks[index].play();
}

/**
 * Pause Audio
 * @param {number} index The index of the audio to be paused
 */
function pauseAudio(index) {
  audioTracks[index].pause();
}

/**
 * Play and loop Audio 
 * @param {number} index The index of the audio to be played and looped
 */
function playLoopAudio(index) {
  audioTracks[index].loop = true;
  audioTracks[index].play();
}

/**
 * Fade out audio and pause
 * @param {HTMLAudioElement} audio The audio track index in gameState
 * @param {number} duration How long the fade should be in ms
 */
function fadeOutAudio(audio, duration) {
  const interval = 50;
  const steps = duration / interval;
  const volumeStep = audio.volume / (steps + 1);

  let currentVolume = audio.volume;
  const fadeInterval = setInterval(() => {
    audio.volume = Math.max(0, audio.volume - volumeStep);
    currentVolume = audio.volume;
    
    if (audio.volume === 0) {
      clearInterval(fadeInterval);
      audio.pause();
      audio.volume = 0.8;
    }
  }, interval);
}

/**
 * Creates button with four parameters and adds a click event
 * @param {string} index The name of the button by corresponding index
 * @param {string} id Setting the id for the button
 * @param {Function} onClickNextFunction Sets the next function to be called
 * @param {HTMLElement} container Sets which container to add the button to
 */
  function createButton(index, id, onClickFunction, container) {
    const button = document.createElement("button");
    button.textContent = buttonNames[index];
    button.id = id;
    
    if (typeof onClickFunction === 'function') {
      button.addEventListener("click", onClickFunction);
    } else {
      console.error("Provided onClickFunction is not a function!");
    }
    
    button.classList.add("btn");
    container.appendChild(button);
  }

/**
 * Create page header element
 */
function createPageHeader() {
  const pageHeader = document.getElementById("pageHeader");
  pageHeader.innerHTML = "";

  const pageParagraf = document.createElement("p");
  pageParagraf.textContent = "A tale from the woods";
  pageParagraf.className = "pageparagraf";

  const pageTitle = document.createElement("h1");
  pageTitle.textContent = "The Forest";
  pageTitle.className = "pagetitle";

  pageHeader.appendChild(pageParagraf);
  pageHeader.appendChild(pageTitle);
}

/**
 * Create page header with no animation
 */
function createPageHeaderNoAnimation() {
  const pageHeader = document.getElementById("pageHeader");
  pageHeader.innerHTML = "";

  const pageParagraf = document.createElement("p");
  pageParagraf.textContent = "A tale from the woods";
  pageParagraf.className = "pageparagraf no-animation";

  const pageTitle = document.createElement("h1");
  pageTitle.textContent = "The Forest";
  pageTitle.className = "pagetitle no-animation";

  pageHeader.appendChild(pageParagraf);
  pageHeader.appendChild(pageTitle);
}

/**
 * Starting point of program
 * @see createPageHeader
 * @see createButton
 * @see playLoopAudio
 * @see fadeOutAudio
 */
function loadStartScene() {
  createPageHeader();
  const book = document.getElementById("storyBook");
  book.style.display = "none";

  // Create form
  const form = document.createElement("form");
  form.id = "formStoryName";

  pageHeader.append(form);

  // Create label element
  const label = document.createElement("label");
  label.textContent = "Character name?";
  label.className = "formlabel";
  label.htmlFor = "storyName"; // Link label to input with htmlFor
  form.appendChild(label);

  // Create input text field
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.id = "storyName";
  inputField.name = "storyName";
  form.appendChild(inputField);

  createButton(9, "storyStart", saveUserInfo, form);
  playLoopAudio(0);
  fadeOutAudio(audioTracks[1], 2000);
  updateDisplay();
}

/**
 * Scene Main One
 * @see createPageHeaderNoAnimation
 * @see createButton
 * @see setScene
 * @see fadeOutAudio
 * @see playLoopAudio
 */
function createSceneMain() {
  createPageHeaderNoAnimation();
  const book = document.getElementById("storyBook");
  book.style.display = "grid";

  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";

  // Get the characters name
  const storyName = loadUserInfo();

  // Create h2 element and add the characters name to the textContent
  const title = document.createElement("h2");
  title.id = "storyTitle";
  title.className = "storytitle";
  title.textContent = "Greetings " + storyName + " to The Forest's Edge";

  // Create section for the paragraphs
  const storySection = document.createElement("section");
  storySection.className = "storyText";

  // Text to be split
  const text = 'You stand at the edge of an ancient forest, the sun dappling through the canopy. The air is thick with the scent of pine needles and damp earth, and the only sound is the gentle rustle of leaves. A sense of wonder and trepidation fills you as you look around.\nStrange, otherworldly sounds echoed through the undergrowth—the distant howl of a wolf, the eerie chirping of unseen insects. A surge of curiosity and a hint of trepidation fill your heart. You know that danger lurks in the shadows, but the allure of the unknown and treasures is too strong to resist.\nTo the west, a path winds down to an opening into the ancient forest. To the east, a narrow passage, barely wide enough for a single person, wound its way between the large rocks.';
  text.id = "storyText";

  // Using .split() and a for loop to create separate paragraphs
  const sentences = text.split(/\n/);
  for (let i = 0; i < sentences.length; i++) {
    const paragraph = document.createElement("p");
    paragraph.textContent = sentences[i];
    paragraph.className = "storyParagraph";
    storySection.appendChild(paragraph);
  }

  // Create element for question
  const question = document.createElement("h3");
  question.id = "storyQuestion";
  question.className = "storyquestion";
  question.textContent = "Which way should you go?"

  // Create Button Container
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "storyButtons";
  buttonContainer.className = "buttoncontainer";

  // Append to container storyHeader
  storyHeader.append(title, storySection, question, buttonContainer);

  // Change story image
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/hazy-sunlight-shines-through-a-forest-with-large-rocks.webp";

  // Create text for figcaption
  const figcaption = document.getElementById("storyCaption");
  figcaption.className = "figcaption";
  figcaption.textContent = "Rocky terrain meets towering trees, the fog adding a mystical touch. The land, a tapestry of stone and green, is shrouded in a veil of mist."
  
  // Create the buttons
  createButton(0, "west", createSceneForestOne, buttonContainer);
  createButton(1, "east", createSceneCaveOne, buttonContainer);

  
  // Save scene state
  gameState.scene = "SceneMain";
  setScene(gameState.scene);
  
  // Audio fade out and play
  fadeOutAudio(audioTracks[0], 2000);
  playLoopAudio(1);
  
  // Display items 
  updateDisplay();
}

/**
 * Scene Alt Main One
 * @see createPageHeaderNoAnimation
 * @see createButton
 * @see setScene
 */
function createSceneAltMain() {
  createPageHeaderNoAnimation();
  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";

  // Get the characters name
  const storyName = loadUserInfo();

  // Create h2 element and add the char name to the textContent
  const title = document.createElement("h2");
  title.id = "storyTitle";
  title.className = "storytitle";
  title.textContent = "Welcome back " + storyName + " to The Forest's Edge";

  // Create section for the paragraphs
  const storySection = document.createElement("section");
  storySection.className = "storyText";

  // Text to be split
  const text = 'You find yourself awakening to the sound of gentle rustle of leaves."Where am I?" A voice echoed in your mind.\nYou suddenly remember fearsome creatures and magic items, and a legend that speaks of a forgotten realm, hidden deep within these ancient forests, holding treasures beyond imagination.\n"Was it a dream, or a glimpse of something real?", "Have I been here before?" you wondered, your mind racing.\nA surge of curiosity and a hint of trepidation fill your heart. You know that danger lurks in the shadows, but the allure of the unknown and treasures is too strong to resist.\nTo the west, a path winds down to an opening into the ancient forest. To the east, a narrow passage, barely wide enough for a single person, wound its way between the large rocks.';
  text.id = "storyText";

  // The Split function using .split() and a for loop creating separate paragraphs
  const sentences = text.split(/\n/);
  for (let i = 0; i < sentences.length; i++) {
    const paragraph = document.createElement("p");
    paragraph.textContent = sentences[i];
    paragraph.className = "storyParagraph";
    storySection.appendChild(paragraph);
  }

  // Create element for question
  const question = document.createElement("h3");
  question.id = "storyQuestion";
  question.className = "storyquestion";
  question.textContent = "Which way should you go?"

  // Create Button Container
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "storyButtons";
  buttonContainer.className = "buttoncontainer";

  // Append to container storyHeader
  storyHeader.append(title, storySection, question, buttonContainer);

  // Change story image
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/hazy-sunlight-shines-through-a-forest-with-large-rocks.webp";

  // Create text for figcaption
  const figcaption = document.getElementById("storyCaption");
  figcaption.className = "figcaption";
  figcaption.textContent = "Rocky terrain meets towering trees, the fog adding a mystical touch. The land, a tapestry of stone and green, is shrouded in a veil of mist.";
  
  // Create the buttons
  createButton(0, "west", createSceneForestOne, buttonContainer);
  createButton(1, "east", createSceneCaveOne, buttonContainer);

  // Save scene state
  gameState.scene = "SceneAltMain";
  setScene(gameState.scene);

  // Display items 
  updateDisplay();
}

/**
 * Scene Forest One
 * @see createPageHeaderNoAnimation
 * @see createButton
 * @see setScene
 */
function createSceneForestOne() {
  createPageHeaderNoAnimation();
  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";

  // Get the characters name
  const storyName = loadUserInfo();

  // Create h2 element and its content
  const title = document.createElement("h2");
  title.id = "storyTitle";
  title.className = "storytitle";
  title.textContent = "A figure in the shadows...";

  // Create section for the paragraphs
  const storySection = document.createElement("section");
  storySection.className = "storyText";

  // Text to be split
  const text = `As you walked further into the forest, you couldn't shake the feeling that you were being watched. The trees seemed to lean in, their gnarled branches reaching out like skeletal fingers. The sunlight, once warm and inviting, now seemed to cast an eerie glow on the forest floor.\nAs you start to quickened your pace, hoping to escape the oppressive silence, you see a hooded figure standing in the shadows. The figure stepped into the light, revealing a merchant with a wide grin and a bag full of peculiar items.\n"What's your name?" murmured the merchant, while he showed you a variety of magical trinkets, potions, and weapons.\n"You can call me ` + storyName + `" you answered.\nThe merchant just nodded while speaking of ancient relics, lost treasures, and forbidden knowledge.\n"I'm looking for the Magic Orb, do you know the way?" you asked firmly.\n"For some gold coins, I sure will... " the merchant said silently, while stirring the camp fire. However, the merchant's appearance in such a remote and dangerous place was unsettling.`;
  text.id = "storyText";

  // The Split function using .split() and a for loop creating separate paragraphs
  const sentences = text.split(/\n/);
  for (let i = 0; i < sentences.length; i++) {
    const paragraph = document.createElement("p");
    paragraph.textContent = sentences[i];
    paragraph.className = "storyParagraph";
    storySection.appendChild(paragraph);
  }

  // Create element for question
  const question = document.createElement("h3");
  question.id = "storyQuestion";
  question.className = "storyquestion";
  question.textContent = "What's your next move " + storyName + "?";
  
  // Create Button Container
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "storyButtons";
  buttonContainer.className = "buttoncontainer";
  
  // Append to container storyHeader
  storyHeader.append(title, storySection, question, buttonContainer);
  
  // Change story image
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/an-old-merchant-by-the-campfire-surrounded-by-gnarly-trees.webp";
  
  // Create text for figcaption
  const figcaption = document.getElementById("storyCaption");
  figcaption.className = "figcaption";
  figcaption.textContent = "An old merchant sits by a campfire, surrounded by gnarly trees. Rings, trinkets and potions lays on a blanket beside him.";

  // Create the buttons
  createButton(1, "east", createSceneMain, buttonContainer);
  createInventoryButton(5, "decreaseMoneyOne", 5, buttonContainer);

  // Save scene state
  gameState.scene = "SceneForestOne";
  setScene(gameState.scene);

  // Display items 
  updateDisplay();
}

/**
 * Scene Forest Two
 * @see createPageHeaderNoAnimation
 * @see createButton
 * @see setScene
 */
function createSceneForestTwo() {
  createPageHeaderNoAnimation();
  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";

  // Get the characters name
  const storyName = loadUserInfo();

  // Create h2 element and add the char name to the textContent
  const title = document.createElement("h2");
  title.id = "storyTitle";
  title.className = "storytitle";
  title.textContent = "The trees are watching you, " + storyName + "";

  // Create section for the paragraphs
  const storySection = document.createElement("section");
  storySection.className = "storyText";

  // Text to be split
  const text = `You continued your journey, deeper into the heart of the forest. The trees grew older and more twisted, their roots gnarled and exposed. Strange fungi, bioluminescent and otherworldly, clung to the decaying trunks.\n"Why not pick one of these mushrooms..." you heard yourself say.\nA sense of isolation crept over you as the forest seemed to close in around you. The only sound was the distant whisper of the wind and the occasional snap of a twig.\nYou could feel the ancient power of the woods, a force both awe-inspiring and terrifying.\nThe trees seemed to watch your every move, their gnarled branches reaching out like skeletal fingers. You knew that you were treading on sacred ground, and that the forest would not easily surrender its secrets.`;
  text.id = "storyText";

  // The Split function using .split() and a for loop creating separate paragraphs
  const sentences = text.split(/\n/);
  for (let i = 0; i < sentences.length; i++) {
    const paragraph = document.createElement("p");
    paragraph.textContent = sentences[i];
    paragraph.className = "storyParagraph";
    storySection.appendChild(paragraph);
  }

  // Create element for question
  const question = document.createElement("h3");
  question.id = "storyQuestion";
  question.className = "storyquestion";
  question.textContent = "Time to choose " + storyName + "";

  // Create Button Container
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "storyButtons";
  buttonContainer.className = "buttoncontainer";
  
  // Append to container storyHeader
  storyHeader.append(title, storySection, question, buttonContainer);
  
  // Change story image
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/forest-with-mossy-green-ground-and-glowing-fungi.webp";
  
  // Create element for figcaption
  const figcaption = document.getElementById("storyCaption");
  figcaption.className = "figcaption";
  figcaption.textContent = "Various mysterious glowing fungi rises up from a mossy covered ground."

  // Create the buttons for scene
  createButton(2, "north", createSceneForestOne, buttonContainer);
  createButton(3, "south", createSceneForestThree, buttonContainer);
  createInventoryButton(4, "addItem", "Mushroom", buttonContainer);

  gameState.scene = "SceneForestTwo";
  setScene(gameState.scene);

  // Display items 
  updateDisplay();
}

/**
 * Scene Forest Three
 * @see createPageHeaderNoAnimation
 * @see createButton
 * @see setScene
 */
function createSceneForestThree() {
  createPageHeaderNoAnimation();
  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";

  // Get the characters name
  const storyName = loadUserInfo();

  // Create h2 element and add the char name to the textContent
  const title = document.createElement("h2");
  title.id = "storyTitle";
  title.className = "storytitle";
  title.textContent = "A glimpse of magic";

  // Create section for the paragraphs
  const storySection = document.createElement("section");
  storySection.className = "storyText";

  // Text to be split
  const text = `As you delved deeper, the forest began to change. The trees grew taller, their leaves shimmering with an otherworldly glow. The air was filled with a sweet, floral scent, and the ground was soft and mossy. You felt a surge of energy, as if the forest itself was invigorating you.\nSuddenly, you stumbled upon a hidden clearing. In the center, a massive, ancient tree stood, its branches reaching towards the sky.\nBut this was no ordinary tree. Its trunk was adorned with intricate carvings, and its leaves glowed with a radiant light.\n"Better drop some coins into the pool, for good luck". As you approached, the tree seemed to come alive, its branches swaying gently in the breeze.`;
  text.id = "storyText";

  // The Split function using .split() and a for loop creating separate paragraphs
  const sentences = text.split(/\n/);
  for (let i = 0; i < sentences.length; i++) {
    const paragraph = document.createElement("p");
    paragraph.textContent = sentences[i];
    paragraph.className = "storyParagraph";
    storySection.appendChild(paragraph);
  }

  // Create element for question
  const question = document.createElement("h3");
  question.id = "storyQuestion";
  question.className = "storyquestion";
  question.textContent = "Time to choose " + storyName + "";

  // Create Button Container
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "storyButtons";
  buttonContainer.className = "buttoncontainer";

  // Append to container storyHeader
  storyHeader.append(title, storySection, question, buttonContainer);

  // Change story image SceneMainOne
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/gnarly-tree-with-lots-of-gems-and-trinkets-on-the-ground.webp";

  // Create element for figcaption
  const figcaption = document.getElementById("storyCaption");
  figcaption.className = "figcaption";
  figcaption.textContent = "Old and gnarly tree, with a magic orb at its center, is surrounded on ground by various gems and trinkets in different color."
  
  // Create the buttons for scene
  createButton(2, "north", createSceneForestTwo, buttonContainer);
  createInventoryButton(5, "decreaseMoneyTwo", 5, buttonContainer);

  // Save scene state
  gameState.scene = "SceneForestThree";
  setScene(gameState.scene);

  // Display items 
  updateDisplay();
}

/**
 * Scene Forest Death
 * @see createPageHeaderNoAnimation
 * @see createButton
 * @see setScene
 */
function createSceneForestDeath() {
  createPageHeaderNoAnimation();
  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";

  // Get the characters name
  const storyName = loadUserInfo();

  // Create h2 element and add the char name to the textContent
  const title = document.createElement("h2");
  title.id = "storyTitle";
  title.className = "storytitle";
  title.textContent = "A tragic end for you, " + storyName + "";

  // Create section for the paragraphs
  const storySection = document.createElement("section");
  storySection.className = "storyText";

  // Text to be split
  const text = `The ring was a beauty, a glinting circlet of silver and an emerald as green as the forest’s heart. The merchant assured you of its power, its ability to grant wishes.\nAs you slipped the ring onto your finger, a strange sensation pulsed through you, a tingling warmth that spread from your hand to your heart. A moment later, a cold, hard sensation enveloped you. Panic set in as you realized you couldn’t move, couldn’t speak. Your body felt heavy, as if it were being pulled into stone.\nYou looked down at your hands, horrified to see them turning to stone, the intricate veins and delicate skin hardening into a cold, lifeless form. The process spread upwards, hardening your arms, your chest, your face. As the final tendrils of life were extinguished, you were left a statue, forever trapped in the moment of your transformation.\nThe merchant, his true form revealed, watched with a sinister smile.\n"You will be a fine addition ` + storyName + `" said the merchant. Yet another victim, another soul was add to the merchant's growing collection of stone statues.`;
  text.id = "storyText";

  // The Split function using .split() and a for loop creating separate paragraphs
  const sentences = text.split(/\n/);
  for (let i = 0; i < sentences.length; i++) {
    const paragraph = document.createElement("p");
    paragraph.textContent = sentences[i];
    paragraph.className = "storyParagraph";
    storySection.appendChild(paragraph);
  }

  // Create element for question
  const question = document.createElement("h3");
  question.id = "storyQuestion";
  question.className = "storyquestion";
  question.textContent = "What's your next move " + storyName + "?"; 

  // Create Button Container
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "storyButtons";
  buttonContainer.className = "buttoncontainer";

  // Append to container storyHeader
  storyHeader.append(title, storySection, question, buttonContainer);

  // Change story image
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/large-magic-meadow-with-endless-of-various-colors.webp";

  // Create element for figcaption
  const figcaption = document.getElementById("storyCaption");
  figcaption.className = "figcaption";
  figcaption.textContent = "A kaleidoscope of colors paints the landscape, where nature's beauty knows no bounds. The earth, a canvas of infinite hues, is adorned with the brushstrokes of the divine.";
  
  // Create the buttons for the Scene
  createButton(7, "retry", createSceneAltMain, buttonContainer);
  createButton(8, "new", loadStartScene, buttonContainer);

  // Save scene state
  gameState.scene = "SceneForestDeath";
  setScene(gameState.scene);

  // Display items 
  updateDisplay();
}

/**
 * Scene Cave One
 * @see createPageHeaderNoAnimation
 * @see createButton
 * @see setScene
 */
function createSceneCaveOne() {
  createPageHeaderNoAnimation();
  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";

  // Get the characters name
  const storyName = loadUserInfo();

  // Create h2 element and its content
  const title = document.createElement("h2");
  title.id = "storyTitle";
  title.className = "storytitle";
  title.textContent = "The Stone Labyrinth";

  // Create section for the paragraphs
  const storySection = document.createElement("section");
  storySection.className = "storyText";
  
  // Text to be split
  const text = `The deeper you venture, the more the forest changes. Sunlight fades, replaced by a dim, ethereal glow. The forest gives way to a labyrinth of towering rocks. Strange, otherworldly sounds echo through the rocks.\nA sudden rustle in the undergrowth startles you. You can make out a pair of glowing eyes in the darkness. As you draw your knife, a shadowy figure moves back and forth.\n"Who's there to disturb my peace?" a voice rings out from the darkness.\n"You can call me ` + storyName + `" you answered.\nA moment later, a small, goblin-like creature emerges from the shadows. It's no taller than your knee, with pointed ears, a wide grin, and a mischievous glint in its eyes.\n"Well, well, well," it cackles, "A brave adventurer, I see. What brings you to my humble abode?"\n"I'm seeking to find the Mystical Orb..." you reply, your voice firm. "Can you direct me to it?"\nThe goblin's eyes widen in surprise.\n"The Mystic Orb, eh? A bold ambition. Well, I suppose I could point you in the right direction, for a price, of course." It grins mischievously."`;
  text.id = "storyText";

// The Split function using .split() and a for loop creating separate paragraphs
const sentences = text.split(/\n/);
for (let i = 0; i < sentences.length; i++) {
  const paragraph = document.createElement("p");
  paragraph.textContent = sentences[i];
  paragraph.className = "storyParagraph";
  storySection.appendChild(paragraph);
}

// Create element for question
const question = document.createElement("h3");
question.id = "storyQuestion";
question.className = "storyquestion";
question.textContent = "What's your next move " + storyName + "?";

// Create Button Container
const buttonContainer = document.createElement("div");
buttonContainer.id = "storyButtons";
buttonContainer.className = "buttoncontainer";

// Append to container storyHeader
storyHeader.append(title, storySection, question, buttonContainer);

// Change story image
const storyImage = document.getElementById("storyImage");
storyImage.src = "assets/image/cave-goblin-with-a-greenish-skin-holding-a-torchlight.webp";

// Create element for figcaption
const figcaption = document.getElementById("storyCaption");
figcaption.className = "figcaption";
figcaption.textContent = "A mischievous goblin, his skin the color of moss, emerges from the shadows, torchlight illuminating his grinning face. The dim, cavernous surroundings cast long, eerie shadows, adding to the goblin's sinister charm.";

// Create the buttons
createButton(0, "west", createSceneMain, buttonContainer);
createButton(3, "east", createSceneCaveDeath, buttonContainer);
createInventoryButton(5, "decreaseMoneyThree", 10, buttonContainer);

// Save scene state
gameState.scene = "SceneCaveOne";
setScene(gameState.scene);

// Display items 
updateDisplay();
}

/**
 * Scene Cave Two
 * @see createPageHeaderNoAnimation
 * @see createButton
 * @see setScene
 */
function createSceneCaveTwo() {
  createPageHeaderNoAnimation();
  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";

  // Get the characters name
  const storyName = loadUserInfo();

  // Create h2 element and its content
  const title = document.createElement("h2");
  title.id = "storyTitle";
  title.className = "storytitle";
  title.textContent = "Deeper into the Labyrinth";

  // Create section for the paragraphs
  const storySection = document.createElement("section");
  storySection.className = "storyText";
  
  // Text to be split
  const text = `The goblin led you deeper into the labyrinth. The path became increasingly treacherous, with narrow passages and deep chasms. The air grew colder, and an eerie silence hung over the place. As you ventured further, the walls of the labyrinth began to close in, and the darkness grew more intense. You could feel a sense of dread creeping over you, a premonition of danger lurking in the shadows. Suddenly, the goblin stopped at a fork in the path.\n"Well, this is as far as I go..." it said, pointing towards a dimly lit passage. "The rest is up to you. Good luck, ` + storyName + `".\nWith a mischievous grin, the goblin vanished into the shadows. You hesitated for a moment, studying the two paths before you. One led east deeper into the darkness, while the other seemed to descend south towards a distant light, and a cave entrance.`;
  text.id = "storyText";

  // The Split function using .split() and a for loop creating separate paragraphs
  const sentences = text.split(/\n/);
  for (let i = 0; i < sentences.length; i++) {
    const paragraph = document.createElement("p");
    paragraph.textContent = sentences[i];
    paragraph.className = "storyParagraph";
    storySection.appendChild(paragraph);
  }

  // Create element for question
  const question = document.createElement("h3");
  question.id = "storyQuestion";
  question.className = "storyquestion";
  question.textContent = "What's your next move " + storyName + "?";

  // Create Button Container
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "storyButtons";
  buttonContainer.className = "buttoncontainer";

  // Append to container storyHeader
  storyHeader.append(title, storySection, question, buttonContainer);

  // Change story image
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/cave-opening-with-torchlight-outside-to-the-right.webp";

  // Create element for figcaption
  const figcaption = document.getElementById("storyCaption");
  figcaption.className = "figcaption";
  figcaption.textContent = "A flickering torch lights the way into a shadowy cave, promising secrets and adventure.";

  // Create the buttons
  createButton(1, "east", createSceneCaveDeath, buttonContainer);
  createButton(3, "south", createSceneCaveThree, buttonContainer);

  // Save scene state
  gameState.scene = "SceneCaveTwo";
  setScene(gameState.scene);

  // Display items 
  updateDisplay();
}

/**
 * Scene Cave Three
 * @see createPageHeaderNoAnimation
 * @see createButton
 * @see setScene
 */
function createSceneCaveThree() {
  createPageHeaderNoAnimation();
  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";

  // Get the characters name
  const storyName = loadUserInfo();

  // Create h2 element and its content
  const title = document.createElement("h2");
  title.id = "storyTitle";
  title.className = "storytitle";
  title.textContent = "The Mystic Orb";

  // Create section for the paragraphs
  const storySection = document.createElement("section");
  storySection.className = "storyText";
  
  // Text to be split
  const text = `As you stepped into the cavern, a sense of awe filled you. The walls were adorned with intricate carvings, depicting ancient battles and celestial beings. The air was still, the only sound the soft echo of your footsteps. A colossal stone door, etched with ancient symbols, blocks your path. As you approach and touch the cold, smooth surface, the door swings open. \nAt the center of the cavern, a crystalline pool shimmered, illuminating the room, its surface rippling with otherworldly energy. Just above the pool, the Mystic Orb pulsed with energy. Its power drawing you closer.\nAs you started to move closer and touch the orb, a surge of power started to course through your veins. To the east you discovered another stone door, intricately carved with symbols similar to those on the cavern walls.`;
  text.id = "storyText";

  // The Split function using .split() and a for loop creating separate paragraphs
  const sentences = text.split(/\n/);
  for (let i = 0; i < sentences.length; i++) {
    const paragraph = document.createElement("p");
    paragraph.textContent = sentences[i];
    paragraph.className = "storyParagraph";
    storySection.appendChild(paragraph);
  }

  // Create element for question
  const question = document.createElement("h3");
  question.id = "storyQuestion";
  question.className = "storyquestion";
  question.textContent = "What's your next move " + storyName + "?";

  // Create Button Container
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "storyButtons";
  buttonContainer.className = "buttoncontainer";

  // Append to container storyHeader
  storyHeader.append(title, storySection, question, buttonContainer);

  // Change story image SceneMainOne
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/a-dark-cave-with-an-magic-orb-in-the-center-carvings-gems-and-trinkets-on-the-walls-and-a-stone-door-to-the-east.webp";

  // Create element for figcaption
  const figcaption = document.getElementById("storyCaption");
  figcaption.className = "figcaption";
  figcaption.textContent = "A cavernous room filled with gems and relics from a forgotten age, at the center, a crystalline pool and a magic orb shimmered, illuminating the room.";

  // Create the buttons
  createButton(1, "east", createSceneCaveDeath, buttonContainer);
  createInventoryButton(5, "decreaseMoneyFour", 10, buttonContainer);

  // Save scene state
  gameState.scene = "SceneCaveThree";
  setScene(gameState.scene);

  // Display items 
  updateDisplay();
}

/**
 * Scene Cave Death
 * @see createPageHeaderNoAnimation
 * @see createButton
 * @see setScene
 */
function createSceneCaveDeath() {
  createPageHeaderNoAnimation();
  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";

  // Get the characters name
  const storyName = loadUserInfo();

  // Create h2 element and add the char name to the textContent
  const title = document.createElement("h2");
  title.id = "storyTitle";
  title.className = "storytitle";
  title.textContent = "A tragic end for you, " + storyName + "";

  // Create section for the paragraphs
  const storySection = document.createElement("section");
  storySection.className = "storyText";

  // Text to be split
  const text = `With a mixture of curiosity and trepidation, you approached the door. As you touched its cold, smooth surface, it slowly creaked open, revealing a narrow, dimly lit passageway descending into the depths of the mountain. A chill wind whistled through the opening, carrying with it the promise of ancient secrets and hidden dangers.\nAs you descended deeper into the mountain, the air grew colder and the silence more profound. The only sound was the distant echo of your footsteps. \nSuddenly, a loose rock gave way beneath your foot, and you tumbled into the abyss. The world spun around you as you fell, a terrifying sensation of weightlessness consuming you. The darkness enveloped you completely, and you felt a cold, final embrace.`;
  text.id = "storyText";

  // The Split function using .split() and a for loop creating separate paragraphs
  const sentences = text.split(/\n/);
  for (let i = 0; i < sentences.length; i++) {
    const paragraph = document.createElement("p");
    paragraph.textContent = sentences[i];
    paragraph.className = "storyParagraph";
    storySection.appendChild(paragraph);
  }

  // Create element for question
  const question = document.createElement("h3");
  question.id = "storyQuestion";
  question.className = "storyquestion";
  question.textContent = "What's your next move " + storyName + "?"; 

  // Create Button Container
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "storyButtons";
  buttonContainer.className = "buttoncontainer";

  // Append to container storyHeader
  storyHeader.append(title, storySection, question, buttonContainer);

  // Change story image SceneMainOne
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/large-magic-meadow-with-endless-of-various-colors.webp";

  // Create element for figcaption
  const figcaption = document.getElementById("storyCaption");
  figcaption.className = "figcaption";
  figcaption.textContent = "A kaleidoscope of colors paints the landscape, where nature's beauty knows no bounds. The earth, a canvas of infinite hues, is adorned with the brushstrokes of the divine.";
  
  // Create the buttons for the Scene
  createButton(7, "retry", createSceneAltMain, buttonContainer);
  createButton(8, "new", loadStartScene, buttonContainer);

  // Save scene state
  gameState.scene = "SceneCaveDeath";
  setScene(gameState.scene);

  // Display items 
  updateDisplay();
}

/**
 * Scene Final - The Hidden Treasure
 * @see createPageHeaderNoAnimation
 * @see createButton
 */
function createSceneFinal() {
  createPageHeaderNoAnimation();
  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";

  // Get the characters name
  const storyName = loadUserInfo();

  // Create h2 element and add the char name to the textContent
  const title = document.createElement("h2");
  title.id = "storyTitle";
  title.className = "storytitle";
  title.textContent = "A treasure beyond imagination";

  // Create section for the paragraphs
  const storySection = document.createElement("section");
  storySection.className = "storyText";

  // Text to be split
  const text = `You found yourself in a vast cavern, its walls adorned with glittering gemstones of every color imaginable. Diamonds, rubies, sapphires, and emeralds sparkled under the soft, ethereal light.\n"Well, well, well..." someone chuckled, "At last we meet, ` + storyName + `". \nIn the center of the cavern, an old gnome sat upon a throne of gold, his eyes twinkling with mischief.\nThe gnome, though small, exuded an aura of power and wisdom. He gestured towards a mountain of treasure, "Take what you desire, young one. A reward for your courage and curiosity."\nYou carefully selected a few of the most dazzling gems and a few rings, each more beautiful than the last. As you reached for a particularly large diamond, the gnome's eyes twinkled.\n"That one," he said, "is a gift. A token of your bravery."\nWith a wave of his hand, the diamond floated towards you. As you took it, a surge of power coursed through you, and you felt a newfound strength and agility.\n"Thank you," you said, your voice filled with gratitude. The gnome smiled. "Remember, with great power comes great responsibility. Use this wisely."\nWith a final nod, the gnome vanished, and you found yourself back in the forest, the ancient tree looming before you. The glowing orb was gone, leaving behind only a sense of wonder and fulfillment.\nThe end.`;
  text.id = "storyText";

  // The Split function using .split() and a for loop creating separate paragraphs
  const sentences = text.split(/\n/);
  for (let i = 0; i < sentences.length; i++) {
    const paragraph = document.createElement("p");
    paragraph.textContent = sentences[i];
    paragraph.className = "storyParagraph";
    storySection.appendChild(paragraph);
  }

  // Create element for question
  const question = document.createElement("h3");
  question.id = "storyQuestion";
  question.className = "storyquestion";
  question.textContent = "Ready for another adventure,  " + storyName + "?"; 

  // Create Button Container
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "storyButtons";
  buttonContainer.className = "buttoncontainer";

  // Append to container storyHeader
  storyHeader.append(title, storySection, question, buttonContainer);

  // Change story image
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/a-gnome-inside-a-large-tree-is-surrounded-by-gems-trinkets.webp";

  // Create element for figcaption
  const figcaption = document.getElementById("storyCaption");
  figcaption.className = "figcaption";
  figcaption.textContent = "A wise, ancient gnome, his beard as white as winter's frost, sits enthroned amidst a dazzling array of jewels. The walls of the cavern, adorned with intricate carvings and shimmering crystals, reflect the light of the countless gems.";
  
  // Create the buttons for the Scene
  createButton(10, "playagain", loadStartScene, buttonContainer);

  localStorage.clear();
}