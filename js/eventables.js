$.fn.extend({
  animateCss: function (animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(this).addClass('animated ' + animationName).one(animationEnd, function () {
      $(this).removeClass('animated ' + animationName);
    });
  }
});
$(function () {
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

$(document).ready(function () {
  // $('#yourElement').animateCss('bounce');
  $('.button-collapse').sideNav({
    menuWidth: 250, // Default is 240
    edge: 'left',
    closeOnClick: true
  }
  );
  $('.collapsible').collapsible();
  $('nav.purple.accent-3').pushpin({ top: $('nav.purple.accent-3').offset().top });
  $('.fixed-action-btn').openFAB();
  $(document).ready(function () {
    $('.modal-trigger').leanModal();
  });
  $("#blog-splash .close").click(function () {
    $('#blog-splash').addClass('hide');
  });
});

$("header#souvenir").vegas({
  slides: [
    { src: "images/souvenir.jpg" },
    { src: "images/souvenir1.jpg" },
    { src: "images/weddingFavour.jpg" },
    { src: "images/carGifts.jpg" }
  ],
  // transition : randomTransition()
  transition: ['fade', 'swirlRight', 'swirlLeft', 'blur', 'flash', 'zoomIn', 'zoomOut'],
  animation: ['kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight']
});

$("header#decoration").vegas({
  slides: [
    { src: "images/gci11.jpg" },
    { src: "images/IMG-20151201-WA0016.jpg" },
    { src: "images/wide_area.jpg" },
    { src: "images/somedeco.jpg" }
  ],
  // transition : randomTransition()
  transition: ['fade', 'swirlRight', 'swirlLeft', 'blur', 'flash', 'zoomIn', 'zoomOut'],
  animation: ['kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight']
});