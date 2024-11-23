const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
const totalSlides = slides.length;

// Function to move to the next slide
function moveToNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

// Function to move to the previous slide
function moveToPrevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Function to update the carousel position
function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Auto slide every 5 seconds
let autoSlide = setInterval(moveToNextSlide, 5000);

// Add event listeners for manual navigation
nextBtn.addEventListener('click', () => {
    clearInterval(autoSlide); // Stop auto slide when manually navigating
    moveToNextSlide();
    autoSlide = setInterval(moveToNextSlide, 5000); // Restart auto slide after navigation
});

prevBtn.addEventListener('click', () => {
    clearInterval(autoSlide); // Stop auto slide when manually navigating
    moveToPrevSlide();
    autoSlide = setInterval(moveToNextSlide, 5000); // Restart auto slide after navigation
});
