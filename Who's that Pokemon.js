let correctTotalHtml = document.getElementById("totalCorrect")
let questionTotalHtml = document.getElementById("totalQuestionsNumber")
let correctTotal = 0;
let questionTotal = 0;
correctTotalHtml.innerHTML = correctTotal;
questionTotalHtml.innerHTML = questionTotal;

const figCaptions = document.getElementsByClassName("captionLineUp")
const hints = document.getElementsByClassName("hint");

const imgs = document.getElementsByClassName("imgLineUp");
const imgsArray = Array.from(imgs)
let urlsArray = []

const correctImg = document.getElementById("correctImg")
const correctCaption = document.getElementById("correctCaption")

const popUpDiv = document.getElementById("popUpCorrect")
const nextButton = document.getElementById("next");
const popUpText = document.getElementById("popUpText")




function randomNumber(max,min){
   return Math.floor(Math.random() * (max-min) + min)
}

function urlLoop(){
   for (let i = 0; i < 4; i++){
      let newNum = randomNumber(386,1);
      randomUrl = `https://pokeapi.co/api/v2/pokemon/${newNum}`
      urlsArray.push(randomUrl)
   }
}

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

async function fetching() {

   return Promise.all(urlsArray.map( async (url) => {
      const response = await fetch(url)
      return response.json();
      }) 
   )
}

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

function makeRandomArrayNumber () {

   return new Promise((resolve, reject) => {
      let randomArrayNum = randomNumber(4,0)
      resolve (randomArrayNum)
   }) 
}

function makeRandomJsonResultsNumber(x,y) {

   return new Promise((resolve, reject) => {
      resolve(x[y])
   })
}

function makeRandomImgNumber(x, y){

   return new Promise((resolve, reject) => {
      resolve(x[y])
   })


}

function creatingHints(x, y){

   x[0].innerHTML = y.abilities[0].ability.name.toUpperCase()
   x[1].innerHTML = y.types[0].type.name.toUpperCase()
   x[2].innerHTML = y.game_indices[0].version.name.toUpperCase()

   return new Promise((resolve, reject) => {
      resolve(x)
   })
}

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

nextButton.addEventListener("click", () => {

   
   reset();
   popUpDiv.classList.replace("d-block", "d-none");

})

function popUp(x){
   
   correctImg.setAttribute("src", x.sprites.front_default)
   correctImg.setAttribute("alt", x.species.name.charAt(0).toUpperCase() + x.species.name.slice(1))
   correctCaption.innerHTML = x.species.name.charAt(0).toUpperCase() + x.species.name.slice(1);
   popUpDiv.classList.replace("d-none", "d-block");
}

function reset() {
   urlsArray = [];
   urlLoop();
   theWholeProcess();
}



async function theWholeProcess() {

   const jsonResults = await fetching();
   const imgsFigCaptionsHtml = await createPokemon(jsonResults);
   const randomArrayNumber = await makeRandomArrayNumber();
   const randomJsonResult = await makeRandomJsonResultsNumber(jsonResults, randomArrayNumber);
   const randomImg = await makeRandomImgNumber(imgsFigCaptionsHtml[0], randomArrayNumber);
   const pHtmlHints = await creatingHints(hints, randomJsonResult); 
   const answerText = await choosingAnswer(randomJsonResult)
   const update = await updateQuestionCount(answerText);
   // const d = await con(update);
   
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