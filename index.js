    var curentPageIndex = 1;

    function scrollToPage(pageNumber) {
      $('.page').stop();
      var targetBottom = $(".page[data-page-number = "+ pageNumber +"]").offset().top + parseInt($('.page').css('bottom'));
      var currentBottom = parseInt($('.page').css('bottom'));
      var speed = (Math.abs(targetBottom - currentBottom) / $('.page').height()) * 500;
      $('.page').animate({'bottom': targetBottom }, speed);
      $('.top-menu-element.active').removeClass('active');
      $('.top-menu-element[data-page-number = '+ pageNumber +']').addClass('active');
      curentPageIndex = parseInt(pageNumber);
    }

    function scrollPage(event) {
      event.preventDefault();
      event.returnValue = false;
      var delta = event.deltaY || event.detail || event.wheelDelta;
      if ((delta > 0) && ($(".page[data-page-number = "+ (curentPageIndex + 1) +"]").length != 0)) {
        scrollToPage(curentPageIndex + 1); }
      if ((delta < 0) && ($(".page[data-page-number = "+ (curentPageIndex - 1) +"]").length != 0)) {
        scrollToPage(curentPageIndex - 1); }
    }

    function setEventListener(func) {
      if (window.addEventListener) {
        if ('onwheel' in document) {
          window.addEventListener("wheel", func);              // IE9+, FF17+, Ch31+
        } else if ('onmousewheel' in document) {
          window.addEventListener("mousewheel", func);         // устаревший вариант события
        } else {
          window.addEventListener("MozMousePixelScroll", func);// Firefox < 17
        }
      } else {
        window.attachEvent("onmousewheel", func);              // IE8-
      }
      window.ontouchmove  = func; // mobile
    }

  $(document).ready(function () {
    
    var swiper1 = new Swiper('.swiper1 .swiper-container', {
      nextButton: '.swiper1 .swiper-button-next',
      prevButton: '.swiper1 .swiper-button-prev',
    });

    var swiper2 = new Swiper('.swiper2 .swiper-container', {
      nextButton: '.swiper2 .swiper-button-next',
      prevButton: '.swiper2 .swiper-button-prev',
    });

    setEventListener(scrollPage);

    $(".top-menu-element").click(function(event){
      var pageNumber = $(this).attr("data-page-number");
      scrollToPage(pageNumber);
    });
  });
