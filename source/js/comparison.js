const comparisonSlider = document.querySelector(".comparison__container");
const sliderImgWrapper = document.querySelector(".comparison__wrap");
const sliderHandle = document.querySelector(".handle");

// здесь создаём зависимость между шириной накрывающей сверху картинки comparison__wrap и положением держателя за котороый беремся left handle
comparisonSlider.addEventListener("pointermove", sliderMouseMove);

function sliderMouseMove(evt) {
  //проверяем заблокировано ли положение переключателя
  if(isSliderLocked) return;

  const sliderLeftX = comparisonSlider.offsetLeft;
  const sliderWidth = comparisonSlider.clientWidth;
  const sliderHandleWidth = sliderHandle.clientWidth;

  //считывание перемещения мыши в диапозоне контейнера
  let mouseX = evt.clientX - sliderLeftX;
  if(mouseX < 0) mouseX = 0;
  else if(mouseX > sliderWidth) mouseX = sliderWidth;
  //движение покрывающей картинки по назатию мыши
  sliderImgWrapper.style.width = `${((1 - mouseX/sliderWidth) * 100).toFixed(4)}%`;
  //синхронное перемещение держателя
  sliderHandle.style.left = `calc(${((mouseX/sliderWidth) * 100).toFixed(4)}% - ${sliderHandleWidth/2}px)`;
}

let isSliderLocked = false;

//блокируем и разблокируем местоположение переключателя
comparisonSlider.addEventListener("pointerup", sliderMouseUp);
comparisonSlider.addEventListener("pointerdown", sliderMouseDown);
comparisonSlider.addEventListener("pointerleave", sliderMouseLeave);

function sliderMouseDown(evt) {
  if(isSliderLocked) isSliderLocked = false;
  sliderMouseMove(evt);
}

function sliderMouseUp() {
  if(!isSliderLocked) isSliderLocked = true;
}

function sliderMouseLeave() {
  if(isSliderLocked) isSliderLocked = false;
}
