window.addEventListener("DOMContentLoaded", main);
/** Global variables for story and paragraf header, and story image */
const storyTitle = document.getElementById("storyTitle");
const storyText = document.getElementById("storyText");
const storyImage = document.getElementById("storyImage");
const storyBook = document.getElementById("storyBook");
const storyStart = document.getElementById("storyStart");

/** Göra om till en array? */
const east = document.getElementById("east");
const west = document.getElementById("west");
const north = document.getElementById("north");
const south = document.getElementById("south");

/** Starting point of program */
function main() {
    console.log("Check Start of program"); // Check program
    setupEventListerners();
    
    storyBook.style.display = "none";
};

/** Setup Eventlisteners for first function */
function setupEventListerners() {
    storyStart.onclick = createSceneMainOne;
}

/** Scene Main One */
function createSceneMainOne() {
    storyBook.style.display = "grid";
    storyStart.style.display = "none";
    storyImage.src = 'https://picsum.photos/id/15/800/600.webp';
    north.style.display = "none";
    south.style.display = "none";
    west.onclick = createSceneForestOne;
    east.onclick = createSceneCaveOne;
};

/** Scene Alt Main One */
function createSceneAltMainOne() {
    storyImage.src = 'https://picsum.photos/id/95/800/600.webp';
    storyTitle.innerText = "The Forest's Edge"
    storyText.innerHTML = '<p>You find yourself awakening to the sound of gentle rustle of leaves.<p>"Where am I?” A voice echoed in your mind.</p><p>You suddenly remember fearsome trolls and mischievous goblins and a legend that speaks of a forgotten realm, hidden deep within these ancient forests, holding treasures beyond imagination.</p><p>“Was it a dream, or a glimpse of something real?”, "Have I been here before?" you wondered, your mind racing.</p><p>A surge of curiosity and a hint of trepidation fill your heart. You know that danger lurks in the shadows, but the allure of the unknown and treasures is too strong to resist.</p>';
    north.style.display = "none";
    south.style.display = "none";
    west.innerText = "West";
    east.innerText = "East";
    west.onclick = createSceneForestOne;
    east.onclick = createSceneCaveOne;
};

/** Scene Forest One */
function createSceneForestOne() {
    storyImage.src = 'assets/image/an-old-merchant-by-the-campfire-surrounded-by-gnarly-trees.webp';
    south.style.display = "inline-block";
    storyTitle.innerText = "The Forest is watching";
    storyText.innerHTML = "<p>As you walked further into the forest, you couldn't shake the feeling that you were being watched. The trees seemed to lean in, their gnarled branches reaching out like skeletal fingers. The sunlight, once warm and inviting, now seemed to cast an eerie glow on the forest floor.</p><p>As you start to quickened your pace, hoping to escape the oppressive silence, you see a hooded figure standing in the shadows. The figure stepped into the light, revealing a merchant with a wide grin and a bag full of peculiar items.</p><p>The merchant offered you a variety of magical trinkets, potions, and weapons. He spoke of ancient relics, lost treasures, and forbidden knowledge. You were very intrigued by a certain item. A ring with an Adamas, the most powerful of all gemstones in the fight against evil. However, the merchant's appearance in such a remote and dangerous place was unsettling.</p>";
    west.innerText = "Buy item"
    west.onclick = createSceneForestDeath;
    east.onclick = createSceneAltMainOne;
    south.onclick = createSceneForestTwo;
}

/** Scene Cave One */
function createSceneCaveOne() {
    storyImage.src = 'https://picsum.photos/id/168/800/600.webp';
}

/** Scene Forest Death */
function createSceneForestDeath() {
    storyImage.src = 'https://picsum.photos/id/53/800/600.webp';
    storyTitle.innerText = "The Merchant's true form";
    storyText.innerHTML = "<p>The ring was a beauty, a glinting circlet of silver and an emerald as green as the forest’s heart. The merchant assured you of its power, its ability to grant wishes.</p><p>As you slipped the ring onto your finger, a strange sensation pulsed through you, a tingling warmth that spread from your hand to your heart. A moment later, a cold, hard sensation enveloped you. Panic set in as you realized you couldn’t move, couldn’t speak. Your body felt heavy, as if it were being pulled into stone.</p><p>You looked down at your hands, horrified to see them turning to stone, the intricate veins and delicate skin hardening into a cold, lifeless form. The process spread upwards, hardening your arms, your chest, your face. As the final tendrils of life were extinguished, you were left a statue, forever trapped in the moment of your transformation.</p><p>The merchant, his true form revealed, watched with a sinister smile. He had found another victim, another soul to add to his growing collection of stone statues.</p>";
    west.innerText = "Restart";
    east.innerText = "Try again";
    west.onclick = main;
    east.onclick = sceneAltMainOne;
    south.style.display = "none";
}