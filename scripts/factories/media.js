let medias = [];
let currentMedia;

// Media factory function

async function mediaFactory(photographerName, media) {
	
	const { title, likes } = media;

	function getMediaCardDOM () {
		const mediaElement = document.createElement("div");
		mediaElement.classList.add("media");

		// create image card

		if (media.image) {
			const { image } = media;
			const imagePath = `assets/images/${photographerName}/${image}`;
			const imageElement = document.createElement("img");
			imageElement.setAttribute("src", imagePath);
			imageElement.setAttribute("alt", title);
			imageElement.setAttribute("role", "link");
			imageElement.setAttribute("tabindex", "0");
			const mediaImage = document.createElement("div");
			mediaImage.classList.add("media_image");
			mediaImage.appendChild(imageElement);
			mediaImage.addEventListener("click" , () => { lightboxFactory(mediaImage , media); });
			mediaImage.addEventListener("keydown" , (e) => { 
				if (e.key === "Enter") {mediaImage.click(); }});
			mediaElement.appendChild(mediaImage);
		}

		// create video card

		if (media.video) {
			const { video } = media;
			const videoPath = `assets/images/${photographerName}/${video}`;
			const videoElement = document.createElement("video");
			videoElement.setAttribute("src", videoPath);
			videoElement.setAttribute("title", title);
			videoElement.setAttribute("role", "link");
			videoElement.setAttribute("tabindex", "0");
			const mediaVideo = document.createElement("div");
			mediaVideo.classList.add("media_video");
			mediaVideo.appendChild(videoElement);
			mediaVideo.addEventListener("click" , () => { lightboxFactory(mediaVideo , media); });
			mediaVideo.addEventListener("keydown" , (e) => { 
				if (e.key === "Enter") {mediaVideo.click();} });
			mediaElement.appendChild(mediaVideo);
		}
		
		mediaInfoFactory(title, likes, media, mediaElement);
		
		medias.push(mediaElement);

		return mediaElement;
	}
	return {title, likes, getMediaCardDOM};
}

// Media infos factory (informations , likes)

function mediaInfoFactory(title, likes, media, mediaElement ) {

	const mediaInfo = document.createElement("div");
	mediaInfo.classList.add("media_info");

	const mediaTitle = document.createElement("h2");
	mediaTitle.classList.add("media_title");
	mediaTitle.setAttribute("role", "text");
	mediaTitle.textContent = title;

	const mediaLikes = document.createElement("div");
	mediaLikes.classList.add("media_likes");

	const likesNumber = document.createElement("p");
	likesNumber.setAttribute("aria-label", "nombre de likes");
	likesNumber.textContent = likes;

	const likesIcon = document.createElement("i");

	if(media.isLiked) {
		likesIcon.setAttribute("class", "fa-sharp fa-solid fa-heart");
	}else {
		likesIcon.setAttribute("class", "fa-sharp fa-regular fa-heart");
	}

	likesIcon.setAttribute("aria-label", "likes");
	likesIcon.setAttribute("tabindex", "0");
	likesIcon.setAttribute("aria-label", "likes");

	mediaLikes.appendChild(likesNumber);
	mediaLikes.appendChild(likesIcon);
	mediaInfo.appendChild(mediaTitle);
	mediaInfo.appendChild(mediaLikes);
	mediaElement.appendChild(mediaInfo);

	// like icon events

	likesIcon.addEventListener("click" , () => { 
		media.isLiked = !media.isLiked;
		manageLikes(media, likesNumber ,likesIcon );});

	likesIcon.addEventListener("keydown" , (e) => { 
		if (e.key === "Enter") {likesIcon.click(); }});
}

// Likes click

function manageLikes(media, likesNumber , likesIcon) {
	const totalLikes = document.querySelector(".total-likes");
	const imageLikes = media.likes;

	if (media.isLiked) {
		const newLikes = imageLikes + 1;
		media.likes = newLikes;
		
		likesNumber.textContent = newLikes;
		totalLikes.textContent = parseInt(totalLikes.textContent) + 1;
		likesIcon.className = "fas-sharp fa-solid fa-heart";
	}
	else {
		const newLikes = imageLikes - 1;
		media.likes = newLikes;

		likesNumber.textContent = newLikes;
		totalLikes.textContent = parseInt(totalLikes.textContent) - 1;
		likesIcon.className = "fas-sharp fa-regular fa-heart";
	}
}