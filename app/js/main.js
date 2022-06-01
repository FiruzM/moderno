$(function(){

    $(".product-slider__inner").slick({
        dots: true,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        
    });


    $(".rate-star").rateYo({
        rating: 5,
        starWidth: "12px",
        readOnly: true,
      });
      
    var mixer = mixitup('.product__inner-box');
});