var id_pokemon = 1
const url = "https://pokeapi.co/api/v2/pokemon/"
const namePokemon = document.getElementById("namePokemon")
const typesPokemon = document.getElementById("typesPokemon")
const heigthPokemon = document.getElementById("heightPokemon")
const weigthPokemon = document.getElementById("weightPokemon")
const imagePokemon = document.getElementById("imagePokemon")

const btn_left = document.getElementById("btn_left")
const btn_right = document.getElementById("btn_right")

onload = async () => {
    updateHtml(id_pokemon)
}

btn_left.addEventListener("click", async () => {
    id_pokemon = id_pokemon -1
    if(id_pokemon == 0) id_pokemon = 1
    updateHtml()
})

btn_right.addEventListener("click", async () => {
    id_pokemon = id_pokemon + 1
    updateHtml()
})


async function fetchData(){
    const response = await fetch(url+id_pokemon)
    const data = await response.json()
    return data
}

async function updateHtml(){
    let data = await fetchData()

    namePokemon.innerHTML = "<strong> Name :</strong> "  + await normalizeText(data.name) 
    heigthPokemon.innerHTML = "<strong> Height :</strong> " + String(data.height/10) + "<strong> M </strong>"
    weigthPokemon.innerHTML = "<strong> Weight :</strong> " + String(Number(data.weight)/10) + "<strong> Kg </strong>"
    imagePokemon.src = data.sprites.front_default

    let type_string = ""

    for(type_obj of data.types){
        type_string += type_obj.type.name
        type_string += " "
    }

    typesPokemon.innerHTML = "<strong> Types :</strong> " + await normalizeText(type_string)
}

async function normalizeText(text){
    text = String(text)
    let arrayStrings = text.split(" ")

    for(let i = 0; i < arrayStrings.length; i++){
        arrayStrings[i] = arrayStrings[i].charAt(0).toUpperCase() +  arrayStrings[i].slice(1).toLowerCase() + " ";
    }

    let newText = ""

    for(let i = 0; i < arrayStrings.length; i++){
        newText += arrayStrings[i];
    }

    return newText;
}

