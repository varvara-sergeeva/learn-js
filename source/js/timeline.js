const animItems = document.querySelectorAll(".anim-items");

if (animItems.length > 0) {
  //событие при которым происходит всё описанное ниже
  window.addEventListener('scroll', animOnScroll);

  function animOnScroll(params) {
    // создаём цикл
    for (let index = 0; index < animItems.length; index++) {
      // собираем все элемента для анимации и сохраняем в массив
      const animItem = animItems[index];
      // заводим переменнуюБ которая получит высоту нашего объекта
      const animItemHeight = animItem.offsetHeight;
      // переменная ниже определяетнасколько далеко верх объекта находится от топа страницы
      const animItemOffset = offset(animItem).top;
      // задаем коэфициент, который регулирует старт анимации 1/4 высоты элемента
      const animStart = 4;

      // задаём функцию по точке запуска при скролле
      // вначале из высоты окна браузере вычетаем высоту нахождения элемента от топа поделённую на коэф
      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      //может не понадобится - это если высота эл-та выше окна браузера (спозиционированна)
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      //теперь добавляем класс при определенных условиях
      // если проскролленых пикселей больше чем позиция объекта минус точка старта ИИ прокрутили меньше чем позиция объекта плюс его высота(тип в пространстве объекта еще) то здесь добавляем класс
      if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
        animItem.classList.add('active');
      } else {
        animItem.classList.remove('active');
      }

    }

    //функция определяющая удалённость от верха
    function offset(el) {
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {top: rect.top + scrollTop, left:rect.left + scrollLeft}
    }
  }
}
