document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    function showSlide(index) {
        const offset = -index * 100; // Offset in percentage
        slidesContainer.style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    function previousSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }

    // Automatically advance slides every 5 seconds
    const slideInterval = setInterval(nextSlide, 5000);

    // Handle swipe gestures for manual control
    let startX;

    function handleTouchStart(event) {
        startX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        if (startX === undefined) return;

        const currentX = event.touches[0].clientX;
        const diffX = startX - currentX;

        if (diffX > 50) {
            nextSlide();
            startX = undefined; // End swipe
        } else if (diffX < -50) {
            previousSlide();
            startX = undefined; // End swipe
        }
    }

    // Add event listeners for swipe
    slidesContainer.addEventListener('touchstart', handleTouchStart);
    slidesContainer.addEventListener('touchmove', handleTouchMove);

    // Add event listeners for navigation buttons
    document.querySelector('.owl-prev').addEventListener('click', previousSlide);
    document.querySelector('.owl-next').addEventListener('click', nextSlide);
});
