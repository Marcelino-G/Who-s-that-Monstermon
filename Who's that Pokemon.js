const holder = document.getElementById("holder");
const questions = document.getElementById("questions");
let urlsArray = []
let dataArray = []

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

function fetching() {

   return promise = new Promise ((resolve,reject) => {
      
      urlsArray.map((url) => {
         fetch (url)
            .then (response => (response.json()))
            .then (data => { 
               dataArray.push(data);
               if(dataArray.length == 4){
                  resolve(dataArray)
                  }
               })
      })
   })  
}

function createPokemon(){

   return promise = new Promise ((resolve, reject) => {

      dataArray.map((x) => {
         let pokemonFigure = document.createElement("figure")
         holder.append(pokemonFigure);
         let pokemonImg = document.createElement("img")
         let pokemonCaption = document.createElement("figcaption")
   
         let srcAttribute = x.sprites.back_default;
         let altAttribute = x.species.name
   
         pokemonImg.setAttribute("src", srcAttribute)
         pokemonImg.setAttribute("alt", altAttribute)
         pokemonFigure.append(pokemonImg)
   
         pokemonCaption.innerHTML = altAttribute
         pokemonFigure.append(pokemonCaption)

         let imgs = document.getElementsByTagName("img");
         
         if (imgs.length === 4){
            imgs = document.getElementsByTagName("img");
            resolve(Promise.all(imgs))
         }
      }) 
   })
}

function grabRandomDataArray () {

   return new Promise((resolve, reject) => {
      let dataArrayRandomNum = randomNumber(4,0)
      resolve (dataArrayRandomNum)
   }) 
}

function randoData(x) {

   return new Promise((resolve, reject) => {
      resolve(dataArray[x])
   })
}

function randoFigure(x){

   return new Promise((resolve, reject) => {

      resolve(x)
   })


}

function creatingHints(x){

   questions.innerHTML = `<p>one of my abilities is called ${x.abilities[0].ability.name}.</p>
   <p>I am a ${x.types[0].type.name} type of Pokemon.</p>
   <p>You can find me in PokeMon ${x.game_indices[0].version.name}</p> `


   return new Promise((resolve, reject) => {
      resolve (questions)
   })
}

function clicks(x, y, z) {

   return new Promise((resolve, reject) => {

      for (let i = 0; i < x.length; i++){

         x[i].addEventListener("click", () => {

            if (x[i].getAttribute("src") === y.getAttribute("src") ){

               console.log("corrrecto")
               x[i].setAttribute("src", z[i].sprites.front_default)
            } else {
               console.log ("wrong")
            }
         })
      }
   })
}

function con(x) {

   return new Promise((resolve, reject) => {

      resolve (console.log(x));
   })
}

async function gettingAndMakingData() {

   const result = await fetching();
   const imgsHtml = await createPokemon();
   const d = await con(result);
   const randomArray = await grabRandomDataArray();
   const randomDataArray = await randoData(randomArray);
   const randomImgArray = await randoFigure(imgsHtml[randomArray]);
   const hintHtml = await creatingHints(randomDataArray); 
   const clicked = await clicks(imgsHtml, randomImgArray, result)
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