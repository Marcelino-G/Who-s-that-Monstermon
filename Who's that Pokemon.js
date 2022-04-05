let answeredCorrect = document.getElementById("totalCorrect")
let totalQuestion = document.getElementById("totalQuestionsNumber")
let numCorrect = 0;
let numTotalQuestions = 0;
answeredCorrect.innerHTML = numCorrect;
totalQuestion.innerHTML = numTotalQuestions;

const figCaptions = document.getElementsByTagName("figcaption")
const hints = document.getElementsByClassName("hint");

const imgs = document.getElementsByTagName("img");
const imgsArray = Array.from(imgs)
let urlsArray = []




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
   if (x === true){
      numCorrect ++;
      numTotalQuestions ++;
      answeredCorrect.innerHTML = numCorrect;
      totalQuestion.innerHTML = numTotalQuestions;
   } else if (x === false){
      numTotalQuestions ++;
      answeredCorrect.innerHTML = numCorrect;
      totalQuestion.innerHTML = numTotalQuestions;
   }
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

         z.addEventListener("click", () => {
   
            if (z.getAttribute("src") === x.sprites.back_default){ 

               z.setAttribute("src", x.sprites.front_default)
               updateQuestionCount(true);
               

            } else{
               updateQuestionCount(false);
            }
         })
      })
   })
}

function con(x) {

   return new Promise((resolve, reject) => {

      resolve (console.log(x));
   })
}

async function gettingAndMakingData() {

   const jsonResults = await fetching();
   const imgsFigCaptionsHtml = await createPokemon(jsonResults);
   const randomArrayNumber = await makeRandomArrayNumber();
   const randomJsonResult = await makeRandomJsonResultsNumber(jsonResults, randomArrayNumber);
   const randomImg = await makeRandomImgNumber(imgsFigCaptionsHtml[0], randomArrayNumber);
   const pHtmlHints = await creatingHints(hints, randomJsonResult); 
   const answer = await choosingAnswer(randomJsonResult)
   // const d = await con(answer);
   
}


urlLoop();
gettingAndMakingData();










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