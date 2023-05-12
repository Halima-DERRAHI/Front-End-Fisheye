// DOM elements
const modal = document.getElementById("contact_modal");
const modalContact = document.querySelector(".modal");
const form = document.querySelector("form");
const modalPhotographerName = document.querySelector(".modal-photographer-name");

// Form elements
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const message = document.querySelector("textarea");

function displayModal() {

	modal.style.display = "block";
	
	// Photographer name
	const photographerName = document.querySelector(".photographer-name");
	modalPhotographerName.textContent = photographerName.textContent;
	modalContact.setAttribute("aria-labelledby", `Contactez moi, ${photographerName.textContent}`);
	
	// Focus on form first element
	firstName.focus();

	// Validation on event
	firstName.addEventListener("input", validateFirstName);
	lastName.addEventListener("input", validateLastName);
	email.addEventListener("input", validateEmail);
	message.addEventListener("input", validateMessage);
	
	// form event on click
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		formSubmit();
	});
	
	// form submit
	function formSubmit() {
		if (
			validateFirstName() &&
        validateLastName() &&
        validateEmail() &&
        validateMessage() 
		) {
			displayConsole();
			closeModal();
			hideAllMsg();
			form.reset();
		}
	}

	// First name validation
	function validateFirstName() {
		// Check whitespaces
		if (!firstName.value.trim()) {
			checkMsg(firstName, "Veuillez renseigner un prénom.", "input-error");
			return false;
		}
		// Check string length
		else if (firstName.value.length < 2) {
			checkMsg(
				firstName,
				"Veuillez entrer 2 caractères ou plus pour le champ du prenom.",
				"input-error"
			);
			return false;
		}
		// Check if the string is valid
		else if (!firstName.value.match(/^[a-zA-Z\s-']+$/g)) {
			checkMsg(firstName, "Veuillez entrer un prénom valide.", "input-error");
			return false;
		}
		// Valid string
		else {
			checkMsg(firstName, "", "input-valid");
			return true;
		}
	}

	// Last name validation
	function validateLastName() {
		// Check whitespaces
		if (!lastName.value.trim()) {
			checkMsg(lastName, "Veuillez renseigner un nom.", "input-error");
			return false;
		}
		// Check string length
		else if (lastName.value.length < 2) {
			checkMsg(
				lastName,
				"Veuillez entrer 2 caractères ou plus pour le champ du nom.",
				"input-error"
			);
			return false;
		}
		// Check if the string is valid
		else if (!lastName.value.match(/^[a-zA-Z\s-']+$/g)) {
			checkMsg(lastName, "Veuillez entrer un nom valide.", "input-error");
			return false;
		}
		// Valid string
		else {
			checkMsg(lastName, "", "input-valid");
			return true;
		}
	}

	// email validation
	function validateEmail() {
		const emailRegex =
        /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/;
		// Check whitespaces
		if (!email.value.trim()) {
			checkMsg(email, "Veuillez renseigner un E-mail.", "input-error");
			return false;
		}
		// Check if the string is valid
		else if (!email.value.match(emailRegex)) {
			checkMsg(email, "Veuillez renseigner un E-mail valide.", "input-error");
			return false;
		}
		// Valid string
		else {
			checkMsg(email, "", "input-valid");
			return true;
		}
	}

	// Message validation
	function validateMessage() {
		// Check whitespaces
		if (!message.value.trim()) {
			checkMsg(message, "Veuillez renseigner un message.", "input-error");
			return false;
		}
		// Check string length
		else if (message.value.length < 5) {
			checkMsg(
				message,
				"Veuillez entrer 5 caractères ou plus pour le champ du message.",
				"input-error"
			);
			return false;
		}
		// Check if the string is valid
		else if (!message.value.match(/^[a-zA-Z\s-']+$/g)) {
			checkMsg(message, "Veuillez entrer un message valide.", "input-error");
			return false;
		}
		// Valid string
		else {
			checkMsg(message, "", "input-valid");
			return true;
		}
	}

	// Verification messages
	function checkMsg(input, message, classChoice) {

		const formDataInput = input.parentElement;
		const fieldMsg = formDataInput.querySelector("small");
		// Display message
		fieldMsg.innerText = message;
		input.className =  classChoice;
	}
	// Remove all messages
	function hideAllMsg() {
		checkMsg(firstName, "", "");
		checkMsg(lastName, "", "");
		checkMsg(email, "", "");
		checkMsg(message, "", "");
	}

}

// Close Contact Modal
function closeModal() {
	modal.style.display = "none";
}
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeModal(); }});


// Display form informations on console
function displayConsole() {
	console.log(`Prénom : ${firstName.value}`);
	console.log(`Nom : ${lastName.value}`);
	console.log(`E-mail : ${email.value}`);
	console.log(`Votre message : ${message.value}`);
}

// the elements inside modal to make focusable

const  focusableElements = "button, input, textarea, [tabindex]:not([tabindex=\"-1\"])";
const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
const focusableContent = modal.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1];

document.addEventListener("keydown", (e) => {
	let isTabPressed = e.key === "Tab";
  
	if (!isTabPressed) {
		return;
	}
  
	if (e.shiftKey) {
		if (document.activeElement === firstFocusableElement) {
			lastFocusableElement.focus();
			e.preventDefault();
		}
	} else { 
		if (document.activeElement === lastFocusableElement) { 
			firstFocusableElement.focus();	
			e.preventDefault();
		}
	}
});