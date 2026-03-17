document.addEventListener("DOMContentLoaded", function () {
	const slideshow = document.querySelector(".slideshows");
	const slides = Array.from(document.querySelectorAll(".slideshows .slide"));
	const prevButton = document.querySelector(".slideshows .slide-nav.prev");
	const nextButton = document.querySelector(".slideshows .slide-nav.next");
	const AUTO_PLAY_INTERVAL = 4000;
	let autoplayTimerId = null;
	let transitionResetTimerId = null;

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

		slideshow.classList.add("is-animating");
		slides.forEach((slide) => slide.classList.remove("exiting"));

		const previousSlide = slides[currentSlideIndex];
		previousSlide.classList.add("exiting");
		previousSlide.classList.remove("active");

		currentSlideIndex = nextSlideIndex;
		slides[currentSlideIndex].classList.add("active");

		if (transitionResetTimerId !== null) {
			clearTimeout(transitionResetTimerId);
		}

		transitionResetTimerId = setTimeout(() => {
			previousSlide.classList.remove("exiting");
			slideshow.classList.remove("is-animating");
			transitionResetTimerId = null;
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
	setTimeout(() => {
	startAutoplay();
	}, AUTO_PLAY_INTERVAL);

	// Touch swipe functionality for mobile
	let touchStartX = 0;
	let touchEndX = 0;

	slideshow.addEventListener("touchstart", (e) => {
		touchStartX = e.changedTouches[0].screenX;
	}, false);

	slideshow.addEventListener("touchend", (e) => {
		touchEndX = e.changedTouches[0].screenX;
		handleSwipe();
	}, false);

	function handleSwipe() {
		const swipeThreshold = 50;
		const difference = touchStartX - touchEndX;

		if (Math.abs(difference) > swipeThreshold) {
			if (difference > 0) {
				// Swiped left, show next slide
				showSlide(currentSlideIndex + 1);
			} else {
				// Swiped right, show previous slide
				showSlide(currentSlideIndex - 1);
			}
			startAutoplay();
		}
	}

	// Intersection Observer for fade-in animations
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.animationDelay = '0s';
			}
		});
	}, observerOptions);

	
	
	document.querySelectorAll('.fade-in').forEach(el => {
		observer.observe(el);
	});
});
