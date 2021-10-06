$(function () {

  $('.shop__contant-btn').on('click' , function () {
    $('.shop__contant-btn').removeClass('shop__contant-btn--active');
    $(this).addClass('shop__contant-btn--active');
  });

  $('.shop__contant-btn--list').on('click' , function () {
    $('.shop__contant-list').addClass('shop__contant-list--rows');

  });

  $('.shop__contant-btn--grid').on('click' , function () {
    $('.shop__contant-list').removeClass('shop__contant-list--rows');
  });

  $('.product-page__input').styler();

  
  $(".filter-recent__stars").rateYo({
    starWidth: "11px",
    ratedFill: "#ffcc00",
    readOnly: true,
  });

  $('.product-card__stars').rateYo({
    starWidth: "18px",
    ratedFill: "#ffcc00",
    readOnly: true,
  })


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