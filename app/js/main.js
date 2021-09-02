$(function () {

  $('.top-slider__inner').slick({
    dots: true,
    arrows: false,
    // fade: true,
    // autoplay: true
  });

  $('.partners__slider').slick({
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
  });

  

  let container1 = document.querySelector('.week-products');
  let container2 = document.querySelector('.new-design'); 

  let config = {
    controls: {
      scope: 'local'
    }
  };

  let mixer = mixitup(container1, config);
  let mixer1 = mixitup(container2, config);

});