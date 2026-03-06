document.addEventListener("DOMContentLoaded", function () {
	const slides = Array.from(document.querySelectorAll(".slideshows .slide"));
	const prevButton = document.querySelector(".slideshows .slide-nav.prev");
	const nextButton = document.querySelector(".slideshows .slide-nav.next");

	if (!slides.length || !prevButton || !nextButton) {
		return;
	}

	let currentSlideIndex = slides.findIndex((slide) => slide.classList.contains("active"));

	if (currentSlideIndex < 0) {
		currentSlideIndex = 0;
		slides[0].classList.add("active");
	}

	function showSlide(index) {
		slides[currentSlideIndex].classList.remove("active");
		currentSlideIndex = (index + slides.length) % slides.length;
		slides[currentSlideIndex].classList.add("active");
	}

	prevButton.addEventListener("click", function () {
		showSlide(currentSlideIndex - 1);
	});

	nextButton.addEventListener("click", function () {
		showSlide(currentSlideIndex + 1);
	});

	setTimeout(function () {
		showSlide(currentSlideIndex + 1);
	}, 15000);
});
