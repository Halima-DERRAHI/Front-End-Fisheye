// le code JavaScript lié à la page photographer.html

async function getPhotographers() {
	// Récupèrer les données du fichier JSON
	const reponse = await fetch("data/photographers.json");
	const photographers = await reponse.json();

	return photographers;
}

// get photographer by url id

const url = document.location.href;
const urlId = new URL(url);
const params = new URLSearchParams(urlId.search);
const paramsId = params.get("id");

async function getPhotographer() {
	const { photographers } = await getPhotographers();
	const photographer = photographers.find( ph => ph.id === Number(paramsId));

	return photographer;
}

// display photographer informations

async function displayPhotographerHeader(photographer) {
	const photographerDesc = document.querySelector(".photograph-description");
	const photographerImg = document.querySelector(".photograph-img");
	const headerFactory = await photographHeaderFactory(photographer);
	const { h2, h3 , h4, img } = headerFactory;

	photographerDesc.append(h2, h3 , h4);
	photographerImg.appendChild(img);
}


let mediasToSort = [];
let photographerNameToSort;

async function displayPhotographerMedia(photographers, photographer) {
	
	// sort media by initial option
	photographers.media.sort((a, b) => b.likes - a.likes);

	const photographerName = photographer.name.replace(/\s+/g, "_");
	photographerNameToSort = photographerName;
	
	const mediaContainer = document.querySelector(".media-container");
	let totalLikes = 0;

	for (let i = 0; i < photographers.media.length ; i++) {
		const media = photographers.media[i];
		
		if (photographer.id === media.photographerId) {
			const photographMedia = await mediaFactory(photographerName, media);
			const mediaCardDOM = photographMedia.getMediaCardDOM();
			
			mediaContainer.appendChild(mediaCardDOM);
			totalLikes+= parseInt(media.likes);
			mediasToSort.push(media);
		}
	}

	photographerFooterFactory(totalLikes, photographer);
}

async function init() {

	const photographers = await getPhotographers();
	const photographer = await getPhotographer();

	displayPhotographerHeader(photographer);
	displayPhotographerMedia(photographers, photographer);
	displaySelectElement(photographerNameToSort , mediasToSort);
}   

window.onload = function()
{
	init();
};
