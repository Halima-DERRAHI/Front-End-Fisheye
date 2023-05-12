// lightbox factory function

const lightbox = document.querySelector("#lightbox");

function lightboxFactory(mediaContainer) {

	lightbox.classList.add("active");

	const lightboxClose = document.querySelector(".lightbox-close");
	lightboxClose.addEventListener("click" , closeLightBox);

	const lightboxMedia = document.querySelector(".lightbox-image");
	lightboxMedia.innerHTML = "";
	
	if (mediaContainer.querySelector("img")) {
		currentMedia = mediaContainer.querySelector("img");
		const newImage = document.createElement("img");
		newImage.src = currentMedia.src;
		newImage.alt = currentMedia.alt;
		lightboxMedia.appendChild(newImage);
	} else {
		currentMedia = mediaContainer.querySelector("video");
		const newVideo = document.createElement("video");
		newVideo.src = currentMedia.src;
		newVideo.title = currentMedia.title;
		newVideo.controls = true;
		lightboxMedia.appendChild(newVideo);
	}

	const mediaTitle = currentMedia.alt || currentMedia.title;
	const titleElement = document.createElement("h2");
	titleElement.classList.add("new_media_title");
	titleElement.textContent = mediaTitle;
	lightboxMedia.appendChild(titleElement);

}

// Close lightbox function

function closeLightBox() {
	lightbox.classList.remove("active");
}

// lightbox EVENT

document.addEventListener("keydown", function (e) {

	if(lightbox.className == "active") {
		if (e.key === "ArrowLeft") {
			prevLightbox();
		} 
		else if (e.key === "ArrowRight") {
			nextLightbox();
		} 
		else if (e.key === "Escape") {
			closeLightBox();
		} 
	}
});

// Next lightbox

const iconNext = document.querySelector(".next");
iconNext.addEventListener("click", () => nextLightbox());

function nextLightbox() {
	const currentIndex = medias.findIndex(media => [media.querySelector("img"), media.querySelector("video")].includes(currentMedia));
	let nextIndex = currentIndex + 1 ;

	if (nextIndex === medias.length) {
		nextIndex = 0;
	}

	const nextMedia = medias[nextIndex];
	lightboxFactory(nextMedia);
}

// Previous lightbox

const iconPrev = document.querySelector(".prev");
iconPrev.addEventListener("click", () => prevLightbox());

function prevLightbox() {
	const currentIndex = medias.findIndex(media => [media.querySelector("img"), media.querySelector("video")].includes(currentMedia));
	let prevIndex = currentIndex - 1 ;
	
	if (prevIndex === -1) {
		prevIndex = medias.length - 1;
	}

	const prevMedia = medias[prevIndex];
	lightboxFactory(prevMedia);
}

