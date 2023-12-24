async function start() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json()
        createBookList(data.message)
    }
    catch {
        console.log("there was a problem fetching the breed list")
    }
    
}
start()
function createBookList(breedList) {
    document.getElementById("breed").innerHTML = `
     <select onchange="loadBybreed(this.value)">
            <option> Choose a Breed Name </option>
            ${Object.keys(breedList).map(function (breed) {
                return `<option>${breed}</option>`
            } ).join('')}
      </select >
         `
}
async function loadBybreed(breed) {
    if (breed != "Choose a Breed Name")
    {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createSlideshow(data.message)
    }
}


function createSlideshow(images) {
    let currentPosition = 0 
    document.getElementById("slideshow").innerHTML = ` 
    
    <div class="slide" style="background-image:url('${images[0]}')"></div>
    <div class="slide" style="background-image:url('${images[1]}')"></div>
    `
    currentPosition += 2 
    setInterval(nextSlide, 3000)
    function nextSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", ` <div class="slide" style="background-image:url('${images[currentPosition]}')"></div> `)
        setTimeout(function () {
            document.querySelector(".slide").remove()
            if (currentPosition >= images.length)
                currentPosition = 0
            else {
                currentPosition++
            }
        },1000)
    }
}

