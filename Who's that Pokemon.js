// creating the score that reflects in the html
let correctTotalHtml = document.getElementById("totalCorrect")
let questionTotalHtml = document.getElementById("totalQuestionsNumber")
let correctTotal = 0;
let questionTotal = 0;
correctTotalHtml.innerHTML = correctTotal;
questionTotalHtml.innerHTML = questionTotal;

// the caption and image choices to choose from (4)
const figCaptions = document.getElementsByClassName("captionLineUp")
const imgs = document.getElementsByClassName("imgLineUp");
const imgsArray = Array.from(imgs)

// 3 hints
const hints = document.getElementsByClassName("hint");

// an empty array for urls to be later stored in
let urlsArray = []

// ONE image and caption that is used for the popup div
const correctImg = document.getElementById("correctImg")
const correctCaption = document.getElementById("correctCaption")

// the popup content (div, next button, and the text that changes whether you got it wrong or not)
const popUpDiv = document.getElementById("popUpCorrect")
const nextButton = document.getElementById("next");
const popUpText = document.getElementById("popUpText")

// returns a random number
function randomNumber(max,min){
   return Math.floor(Math.random() * (max-min) + min)
}

// uses the randomNumber() function and then inserts that number 
// to the end of the url which leads to a unique pokemon, and then 
// pushing it into the urlsArray. (4 times)
function urlLoop(){

   for (let i = 0; i < 4; i++){
      let newNum = randomNumber(386,1);
      randomUrl = `https://pokeapi.co/api/v2/pokemon/${newNum}`
      urlsArray.push(randomUrl)
   }
}

// this fetches the data from the 4 urls stored in urlsArray.
async function fetching() {

   return Promise.all(urlsArray.map( async (url) => {
      const response = await fetch(url)
      return response.json();
      }) 
   )
}

// some of the fetched data is pulled and 
// inserted into the html elements (pokemon back image and pokemon name).
function createPokemon(x){

   return promise = new Promise ((resolve, reject) => {

      for (let i = 0; i < x.length; i++){
         imgs[i].setAttribute("src", x[i].sprites.back_default)
         imgs[i].setAttribute("alt", x[i].species.name.charAt(0).toUpperCase() + x[i].species.name.slice(1))
         figCaptions[i].innerHTML = x[i].species.name.charAt(0).toUpperCase() + x[i].species.name.slice(1);
      }
      resolve(Promise.all([imgs, figCaptions]))
   })
}

// a random number between 0-3 is made.
function makeRandomArrayNumber () {

   return new Promise((resolve, reject) => {
      let randomArrayNum = randomNumber(4,0)
      resolve (randomArrayNum)
   }) 
}

// the random number made from makeRandomArrayNumber () 
// is used to target a random specific fetched result from the
// fetched array created from the fetching() function 
function makeRandomJsonResultsNumber(x,y) {

   return new Promise((resolve, reject) => {
      resolve(x[y])
   })
}

// the SAME random number made using the makeRandomArrayNumber()
// that was applied to the makeRandomJsonResultsNumber(x,y) is going to be 
// used here. so the *random fetched array result (makeRandomJsonResultsNumber(x,y)) 
// and *random img array result in this function match.
function makeRandomImgNumber(x, y){

   return new Promise((resolve, reject) => {
      resolve(x[y])
   })
}

// data is pulled ONLY from the 
// *random fetched array result (makeRandomJsonResultsNumber(x,y))
// to create information to be inserted into the html.
function creatingHints(x, y){

   x[0].innerHTML = y.abilities[0].ability.name.toUpperCase()
   x[1].innerHTML = y.types[0].type.name.toUpperCase()
   x[2].innerHTML = y.game_indices[0].version.name.toUpperCase()

   return new Promise((resolve, reject) => {
      resolve(x)
   })
}

// "click" event listener that triggers when a pokemon (img) is chosen. 
// depending on whether it was the correct answer or not,
// the text will be different inside of the now visible popUpDiv (originally display none).
function choosingAnswer(x) {

   return new Promise((resolve, reject) => {

      imgsArray.map((z) => {

         z.addEventListener("click", async () => {
   
            if (z.getAttribute("src") === x.sprites.back_default){ 

               popUpText.textContent = "CORRECT!"
               popUp(x);
               resolve(popUpText.textContent)

            } else if (z.getAttribute("src") != x.sprites.back_default){
               popUpText.textContent = "INCORRECT! The correct answer should have been"
               popUp(x);
               resolve(popUpText.textContent)
               
            }
         })
      })
   })
}

// makes the popUpDiv display none to display block, revealing it.
// the text inside of it is determined based on the answer chosen,
// letting you know if it was correct or not. regardless, the correct 
// image (front view) and caption is used. correct data is taken from
// makeRandomJsonResultsNumber(x,y) result
function popUp(x){
   
   correctImg.setAttribute("src", x.sprites.front_default)
   correctImg.setAttribute("alt", x.species.name.charAt(0).toUpperCase() + x.species.name.slice(1))
   correctCaption.innerHTML = x.species.name.charAt(0).toUpperCase() + x.species.name.slice(1);
   popUpDiv.classList.replace("d-none", "d-block");
}

// this updates the score count two different ways, 
// depending on whether you answered correct or not.
function updateQuestionCount(x){

   return new Promise ((resolve, reject) => {

      if (x === "CORRECT!"){
         correctTotal ++;
         questionTotal ++;
         correctTotalHtml.innerHTML = correctTotal;
         questionTotalHtml.innerHTML = questionTotal;
      } else{
         questionTotal ++;
         questionTotalHtml.innerHTML = questionTotal;
      }
   })
}

// "next" button inside the popUpDiv in html.
// when clicked, it runs the reset() function and makes the 
// popUpDiv display none again. 
nextButton.addEventListener("click", () => {

   reset();
   popUpDiv.classList.replace("d-block", "d-none");
})

// empties the urlsArray of the previous random fetched urls (4).
// it then runs the same process again, obtaining 4 new random urls
// and pushing them into the new empty urlsArray. These new urls
// are then used with fetch and to create the content all over again.  
function reset() {
   
   urlsArray = [];
   urlLoop();
   theWholeProcess();
}


async function theWholeProcess() {

   const jsonResults = await fetching();

   // creates an array of 2 HTMLcollections. 
   // the first consists of images and the second figcaptions
   const imgsFigCaptionsHtml = await createPokemon(jsonResults);

   // random number to be used to access ONE matching json result and image 
   // from their own array.
   const randomArrayNumber = await makeRandomArrayNumber();
   const randomJsonResult = await makeRandomJsonResultsNumber(jsonResults, randomArrayNumber);
   const randomImg = await makeRandomImgNumber(imgsFigCaptionsHtml[0], randomArrayNumber);
   
   // uses the ONE random fetched json result to create
   // and insert html content.
   const pHtmlHints = await creatingHints(hints, randomJsonResult); 

   // uses the ONE random fetched json result to determine
   // what the text inside the popUpDiv is going to be.
   const answerText = await choosingAnswer(randomJsonResult)

   // the score is updated depending on the outcome of the
   // popUpDiv text content, which is determined by 
   // which pokemon was chosen.
   const update = await updateQuestionCount(answerText);

   // const d = await con(imgsFigCaptionsHtml);
}


urlLoop();
theWholeProcess();




// function con(x) {

//    return new Promise((resolve, reject) => {

//       resolve (console.log(x));
//    })
// }

// async function fetchJSON (url) {
//    const response = await fetch(url, {
//      headers: { accept: "application/json" }
//    });
 
//    return response.json();
//  }
 
//  async function fetching () {
//    return Promise.all(urlsArray.map(fetchJSON));
//  }
 
//  (async () => {
 
//  console.log(await fetching());
 
//  })();