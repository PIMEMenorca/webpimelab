document.addEventListener("DOMContentLoaded", function () {
	const slideshow = document.querySelector(".slideshows");
	const slides = Array.from(document.querySelectorAll(".slideshows .slide"));
	const prevButton = document.querySelector(".slideshows .slide-nav.prev");
	const nextButton = document.querySelector(".slideshows .slide-nav.next");
	const AUTO_PLAY_INTERVAL = 4000;
	let autoplayTimerId = null;

	if (!slideshow || !slides.length || !prevButton || !nextButton) {
		return;
	}

	let currentSlideIndex = slides.findIndex((slide) => slide.classList.contains("active"));

	if (currentSlideIndex < 0) {
		currentSlideIndex = 0;
		slides[0].classList.add("active");
	}

	function stopAutoplay() {
		if (autoplayTimerId !== null) {
			clearInterval(autoplayTimerId);
			autoplayTimerId = null;
		}
	}

	function startAutoplay() {
		stopAutoplay();
		autoplayTimerId = setInterval(function () {
			showSlide(currentSlideIndex + 1);
		}, AUTO_PLAY_INTERVAL);
	}

	function showSlide(index) {
		const nextSlideIndex = (index + slides.length) % slides.length;

		if (nextSlideIndex === currentSlideIndex) {
			return;
		}

		const previousSlide = slides[currentSlideIndex];
		previousSlide.classList.add("exiting");
		previousSlide.classList.remove("active");

		currentSlideIndex = nextSlideIndex;
		slides[currentSlideIndex].classList.add("active");

		setTimeout(() => {
			previousSlide.classList.remove("exiting");
		}, 600);
	}

	prevButton.addEventListener("click", function () {
		showSlide(currentSlideIndex - 1);
		startAutoplay();
	});

	nextButton.addEventListener("click", function () {
		showSlide(currentSlideIndex + 1);
		startAutoplay();
	});

	slideshow.addEventListener("mouseenter", stopAutoplay);
	slideshow.addEventListener("mouseleave", startAutoplay);

	startAutoplay();
});
