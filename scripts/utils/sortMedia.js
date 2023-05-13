

async function displaySelectElement(photographerName, media) {

	const selectContainer = document.querySelector(".select-container");
	const selectElement = selectContainer.querySelector("select");
	const selectedElement = document.createElement("div");
	const optionsList = document.createElement("div");
	
	selectedElement.setAttribute("role" , "button");
	selectedElement.setAttribute("name" , "sort");
	selectedElement.setAttribute("aria-label" , "trier par");
	selectedElement.setAttribute("tabindex" , "0");

	selectedElement.classList.add("select-selected");
	selectedElement.textContent = selectElement.options[selectElement.selectedIndex].textContent;
	
	selectContainer.appendChild(selectedElement);
	optionsList.classList.add("select-items", "select-hide");

	//await sortMedia(selectedElement.textContent);
	
	function createOptionItem(option) {

		// Create select option

		const optionItem = document.createElement("div");
		optionItem.textContent = option.textContent;
		optionItem.setAttribute("tabindex" , "0");

		// Select option event

		optionItem.addEventListener("click", () => {
			const previousOptionItem = optionsList.querySelector(".select-hide-option");
			if (previousOptionItem) {
				previousOptionItem.classList.remove("select-hide-option");
			}
			optionItem.classList.add("select-hide-option");
			selectedElement.textContent = option.textContent;
			optionsList.classList.add("select-hide");
			selectedElement.classList.toggle("select-arrow-active");
			optionsList.insertBefore(optionItem, optionsList.firstChild);
			sortMedia(optionItem.textContent);
		});
		
		optionItem.addEventListener("keydown", (e) => {
			if (e.key === "Enter") optionItem.click();
		});

		return optionItem;
	}

	// Create select options list

	selectElement.querySelectorAll("option").forEach(option => {
		const optionItem = createOptionItem(option);
		if (selectedElement.textContent !== optionItem.textContent) {
			optionsList.appendChild(optionItem);
		} else {
			optionItem.classList.add("select-hide-option");
			optionsList.insertBefore(optionItem, optionsList.firstChild);
		}
	});

	selectContainer.appendChild(optionsList);

	// Selected element event

	selectedElement.addEventListener("click", (e) => {
		e.stopPropagation();
		optionsList.classList.toggle("select-hide");
		selectedElement.classList.toggle("select-arrow-active");
	});

	selectedElement.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			selectedElement.click();
		}
	});
	
	// hide select list

	document.body.addEventListener("click" , (e) => {
		if (!optionsList.contains(e.target)) {
			optionsList.classList.add("select-hide");
			selectedElement.classList.remove("select-arrow-active");
		}
	});

	document.addEventListener("keydown", e => {
		if (e.key === "Escape") {
			optionsList.classList.add("select-hide");
			selectedElement.classList.remove("select-arrow-active");
		}
	});

	// Sorting function

	function sortMedia(sortBy) {
		let sortedMedia = [];

		if (sortBy === "Titre") {
			sortedMedia = media.sort((a, z) => {
				return a.title.localeCompare(z.title);
			});
		} 
		if (sortBy === "Date") {
			sortedMedia = media.sort((a, z) => {
				return new Date(a.date).valueOf() - new Date(z.date).valueOf();
			});
		}
		if (sortBy === "Popularité") {
			sortedMedia = media.sort((a, z) => {
				return parseInt(z.likes) - parseInt(a.likes);
			});
		}

		// display sorting medias

		const mediaContainer = document.querySelector(".media-container");
		mediaContainer.innerHTML = "";
		medias.length = 0;
		
		sortedMedia.forEach(async (media) => {
			const photographMedia = await mediaFactory(photographerName, media);
			const sortedMediaCardDOM = photographMedia.getMediaCardDOM();
			mediaContainer.appendChild(sortedMediaCardDOM);
		});
	}
}