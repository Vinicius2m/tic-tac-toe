const mainGame = document.querySelector(".mainGame")
const startButton = document.getElementById("startButton")
const gameContainer = document.querySelector(".gameContainer")

let player = true

const table = [
    "SSS",
    "SSS",
    "SSS"
]

startButton.addEventListener("click", startGame)

function startGame() {

    gameContainer.innerHTML = ""
    player = true

    table.forEach((element, index) => createCells(element, index))
}


function createCells(element, index) {
    const row = document.createElement("div")
    row.classList.add("container")

    index === 0 ?
        row.classList.add(`container${index + 1}`)
        :
        index === 1 ?
            row.classList.add(`container${index + 1}`)
            :
            index === 2 ?
                row.classList.add(`container${index + 1}`)
                :
                null

    for (let i = 0; i < element.length; i++) {
        const cell = element[i]
        if (cell === "S") {
            const cell = document.createElement("div")
            cell.classList.add("cell")
            cell.dataset.line = index
            cell.dataset.column = i
            row.appendChild(cell)
            cell.addEventListener("click", game)
        }
    }
    gameContainer.appendChild(row)
}

function game(evt) {
    console.log(evt.target.parentElement)

    if (evt.target.className === "cell" && player) {
        evt.target.classList.add("X")
        player = !player
    }

    if (evt.target.className === "cell" && !player) {
        evt.target.classList.add("O")
        player = !player
    }


}

function verifyWin(evtTarget) {

}
