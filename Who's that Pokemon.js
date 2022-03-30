const holder = document.getElementById("holder");
let urlsArray = []
let dataArray = []

function randomNumber(){
   return Math.floor(Math.random() * (386-1) + 1)
}

function urlLoop(){
   for (let i = 0; i < 4; i++){
      let newNum = randomNumber();
      randomUrl = `https://pokeapi.co/api/v2/pokemon/${newNum}`
      urlsArray.push(randomUrl)
   }
}
urlLoop();

function fetching() {
   (urlsArray.map((url) => {
      fetch (url)
         .then (response => response.json())
         .then (data => dataArray.push(data))
         .then (dataA => createPokemon(dataA))
      })
   )
}
fetching()

function createPokemon (x){
   let pokemonFigure = document.createElement("figure")
   holder.append(pokemonFigure);
   let pokemonImg = document.createElement("img")
   let pokemonCaption = document.createElement("figcaption")

   dataArray.map((x) => {

      let srcAttribute = x.sprites.back_default;
      let altAttribute = x.species.name

      pokemonImg.setAttribute("src", srcAttribute)
      pokemonImg.setAttribute("alt", altAttribute)
      pokemonFigure.append(pokemonImg)

      pokemonCaption.innerHTML = altAttribute
      pokemonFigure.append(pokemonCaption)
   }) 

   let m = document.getElementsByTagName("figure");
   m[1].style.display = "none";

}


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