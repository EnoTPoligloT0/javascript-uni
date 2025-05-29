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

function updatePageIndicators() {
    const pages = [page1, page2, page3, page4, page5];
    pages.forEach((page, index) => {
        if (index === currentIndex) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
}

function showImage(index) {
    clearSlider();
    const img = createImage(images[index])
    sliderItems.appendChild(img)
    currentIndex = index; 
    updatePageIndicators(); 
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

const pages = [page1, page2, page3, page4, page5];

pages.forEach((page, index) => {
    page.addEventListener('click', () => {
        showImage(index);
    });
});

showImage(0);
