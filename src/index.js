

function updateDogTemp(obj, id) {
    if (obj.isGoodDog == true) {
        obj.isGoodDog = false
    } else {
        obj.isGoodDog = true
    }

    fetch(`${allDogUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({isGoodDog: obj.isGoodDog})
      })
      .then(res=>res.json())

}

//clicks on a pup's span
//info (image, name, and isGoodDog status) should show up
//div should have the following children:
//img , h2, button "good" or "bad"
//should render diff dog every click!!!

function renderInfo(e, obj) {
    let infoDiv = document.querySelector("#dog-info")

    while(infoDiv.firstChild) {
        infoDiv.removeChild(infoDiv.firstChild)
    }

    let dogDiv = document.createElement("div")
    dogDiv.id = obj.id
    infoDiv.appendChild(dogDiv)
    const puppyPic = document.createElement("img")
    puppyPic.setAttribute('src', `${obj.image}`)

    const h2 = document.createElement("h2")
    h2.innerText = `${obj.name}`
    const btn = document.createElement("button")

    if (obj.isGoodDog == true) {
        btn.innerText = "Good Dog!"
    } else {
        btn.innerText = "Bad Dog!"
    }

    dogDiv.appendChild(puppyPic)
    dogDiv.appendChild(h2)
    dogDiv.appendChild(btn)

    //button's text should change from Good to Bad or Bad to Good
    btn.addEventListener('click', () => {
        if (btn.innerText == "Good Dog!"){
            btn.innerText = "Bad Dog!"
        } else {
            btn.innerText = "Good Dog!"
        }
        updateDogTemp(obj, obj.id)})

    }



    //On page load, make a fetch to get all of the pup objects.
    //you'll need to add a span with the pup's name to the dog bar (ex: <span>Mr. Bonkers</span>)

    function addPup(pupObj) {
        const navBar = document.querySelector("#dog-bar")
        const span = document.createElement("span")
        span.id = `${pupObj.isGoodDog}`
        let infoDiv = document.querySelector("#dog-info")
        navBar.appendChild(span)
        span.innerText = `${pupObj.name}`
        span.addEventListener('click', (e) => {
            renderInfo(e, pupObj)
        })

    }


    function renderDogs(objects) {
        objects.map(pup => {
            addPup(pup);
        })
        const filterBtn = document.querySelector("#good-dog-filter")
        filterBtn.addEventListener('click', (e) => toggleSwitch(e, objects))
    }

const allDogUrl = "http://localhost:3000/pups"

function fetchDogObj() {
    fetch(allDogUrl)
    .then(res => res.json())
    .then(jsonData => renderDogs(jsonData))
}


//BONUS!! -- this function is called when the filterBtn is clicked, applies span style accordingly

function toggleSwitch(e, obj) {
    let trueSpans = document.querySelectorAll('#true')
    let falseSpans = document.querySelectorAll('#false')
    if (e.target.innerText === 'Filter good dogs: OFF') {
        e.target.innerText = 'Filter good dogs: ON'
        trueSpans.forEach(node => {node.style = "display: block"})
        falseSpans.forEach(node => {node.style = "display: none"})
    } else {
        e.target.innerText = 'Filter good dogs: OFF'
        falseSpans.forEach(node => {node.style = "display: block"})
        trueSpans.forEach(node => {node.style = "display: none"})
    }
}

// function renderGood(dogs){
//     let bar = document.querySelector("#dog-bar")
//     let span = document.querySelector(".span")
//     if (!span.id){
//        span.style.display = "none"
//     } else {
//         span.style.display = "visible"
//     }
// }

// function renderBad() {
//     let bar = document.querySelector("#dog-bar")
//     let span = document.querySelector(".span")
//     if (span.id){
//        span.style.display = "none"
//     } else {
//         span.style.display = "visible"
//     }
// }

document.addEventListener("DOMContentLoaded", fetchDogObj())







