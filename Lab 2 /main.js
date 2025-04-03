const sliderContainer = document.querySelector('.slider-container')
const sliderItems = document.querySelector('#slider-items')
const nextBtn = document.querySelector('#next')
const prevBtn = document.querySelector('#prev')
const page1 = document.querySelector('#page-1')
const page2 = document.querySelector('#page-2')
const page3 = document.querySelector('#page-3')
const page4 = document.querySelector('#page-4')
const page5 = document.querySelector('#page-5')

const images = [
    "https://picsum.photos/200/305",
    "https://picsum.photos/200/304",
    "https://picsum.photos/200/303",
    "https://picsum.photos/200/302",
    "https://picsum.photos/200/301"
]

let currentIndex = 0;

function createImage(src) {
    const img = document.createElement('img')
    img.src = src
    return img;
}

function showImage(index) {
    // while (sliderItems.firstChild) {
    //     sliderItems.removeChild(sliderItems.firstChild);
    // }
    clearSlider();
    const img = createImage(images[index])
    sliderItems.appendChild(img)
}



const clearSlider = () => {
    while (sliderItems.firstChild) {
        sliderItems.removeChild(sliderItems.firstChild);
    }
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length; 
    showImage(currentIndex);
})

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
})

page1.addEventListener('click', () => {
    showImage(0);
})

page2.addEventListener('click', () => {
    showImage(1);
})

page3.addEventListener('click', () => {
    showImage(2);
})

page4.addEventListener('click', () => {
    showImage(3);
})

page5.addEventListener('click', () => {
    showImage(4);
})


// setTimeout(
//     () => {
//         console.log('Ouc!')
//         const box = document.querySelector('#slider-inner')
//         img1.style.transform = 'translate(200px,0px)'
//         setTimeout()
//     }, 2_000)

let positionX = 0
const anim = setInterval(
    () => {
        const box = document.querySelector('#slider-inner')
        img1.style.transform = `translate(${positionX}px,0px)`
        positionX++
    }, 16)
// przerywanie setInterval
setTimeout(() => {
    clearInterval(anim)
}, 6_000)

// dla stricte animacji zamiast setInterval stosujemy requestAnimationFrame
requestAnimationFrame(
    () => {
        const box = document.querySelector('#slider-inner')
        box.style.transform = `translate(${positionX}px,0px)`
        positionX++
        requestAnimationFrame(anim)
    })

function animateSlider() {
    img1.style.transform = `translate(${positionX}px,0px)`
    positionX++;
}

requestAnimationFrame(animateSlider)