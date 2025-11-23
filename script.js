const url = "https://pokeapi.co/api/v2/pokemon/"

const buttonLeft = document.getElementById('buttonLeft')
const buttonRight = document.getElementById('buttonRight')
const containerCards = document.getElementById('containerCards')
const min = 1



window.onload( () => { 
    loadPage()
})

buttonLeft.addEventListener('click',() => {
    min = min - 20
    if(min <= 0) min = 1
    loadPage()
})

buttonRight.addEventListener('click', () => {
    min = min + 20
    loadPage()
})

async function loadPage(){
    containerCards.innerHTML = ''

    for(let i = min; i <= min + 20; i++){
        let data = await fetchData(i)
        createCard(data)
    }
}

async function fetchData(id){
    const response = await fetch(url+id)
    const data = await response.json()
    return data
}

function createCard(data){
    const newDiv = `
        <div class = 'card'>
            <img src = ${data.sprites.front_default}>
            <div class = 'cardText'>
                <p class = 'cardTextName'> ${data.name} </p>
            </div>
        </div>
    ` 
    containerCards.append(newDiv)
}







