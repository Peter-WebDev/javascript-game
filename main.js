window.addEventListener("DOMContentLoaded", main);

/** Create Buttons from the global array */
function createButton(index, id, onClickNextFunction, container) {
  const buttonNames = ["West", "East", "North", "South", "Pick up", "Buy item", "Retry", "New character", "Start"];
  const button = document.createElement("button");
  button.textContent = buttonNames[index];
  button.id = id;
  button.addEventListener("click", onClickNextFunction);
  button.classList.add("btn");
  container.appendChild(button);
}

/** Starting point of program */
function main() {
  const pageHeader = document.getElementById("pageHeader");
  pageHeader.innerHTML = "";

  // Create p element above the h1
  const pageParagraf = document.createElement("p");
  pageParagraf.textContent = "A tale from the woods";
  pageParagraf.className = "pageParagraf";
  // pageHeader.appendChild(pageParagraf);

  // Create the h1 element
  const pageTitle = document.createElement("h1");
  pageTitle.textContent = "The Forest";
  pageTitle.className = "pageTitle";
  // pageHeader.appendChild(pageTitle);

  // Create form
  const form = document.createElement("form");
  form.id = "formCharacterName";
  // pageHeader.appendChild(form);

  pageHeader.append(pageParagraf, pageTitle, form);

  // Create label element
  const label = document.createElement("label");
  label.textContent = "Character name?";
  label.className = "formlabel";
  label.htmlFor = "characterName"; // Link label to input with for
  form.appendChild(label);

  // Create input text field
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.id = "characterName";
  inputField.name = "characterName";
  form.appendChild(inputField);

  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";

  const book = document.getElementById("storyBook");
  book.style.display = "none";

  createButton(8, "storyStart", saveUserInfo, form);
}

/** Setup Eventlisteners for first function */
// function setupEventListerners() {
// }

function saveUserInfo(event) {
  event.preventDefault();
  const nameInput = document.getElementById("characterName");
  localStorage.setItem("charactername", nameInput.value);

  const node = document.getElementById("formCharacterName");
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }

  createSceneMainOne();
}

function loadUserInfo() {
  let characterName = localStorage.getItem("charactername");

  if (characterName) {
    characterName.textContent = "Welcome " + characterName + " to The Forest's Edge";
  } else {
    characterName.textContent = "Welcome stranger to The Forest's Edge";
  }
  return characterName;
}

/** Scene Main One */
function createSceneMainOne() {
  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";
   
  const book = document.getElementById("storyBook");
  book.style.display = "grid";

  // Get the characters name
  const characterName = loadUserInfo();

  // Create h2 element and add the char name to the textContent
  const title = document.createElement("h2");
  title.id = "storyTitle";
  title.className = "storytitle";
  title.textContent = `${characterName}`;

  // Create section for the paragraphs
  const storySection = document.createElement("section");
  storySection.className = "storyText";

  // Text to be split
  const text = 'You stand at the edge of an ancient forest, the sun dappling through the canopy. The air is thick with the scent of pine needles and damp earth, and the only sound is the gentle rustle of leaves. A sense of wonder and trepidation fills you as you look around.\nThe trees, ancient and gnarled, towered above, their branches intertwining to form a dense canopy. Strange, otherworldly sounds echoed through the undergrowth—the distant howl of a wolf, the eerie chirping of unseen insects. A surge of curiosity and a hint of trepidation fill your heart. You know that danger lurks in the shadows, but the allure of the unknown and treasures is too strong to resist.\nTo the west, a path winds down to an opening into the ancient forest. To the east, a narrow passage, barely wide enough for a single person, wound its way between the large rocks.';
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

  /** Append to container storyHeader */
  storyHeader.append(title, storySection, question, buttonContainer);

  /** Change story image SceneMainOne */
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/dense-grey-forest-pexels-eberhardgross.webp";
  
  /** Create the buttons SceneMainOne */
  createButton(0, "west", createSceneForestOne, storyButtons);
  createButton(1, "east", createSceneCaveOne, storyButtons);
}

/** Scene Alt Main One */
function createSceneAltMainOne() {
  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";

  // Get the characters name
  const characterName = loadUserInfo();

  // Create h2 element and add the char name to the textContent
  const title = document.createElement("h2");
  title.id = "storyTitle";
  title.className = "storytitle";
  title.textContent = `${characterName}`;

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

  /** Append to container storyHeader */
  storyHeader.append(title, storySection, question, buttonContainer);

  /** Change story image SceneMainOne */
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/dense-grey-forest-pexels-eberhardgross.webp";
  
  /** Create the buttons SceneMainOne */
  createButton(0, "west", createSceneForestOne, storyButtons);
  createButton(1, "east", createSceneCaveOne, storyButtons);
}

/** Scene Forest One */
function createSceneForestOne() {
  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";

  // Get the characters name
  const characterName = loadUserInfo();

  // Create h2 element and add the char name to the textContent
  const title = document.createElement("h2");
  title.id = "storyTitle";
  title.className = "storytitle";
  title.textContent = `${characterName}`;

  // Create section for the paragraphs
  const storySection = document.createElement("section");
  storySection.className = "storyText";

  // Text to be split
  const text = "As you walked further into the forest, you couldn't shake the feeling that you were being watched. The trees seemed to lean in, their gnarled branches reaching out like skeletal fingers. The sunlight, once warm and inviting, now seemed to cast an eerie glow on the forest floor.\nAs you start to quickened your pace, hoping to escape the oppressive silence, you see a hooded figure standing in the shadows. The figure stepped into the light, revealing a merchant with a wide grin and a bag full of peculiar items.\nThe merchant offered you a variety of magical trinkets, potions, and weapons. He spoke of ancient relics, lost treasures, and forbidden knowledge. You were very intrigued by a certain item. A ring with an Adamas, the most powerful of all gemstones in the fight against evil. However, the merchant's appearance in such a remote and dangerous place was unsettling.";
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
  question.textContent = "What's your next move?"

  // Create Button Container
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "storyButtons";
  buttonContainer.className = "buttoncontainer";

  /** Append to container storyHeader */
  storyHeader.append(title, storySection, question, buttonContainer);

  /** Change story image SceneMainOne */
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/an-old-merchant-by-the-campfire-surrounded-by-gnarly-trees.webp";
  
  /** Create the buttons SceneForestOne */
  createButton(1, "east", createSceneMainOne, storyButtons);
  createButton(3, "south", createSceneForestTwo, storyButtons);
  createButton(5, "buyitem", createSceneForestDeath, storyButtons);
}

/** Scene Forest Two */
function createSceneForestTwo() {
  console.log("Forest Two");
  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";

  // Get the characters name
  const characterName = loadUserInfo();

  // Create h2 element and add the char name to the textContent
  const title = document.createElement("h2");
  title.id = "storyTitle";
  title.className = "storytitle";
  title.textContent = `${characterName}`;

  // Create section for the paragraphs
  const storySection = document.createElement("section");
  storySection.className = "storyText";

  // Text to be split
  const text = "You continued your journey, deeper into the heart of the forest. The trees grew older and more twisted, their roots gnarled and exposed. Strange fungi, bioluminescent and otherworldly, clung to the decaying trunks. A sense of isolation crept over you as the forest seemed to close in around you. The only sound was the distant whisper of the wind and the occasional snap of a twig.\nAs you ventured further into the forest, the air grew colder and the shadows deeper. You could feel the ancient power of the woods, a force both awe-inspiring and terrifying.\nThe trees seemed to watch your every move, their gnarled branches reaching out like skeletal fingers. You knew that you were treading on sacred ground, and that the forest would not easily surrender its secrets.";
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
  question.textContent = "What's your next move?"

  // Create Button Container
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "storyButtons";
  buttonContainer.className = "buttoncontainer";

  /** Append to container storyHeader */
  storyHeader.append(title, storySection, question, buttonContainer);

  /** Change story image SceneMainOne */
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/an-old-merchant-by-the-campfire-surrounded-by-gnarly-trees.webp";
  
  /** Create the buttons SceneForestOne */
  createButton(1, "east", createSceneMainOne, storyButtons);
  createButton(3, "south", createSceneForestTwo, storyButtons);
  createButton(5, "buyitem", createSceneForestDeath, storyButtons);
}

/** Scene Forest Three Treasure */
function createSceneForestThree() {
  console.log("Forest Three");
}

/** Scene Forest Death */
function createSceneForestDeath() {
  console.log("Forest Death");
  const storyHeader = document.getElementById("storyHeader");
  storyHeader.innerHTML = "";

  // Get the characters name
  const characterName = loadUserInfo();

  // Create h2 element and add the char name to the textContent
  const title = document.createElement("h2");
  title.id = "storyTitle";
  title.className = "storytitle";
  title.textContent = `${characterName}`;

  // Create section for the paragraphs
  const storySection = document.createElement("section");
  storySection.className = "storyText";

  // Text to be split
  const text = "The ring was a beauty, a glinting circlet of silver and an emerald as green as the forest’s heart. The merchant assured you of its power, its ability to grant wishes.\nAs you slipped the ring onto your finger, a strange sensation pulsed through you, a tingling warmth that spread from your hand to your heart. A moment later, a cold, hard sensation enveloped you. Panic set in as you realized you couldn’t move, couldn’t speak. Your body felt heavy, as if it were being pulled into stone.\nYou looked down at your hands, horrified to see them turning to stone, the intricate veins and delicate skin hardening into a cold, lifeless form. The process spread upwards, hardening your arms, your chest, your face. As the final tendrils of life were extinguished, you were left a statue, forever trapped in the moment of your transformation.\nThe merchant, his true form revealed, watched with a sinister smile. He had found another victim, another soul to add to his growing collection of stone statues.";
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
  question.textContent = "What's your next move?"

  // Create Button Container
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "storyButtons";
  buttonContainer.className = "buttoncontainer";

  /** Append to container storyHeader */
  storyHeader.append(title, storySection, question, buttonContainer);

  /** Change story image SceneMainOne */
  const storyImage = document.getElementById("storyImage");
  storyImage.src = "assets/image/an-old-merchant-by-the-campfire-surrounded-by-gnarly-trees.webp";
  
  /** Create the buttons SceneForestOne */
  createButton(6, "retry", createSceneAltMainOne, storyButtons);
  createButton(7, "new", main, storyButtons);
}

/** Scene Cave One */
function createSceneCaveOne() {
  console.log("Cave One");
}

/** Scene Cave Two */

/** Scene Cave Death */

/** Scene Treasure */
