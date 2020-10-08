// Selectors
const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");
let photos = [];

// Unsplash
const countPhotos = 10;
const apiKey = "kBpLwmdcwAQI6-Vpn5sa3txgftFB7TrPCAG7tVtIjC0";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?count=${countPhotos}&client_id=${apiKey}&orientation=landscape`;

const showLoader = () => {
  loader.style.display = "block";
};

const hideLoader = () => {
  loader.style.display = "none";
};

let isReady = false;
let imagesLoaded = 0;
let totalImages = 0;
const imageLoaded = () => {
  console.log("Loaded");
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    isReady = true;
  }
};

const setAttributes = (element, attributes) => {
  for (key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const displayPhotos = (photos) => {
  imagesLoaded = 0;
  totalImages = photos.length;
  photos.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const figure = document.createElement("figure");
    const figureCaption = document.createElement("figcaption");
    const photographer = document.createElement("span");
    const location = document.createElement("span");
    const likes = document.createElement("span");
    photographer.innerText = `📷 ${photo.user.name}`;
    location.innerText = photo.user.location;
    likes.innerText = `♥️ ${photo.likes}`;
    figureCaption.appendChild(location);
    figureCaption.appendChild(photographer);
    figureCaption.appendChild(likes);

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imageLoaded);

    figure.appendChild(img);
    figure.appendChild(figureCaption);

    // item.appendChild(figure);
    imageContainer.appendChild(figure);
  });
};

const getPhotosFromUnsplash = async () => {
  try {
    console.info("Getting images from Unsplash");
    showLoader();
    const response = await fetch(UNSPLASH_URL);
    photos = await response.json();
    displayPhotos(photos);
    hideLoader();
  } catch (error) {
    console.log(error);
    debugger;
  }
};

const checkWhenScrollingIsNearToBottomPage = () => {
  const pixelsCloseToBottom = 300;
  const isScrollCloseToBottom =
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - pixelsCloseToBottom;

  if (isScrollCloseToBottom && isReady) {
    isReady = false;
    getPhotosFromUnsplash();
  }
};

getPhotosFromUnsplash();

window.addEventListener("scroll", checkWhenScrollingIsNearToBottomPage);
