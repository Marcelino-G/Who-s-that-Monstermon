const picCapContainer = document.getElementById("pokemonPics")
// let pics = document.createElement("img")

// holder.append(pics)

function randomNumber(){
   return Math.floor(Math.random() * (386-1) + 1)
}

async function srcAltCollect () {

   for (let i = 0; i < 4; i++){
   
      let newNum = randomNumber();
      let url = `https://pokeapi.co/api/v2/pokemon/${newNum}`
   
      fetch(url)
         .then (response => response.json())
         .then (data => {
            let pics = document.createElement("img")
            let srcAttribute = data.sprites.back_default
            let altAttribute = data.species.name
            pics.setAttribute("src", srcAttribute)
            pics.setAttribute("alt", altAttribute)
            picCapContainer.append(pics)
            let caption = document.createElement("figcaption")
            caption.innerHTML = altAttribute
            picCapContainer.append(caption)
         });
   }

}



   let pokemon = document.getElementsByTagName("img")

   





