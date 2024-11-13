window.addEventListener("DOMContentLoaded", main);

/**
 * Global variable containing propertys for the game
 */
let gameState = {
  name: "",
  money: 50,
  inventory: ["Knife"],
  scene: "StartScene"
};

/**
 * Set name
 * @param {*} name 
 */
function setName(name) {
  gameState.name = name;
  saveGameState();
}

/**
 * Set Money
 * @param {*} name 
 */
function setMoney(name) {
  gameState.scene = name;
  saveGameState();
}

/**
 * Set Inventory
 * @param {*} name 
 */
function setInventory(name) {
  gameState.inventory = name;
  saveGameState();
}

/** 
 * Set Scene
 * @param {*} name 
 */
function setScene(name) {
  gameState.scene = name;
  saveGameState();
}

/** 
 * Load current scene
 * @param {*} sceneName 
 */
function loadScene(sceneName) {
  console.log("loadScene");
  switch (sceneName) {
    case "SceneMain":
      createSceneMain();
      console.log("Loaded Scene:", sceneName);
      break;
    case "SceneAltMain":
      createSceneAltMain();
      console.log("Loaded Scene:", sceneName);
      break;
    case "SceneForestOne":
      createSceneForestOne();
      console.log("Loaded Scene:", sceneName);
      break;
    case "SceneForestTwo":
      createSceneForestTwo();
      console.log("Loaded Scene:", sceneName);
      break;
    case "SceneForestThree":
      createSceneForestThree();
      console.log("Loaded Scene:", sceneName);
      break;
    case "SceneFinal":
      createSceneFinal();
      console.log("Loaded Scene:", sceneName);
    default:
      loadStartScene();
      console.log("Loaded Scene:", sceneName);
  }
}

/**
 * Function to save the username from the inputfield
 * @param {*} event 
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
 * @returns {gameState.name} 
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
 * Load the game state and returns the values
 * @returns {gameStateData}
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
 * Loading the current saved scene
 */
function main() {
  const savedState = loadGameState();
  if (savedState) {
    gameState = savedState;
  }
  loadScene(gameState.scene); // Trigger the loadScene
}

/**
 * Create Buttons with parameters
 * @param {*} index The name of the button by corresponding index
 * @param {*} id Setting the id for the button
 * @param {*} onClickNextFunction Sets the next function to be called
 * @param {*} container Sets which container to add the button to
 */
function createButton(index, id, onClickNextFunction, container) {
  const buttonNames = ["West", "East", "North", "South", "Pick up", "Buy item", "Move closer", "Retry", "New character", "Start", "Play again"];
  const button = document.createElement("button");
  button.textContent = buttonNames[index];
  button.id = id;
  button.addEventListener("click", onClickNextFunction);
  button.classList.add("btn");
  container.appendChild(button);
}

/**
 * Create page header for loadStartScene
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

function createPageHeaderNoAnimation() {
  const pageHeader = document.getElementById("pageHeader");
  pageHeader.innerHTML = "";

  const pageParagraf = document.createElement("p");
  pageParagraf.textContent = "A tale from the woods";
  pageParagraf.classList = ("pageparagraf", "no-animation");

  const pageTitle = document.createElement("h1");
  pageTitle.textContent = "The Forest";
  pageTitle.classList = ("pagetitle", "no-animation");

  pageHeader.appendChild(pageParagraf);
  pageHeader.appendChild(pageTitle);
}

/**
 * Starting point of program
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
}

/**
 * Scene Main One
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

  // Change story image SceneMainOne
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/hazy-sunlight-shines-through-a-forest-with-large-rocks.webp";
  
  // Create the buttons SceneMainOne
  createButton(0, "west", createSceneForestOne, storyButtons);
  createButton(1, "east", createSceneCaveOne, storyButtons);

  // Save scene state
  gameState.scene = "SceneMain";
  setScene(gameState.scene);
}

/**
 * Scene Alt Main One
 */
function createSceneAltMain() {
  createPageHeader();
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
  const text = 'You find yourself awakening to the sound of gentle rustle of leaves."Where am I?" A voice echoed in your mind.\nYou suddenly remember fearsome trolls and mischievous goblins and a legend that speaks of a forgotten realm, hidden deep within these ancient forests, holding treasures beyond imagination.\n"Was it a dream, or a glimpse of something real?", "Have I been here before?" you wondered, your mind racing.\nA surge of curiosity and a hint of trepidation fill your heart. You know that danger lurks in the shadows, but the allure of the unknown and treasures is too strong to resist.';
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

  // Change story image SceneMainOne
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/hazy-sunlight-shines-through-a-forest-with-large-rocks.webp";
  
  // Create the buttons SceneMainOne
  createButton(0, "west", createSceneForestOne, storyButtons);
  createButton(1, "east", createSceneCaveOne, storyButtons);

  // Save scene state
  gameState.scene = "SceneAltMain";
  setScene(gameState.scene);
}

/**
 * Scene Forest One
 */
function createSceneForestOne() {
  createPageHeader();
  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";

  // Get the characters name
  const storyName = loadUserInfo();

  // Create h2 element and add the char name to the textContent
  const title = document.createElement("h2");
  title.id = "storyTitle";
  title.className = "storytitle";
  title.textContent = "A figure in the shadows";

  // Create section for the paragraphs
  const storySection = document.createElement("section");
  storySection.className = "storyText";

  // Text to be split
  const text = `As you walked further into the forest, you couldn't shake the feeling that you were being watched. The trees seemed to lean in, their gnarled branches reaching out like skeletal fingers. The sunlight, once warm and inviting, now seemed to cast an eerie glow on the forest floor.\nAs you start to quickened your pace, hoping to escape the oppressive silence, you see a hooded figure standing in the shadows. The figure stepped into the light, revealing a merchant with a wide grin and a bag full of peculiar items.\n"What's your name?" murmured the merchant, while he showed you a variety of magical trinkets, potions, and weapons.\n"You can call me ` + storyName + `" you answered.\nThe merchant just nodded while speaking of ancient relics, lost treasures, and forbidden knowledge. You were very intrigued by a certain item. A ring with an Emerald, the most powerful of all gemstones in the fight against evil. However, the merchant's appearance in such a remote and dangerous place was unsettling.`;
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
  storyImage.src = "assets/image/an-old-merchant-by-the-campfire-surrounded-by-gnarly-trees.webp";
  
  // Create the buttons SceneForestOne
  createButton(1, "east", createSceneMain, storyButtons);
  createButton(3, "south", createSceneForestTwo, storyButtons);
  createButton(5, "buyitem", createSceneForestDeath, storyButtons);

  // Save scene state
  gameState.scene = "SceneForestOne";
  setScene(gameState.scene);
}

/**
 * Scene Forest Two
 */
function createSceneForestTwo() {
  createPageHeader();
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

  // Change story image SceneMainOne
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/forest-with-mossy-green-ground-and-glowing-fungi.webp";
  
  // Create the buttons for scene
  createButton(2, "north", createSceneForestOne, storyButtons);
  createButton(3, "south", createSceneForestThree, storyButtons);
  createButton(4, "mushroom", createSceneForestDeath, storyButtons);

  gameState.scene = "SceneForestTwo";
  setScene(gameState.scene);
}

/**
 * Scene Forest Three
 */
function createSceneForestThree() {
  createPageHeader();
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
  const text = `As you delved deeper, the forest began to change. The trees grew taller, their leaves shimmering with an otherworldly glow. The air was filled with a sweet, floral scent, and the ground was soft and mossy. You felt a surge of energy, as if the forest itself was invigorating you.\nSuddenly, you stumbled upon a hidden clearing. In the center, a massive, ancient tree stood, its branches reaching towards the sky. A small gemstone revealed itself close to the tree \n"Ohh a gemstone ..." you said loudly your mind.\nBut this was no ordinary tree. Its trunk was adorned with intricate carvings, and its leaves glowed with a radiant light. As you approached, the tree seemed to come alive, its branches swaying gently in the breeze.`;
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
  
  // Create the buttons for scene
  createButton(2, "north", createSceneForestTwo, storyButtons);
  createButton(6, "movecloser", createSceneFinal, storyButtons);
  createButton(4, "gemstone", createSceneFinal, storyButtons);

  // Save scene state
  gameState.scene = "SceneForestThree";
  setScene(gameState.scene);
}

/**
 * Scene Forest Death
 */
function createSceneForestDeath() {
  createPageHeader();
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

  // Change story image SceneMainOne
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/large-magic-meadow-with-endless-of-various-colors.webp";
  
  // Create the buttons for the Scene
  createButton(7, "retry", createSceneAltMain, storyButtons);
  createButton(8, "new", loadStartScene, storyButtons);

  // Save scene state
  gameState.scene = "SceneForestDeath";
  setScene(gameState.scene);
}

/**
 * Scene Cave One
 */
function createSceneCaveOne() {
  console.log("Cave One");
}

/**
 * Scene Cave Two
 */
function createSceneCaveTwo() {
  console.log("Cave Two");
}

/**
 * Scene Cave Three - Gemstone
 */
function createSceneCaveThree() {
  console.log("Cave Three Gem");
}

/**
 * Scene Cave Death
 */
function createSceneCaveDeath() {
  console.log("Cave Death");
}

/**
 * Scene Final - The Hidden Treasure
 */
function createSceneFinal() {
  createPageHeader();
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
  const text = `As you drew closer, you noticed a small, glowing orb nestled within the tree's roots. You reached out and gently touched the orb, and it pulsed with energy. A surge of power flowed through you, and you were transported into the tree.\nYou found yourself in a vast cavern, its walls adorned with glittering gemstones of every color imaginable. Diamonds, rubies, sapphires, and emeralds sparkled under the soft, ethereal light.\n"Well, well, well..." someone chuckled, "At last we meet, ` + storyName + `". \nIn the center of the cavern, an old gnome sat upon a throne of gold, his eyes twinkling with mischief.\nThe gnome, though small, exuded an aura of power and wisdom. He gestured towards a mountain of treasure, "Take what you desire, young one. A reward for your courage and curiosity."\nYou carefully selected a few of the most dazzling gems and a few rings, each more beautiful than the last. As you reached for a particularly large diamond, the gnome's eyes twinkled.\n"That one," he said, "is a gift. A token of your bravery."\nWith a wave of his hand, the diamond floated towards you. As you took it, a surge of power coursed through you, and you felt a newfound strength and agility.\n"Thank you," you said, your voice filled with gratitude. The gnome smiled. "Remember, with great power comes great responsibility. Use this wisely."\nWith a final nod, the gnome vanished, and you found yourself back in the forest, the ancient tree looming before you. The glowing orb was gone, leaving behind only a sense of wonder and fulfillment.\nThe end.`;
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

  /** Append to container storyHeader */
  storyHeader.append(title, storySection, question, buttonContainer);

  /** Change story image SceneMainOne */
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/a-gnome-inside-a-large-tree-is-surrounded-by-gems-trinkets.webp";
  
  /** Create the buttons for the Scene*/
  createButton(10, "playagain", loadStartScene, storyButtons);

  localStorage.clear();
}