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

         let figs = document.getElementsByTagName("figure");
         
         if (figs.length == 4){
            let figs = document.getElementsByTagName("figure");
            resolve (figs)
         }
      }) 






   })



   
  
}

function grabFigures (x) {

   console.log(x[3])

}






const myPromise = new Promise((resolve , reject) => {

   resolve(fetching())
})

myPromise
   .then (data => createPokemon())
   .then (figs => grabFigures(figs))










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