// photographer header function

function photographHeaderFactory(photographer) {

	const { name, portrait, city, country, tagline } = photographer;
	
	const picture = `assets/photographers/${portrait}`;
	const img = document.createElement( "img" );
	img.setAttribute("src", picture);
	img.setAttribute ("title", `${name}`);
	img.setAttribute("tabindex", "0");

	const h2 = document.createElement( "h2" );
	h2.className = "photographer-name";
	h2.textContent = name;

	const h3 = document.createElement( "h3" );
	h3.textContent = city + ", " + country;

	const h4 = document.createElement( "h4" );
	h4.textContent = tagline;

	return {h2, h3 , h4, img};
}

// photographer footer function

function photographerFooterFactory(totalLikes, photographer) {

	const footerInfo = document.querySelector(".footer-info");
	const likesElement = document.createElement("div");
	const likes = document.createElement("p");
	likes.className = "total-likes";
	likes.textContent = `${totalLikes}`; 
	likes.setAttribute("tabindex", "0");
	likes.setAttribute("aria-label", `total des likes ${totalLikes}`);
	likesElement.appendChild(likes);

	const likesIcon = document.createElement("i");
	likesIcon.setAttribute("class", "fas fa-heart total-icon");
	likesIcon.setAttribute("area-label", "likes");
	likesElement.appendChild(likesIcon);

	const priceElement = document.createElement("p");
	priceElement.textContent = `${photographer.price} €/jour`;
	priceElement.setAttribute("aria-label", `le prix est de ${photographer.price} € par jour`);
	priceElement.setAttribute("tabindex", "0");

	footerInfo.innerHTML = "";
	footerInfo.appendChild(likesElement);
	footerInfo.appendChild(priceElement);
}