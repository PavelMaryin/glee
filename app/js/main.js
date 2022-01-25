$(function () {

  $('.related-products__list').slick({
    slidesToShow: 4,
    slideToScroll: 1,
    dots: false,
    arrows: true,
  });


  $('.product-page__tabs-btn').on('click', function(e){
    e.preventDefault();
    $('.product-page__tabs-btn').removeClass('product-page__tabs-btn--active');
    $(this).addClass('product-page__tabs-btn--active');
    
    $('.product-page__tabs-description').removeClass('product-page__tabs-description--active');
    $($(this).attr('href')).addClass('product-page__tabs-description--active');
  });
    

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

  $(".product-page__stars").rateYo({
    starWidth: "18px",
    ratedFill: "#ffcc00",
    readOnly: true,
  })

  
  $('.product-page__thumb-list').slick({
    asNavFor: '.product-page__big-list',
    focusOnSelect: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    vertical: true,
  });

  $('.product-page__big-list').slick({
    asNavFor: '.product-page__thumb-list',
    arrows: false,
    fade: true,
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
    fade: true,
    autoplay: true
  });

  $('.partners__slider').slick({
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    mobileFirst: false,
    responsive: [
      {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      }
    },
     { 
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      }
    },
     { 
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
      }
    },
     { 
      breakpoint: 512,
      settings: {
        slidesToShow: 1,
      }
    }
    ]
  });

  $('.menu-btn').on('click', function(){
    $('.menu-btn').toggleClass('menu-btn--active');
    $('.header__menu').toggleClass('header__menu--active');
  });

  $('.menu__link').on('click', function(){
    $('.menu-btn').removeClass('menu-btn--active');
    $('.header__menu').removeClass('header__menu--active');
  })



  let container1 = document.querySelector('.week-products');
  let container2 = document.querySelector('.new-design');

  let config = {
    controls: {
      scope: 'local'
    }
  };

  let mixer = mixitup(container1, config);
  let mixer1 = mixitup(container2, config);

  // $(window).scroll(function () {
  //   if (this.scrollY > 150) {
  //     $(".header").addClass("header--sticky");
  //     $(".menu-btn").addClass("menu-btn--sticky");
  //   }
  //     else {
  //     $(".header").removeClass("header--sticky");
  //     $(".menu-btn").removeClass("menu-btn--sticky");
  //     }
  // });

  let previouseScroll = 0;
  
  $(window).scroll(() => {
    let currentScroll = $(this).scrollTop();
    currentScroll > previouseScroll ? $(".header").addClass("header--sticky") : $(".header").removeClass("header--sticky");
    previouseScroll = currentScroll;
  })

});