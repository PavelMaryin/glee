$(function () {

  $('.top-slider__inner').slick({
    dots: true,
    arrows: false,
    // fade: true,
    // autoplay: true
  })

  var container1 = document.querySelector('.week-products');
  var container2 = document.querySelector('.new-design'); 

  var config = {
    controls: {
      scope: 'local'
    }
  };

  var mixer = mixitup(container1, config);
  var mixer1 = mixitup(container2, config);

});