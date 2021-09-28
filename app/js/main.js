$(function () {

  $('.shop__contant-btn').on('click' , function () {
    $('.shop__contant-btn').removeClass('shop__contant-btn--active');
    $(this).addClass('shop__contant-btn--active');
  });

  $('.shop__contant-btn--list').on('click' , function () {
    $('.product-card').addClass('product-card--list');
  });

  $('.shop__contant-btn--grid').on('click' , function () {
    $('.product-card').removeClass('product-card--list');
  });

  
  $(".filter-recent__stars").rateYo({
    starWidth: "11px",
    ratedFill: "#ffcc00",
    readOnly: true,
  });


  $(".js-range-slider").ionRangeSlider({
    type: "double",
    grid: false,
    onChange: function (data) {
      $('.filter-price__from').text(data.from);
      $('.filter-price__to').text(data.to);
    },
    onStart: function (data) {
      $('.filter-price__from').text(data.from);
      $('.filter-price__to').text(data.to);
    },
  });

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