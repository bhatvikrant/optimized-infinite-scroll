const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = "1YRkBjKMqoB4PPU7mMjmGXnAHYceNCefnvhLjE26oVg";

let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
	imagesLoaded++;
	// console.log("imagesLoaded:", imagesLoaded);
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;

		count = 30;
		apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
		// console.log("ready = ", ready);
	}
}

// Helper Function to set Attributes on DOM elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create Elements for Links & Photos, Add to the DOM
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	// console.log("totalImages:", totalImages);
	// Run function for each object in array
	photosArray.forEach(photo => {
		// Create <a> to link to unsplash
		const item = document.createElement("a");
		setAttributes(item, {
			href: photo.links.html,
			target: "_blank",
		});

		// Create <img /> for photo
		const img = document.createElement("img");

		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});

		// Event Listener, Check when each is finished loading
		img.addEventListener("load", imageLoaded);

		// Put image inside the <a>, put both inside the image-container Element
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();

		displayPhotos();
	} catch (error) {}
}

// Check to see if scrolling newar bottom of page, Load more Photos
window.addEventListener("scroll", () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

// On Load
getPhotos();
