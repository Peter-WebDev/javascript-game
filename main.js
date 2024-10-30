window.addEventListener("DOMContentLoaded", main);
/** Global variables for story and paragraf header, and story image */
const storyTitle = document.getElementById("storyTitle");
const storyText = document.getElementById("storyText");
const storyImage = document.getElementById("storyImage");
const storyBook = document.getElementById("storyBook");
const storyStart = document.getElementById("storyStart");

/** Starting point of program */
function main() {
    console.log("Check Start of program"); // Check program
    setupEventListerners();
    
    storyBook.style.display = "none";
};

/** Setup Eventlisteners for first function */
function setupEventListerners() {
    storyStart.onclick = gotoSceneOne;
}

/** Scene 1 */
function gotoSceneOne() {
    storyBook.style.display = "grid";
    storyStart.style.display = "none";
};