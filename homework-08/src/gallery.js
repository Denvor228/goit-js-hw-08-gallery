import images from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".lightbox"),
  btn: document.querySelector('[data-action="close-lightbox"]'),
  content: document.querySelector(".lightbox__content"),
  img: document.querySelector(".lightbox__image"),
  btnGroup: document.querySelector(".btn_group"),
};

const createImage = (item, parent) => {
  const { preview, original, description } = item;

  const img = document.createElement("img");

  img.classList.add("gallery__image");
  img.dataset.source = original;
  img.src = preview;
  img.alt = description;

  parent.appendChild(img);
};

const createLink = (item, parent) => {
  const { original } = item;
  const img = document.createElement("img");

  img.classList.add("gallery__image");
  img.src = original;

  createImage(item, img);

  parent.appendChild(img);
};

const createItem = (item) => {
  const li = document.createElement("li");
  li.classList.add("gallery__item");

  createLink(item, li);

  return li;
};

const renderListItems = (arr) => {
  const items = arr.map((item) => createItem(item));

  refs.galleryList.append(...items);
};

renderListItems(images);

function closeModalImage() {
  refs.lightbox.classList.remove("is-open");
  window.removeEventListener("keydown", handleKeyPress);
  window.removeEventListener("keydown", handleClickBtn);
}

function onClickHandler(e) {
  e.preventDefault();
  window.addEventListener("keydown", handleKeyPress);
  window.addEventListener("keydown", handleClickBtn);
  if (e.target.nodeName === "IMG") {
    refs.lightbox.classList.add("is-open");
    refs.lightbox.querySelector(".lightbox__image").src = e.target.src;
    refs.lightbox.querySelector(".lightbox__image").alt = e.target.alt;
  }
}

refs.lightbox.addEventListener("click", handleBackdropClick);

function onCloseHandler(e) {
  if (e.target.nodeName === "I" || e.target.nodeName === "BUTTON") {
    closeModalImage();
  }
}

function handleBackdropClick(event) {
  if (event.target !== refs.content) {
    return;
  }
  closeModalImage();
}

function handleKeyPress(event) {
  console.log(event.code);

  if (event.code !== "Escape") {
    return;
  }

  closeModalImage();
}

refs.galleryList.addEventListener("click", onClickHandler);
refs.btn.addEventListener("click", onCloseHandler);

let nextCount = undefined;
let arrImages = document.querySelectorAll(".gallery__image");
let arrayElem = [];

for (let i = 0; i < arrImages.length; i++) {
  arrayElem.push(arrImages[i]);
  arrImages[i].addEventListener("click", function (e) {
    nextCount = arrayElem.indexOf(e.target) / 2;
    console.log("Klick on", nextCount);
  });
}

const handleClickBtn = (evt) => {
  if (evt.target.className === "next" || evt.code === "ArrowRight") {
    if (nextCount >= images.length - 1) {
      nextCount = 0;
    } else {
      nextCount++;
    }
    refs.img.src = images[nextCount].original;
    refs.img.alt = images[nextCount].description;
  } else if (evt.target.className === "prev" || evt.code === "ArrowLeft") {
    if (nextCount - 1 < 0) {
      nextCount = images.length - 1;
    } else {
      nextCount--;
    }
    refs.img.src = images[nextCount].original;
    refs.img.alt = images[nextCount].description;
  }
};
refs.btnGroup.addEventListener("click", handleClickBtn);
